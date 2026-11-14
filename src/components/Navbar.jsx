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

  // Close the mobile menu on Escape, when resizing/rotating to a wide layout, or on outside tap.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth > 960 && setOpen(false)
    const onPointer = (e) => !e.target.closest?.('.nav, .menu') && setOpen(false)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <header className={`nav ${scrolled || open ? 'scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <a href="#top" className="brand" aria-label="Back to top">
        <span className="logo">TK</span>
        <span className="brand-name">Tapan Khokhariya</span>
      </a>
      <button
        className="burger"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="primary-nav"
        onClick={() => setOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>
      <nav id="primary-nav" className={open ? 'open' : ''} aria-label="Primary">
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
