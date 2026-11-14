import { useEffect, useState } from 'react'
import ResumeMenu from './ResumeMenu.jsx'

const links = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['contact', 'Contact'],
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    links.forEach(([id]) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#top" className="brand" aria-label="Back to top">
        <span className="logo">TK</span>
        <span className="brand-name">Tapan Khokhariya</span>
      </a>
      <button
        className="burger"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>
      <nav className={open ? 'open' : ''}>
        {links.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === id ? 'active' : ''}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}
        <ResumeMenu variant="ghost" align="right" />
      </nav>
    </header>
  )
}
