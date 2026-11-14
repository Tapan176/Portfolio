import { Component, lazy, Suspense, useMemo } from 'react'
import Navbar from './components/Navbar.jsx'
import ResumeMenu from './components/ResumeMenu.jsx'
import {
  CountUp,
  GithubIcon,
  LinkedinIcon,
  Reveal,
  SectionTitle,
  TiltCard,
  Typewriter,
} from './components/ui.jsx'
import { hasWebGL, useScrollProgress } from './hooks.js'
import {
  awards,
  education,
  experience,
  profile,
  projects,
  skillGroups,
  stats,
} from './data/portfolio.js'

// 3D code is split into its own chunks so the text content paints first.
const Scene3D = lazy(() => import('./components/Scene3D.jsx'))
const SkillSphere = lazy(() => import('./components/SkillSphere.jsx'))

/** If WebGL blows up at runtime, keep the page usable instead of crashing it. */
class SafeBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback ?? null : this.props.children
  }
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-inner">
        <Reveal className="eyebrow">
          <span className="pulse" /> Open to backend opportunities
        </Reveal>
        <Reveal delay={80}>
          <h1>
            Hi, I'm <span className="grad">{profile.name}</span>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="role">
            <Typewriter words={profile.roles} />
          </p>
        </Reveal>
        <Reveal delay={240}>
          <p className="lead">
            I design and build scalable distributed systems: microservices, event-driven
            pipelines, real-time platforms and retrieval-augmented AI.
          </p>
        </Reveal>
        <Reveal delay={320} className="cta">
          <a className="btn btn-primary" href="#projects">
            View my work
          </a>
          <ResumeMenu variant="ghost" />
          <a className="icon-btn" href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GithubIcon />
          </a>
          <a className="icon-btn" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <LinkedinIcon />
          </a>
        </Reveal>
      </div>
      <a href="#about" className="scroll-cue" aria-label="Scroll to about">
        <span />
      </a>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section">
      <SectionTitle kicker="01 · About" title="Building backends that scale" />
      <div className="about-grid">
        <Reveal className="glass about-text">
          <p>{profile.summary}</p>
          <p className="muted">📍 {profile.location}</p>
        </Reveal>
        <div className="stats">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="glass stat">
              <strong>
                <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </strong>
              <span>{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const webgl = useMemo(() => hasWebGL(), [])
  return (
    <section id="skills" className="section">
      <SectionTitle kicker="02 · Skills" title="Tools of the trade" />
      <div className="skills-grid">
        {webgl && (
          <Reveal>
            <SafeBoundary>
              <Suspense fallback={<div className="skill-sphere loading">Loading 3D…</div>}>
                <SkillSphere />
              </Suspense>
            </SafeBoundary>
          </Reveal>
        )}
        <div className="skill-groups">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 80} className="glass group">
              <h3>{g.title}</h3>
              <ul className="chips">
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="section">
      <SectionTitle kicker="03 · Experience" title="Where I've worked" />
      <ol className="timeline">
        {experience.map((job, i) => (
          <Reveal as="li" key={job.role + job.period} delay={i * 80} className="t-item">
            <span className="dot" />
            <div className="glass t-card">
              <div className="t-head">
                <div>
                  <h3>{job.role}</h3>
                  <p className="company">
                    {job.company}
                    {job.place ? ` · ${job.place}` : ''}
                  </p>
                </div>
                <span className="period">{job.period}</span>
              </div>
              <ul>
                {job.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="section">
      <SectionTitle kicker="04 · Projects" title="Things I've built" />
      <div className="project-grid">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 90}>
            <TiltCard accent={p.accent} className="glass project">
              <span className="glow" />
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.title}</h3>
              <p>{p.blurb}</p>
              <ul className="tags">
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function EducationAwards() {
  return (
    <section id="education" className="section narrow">
      <SectionTitle kicker="05 · Education" title="Learning & recognition" />
      <div className="edu-grid">
        <Reveal className="glass edu">
          <span className="period">{education.period}</span>
          <h3>{education.school}</h3>
          <p>{education.degree}</p>
          <p className="score">{education.score}</p>
        </Reveal>
        <Reveal delay={90} className="glass edu">
          <span className="period">Honors &amp; Awards</span>
          <h3>🏆 Hackathon Runners-up</h3>
          {awards.map((a) => (
            <p key={a}>{a}</p>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section narrow">
      <SectionTitle kicker="06 · Contact" title="Let's build something" />
      <Reveal className="glass contact">
        <p>
          I'm always interested in challenging backend, distributed-systems and AI-platform
          work. The quickest way to reach me is LinkedIn - or have a look at my code on GitHub.
        </p>
        <div className="cta center">
          <a className="btn btn-primary" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedinIcon /> Connect on LinkedIn
          </a>
          <a className="btn btn-ghost" href={profile.links.github} target="_blank" rel="noopener noreferrer">
            <GithubIcon /> GitHub
          </a>
          <ResumeMenu variant="ghost" />
        </div>
      </Reveal>
    </section>
  )
}

export default function App() {
  const scroll = useScrollProgress()
  const webgl = useMemo(() => hasWebGL(), [])
  return (
    <>
      {webgl && (
        <SafeBoundary>
          <Suspense fallback={null}>
            <Scene3D scroll={scroll} />
          </Suspense>
        </SafeBoundary>
      )}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <EducationAwards />
        <Contact />
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} {profile.name} · Built with React &amp; three.js</p>
      </footer>
    </>
  )
}
