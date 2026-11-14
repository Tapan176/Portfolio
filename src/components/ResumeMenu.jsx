import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { resumes } from '../data/portfolio.js'
import { DownloadIcon } from './ui.jsx'

const base = import.meta.env.BASE_URL
const GAP = 8
const EDGE = 10

/**
 * Resume download. One resume -> plain button. Several -> dropdown.
 * The dropdown is rendered in a portal with fixed positioning that is clamped to the
 * viewport, so it can never overflow the screen or get clipped by a parent
 * (e.g. the blurred navbar or the mobile menu panel).
 */
export default function ResumeMenu({ variant = 'primary', align = 'left' }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState(null)
  const btn = useRef(null)
  const menu = useRef(null)

  const place = useCallback(() => {
    const b = btn.current?.getBoundingClientRect()
    const m = menu.current
    if (!b || !m) return
    const vw = document.documentElement.clientWidth
    const vh = window.innerHeight
    const width = Math.min(Math.max(b.width, 200), vw - EDGE * 2)
    let left = align === 'right' ? b.right - width : b.left
    left = Math.min(Math.max(EDGE, left), vw - width - EDGE)
    const height = m.offsetHeight
    const spaceBelow = vh - b.bottom - GAP - EDGE
    const spaceAbove = b.top - GAP - EDGE
    const below = spaceBelow >= Math.min(height, 240) || spaceBelow >= spaceAbove
    const maxHeight = Math.max(120, below ? spaceBelow : spaceAbove)
    const top = below ? b.bottom + GAP : Math.max(EDGE, b.top - GAP - Math.min(height, maxHeight))
    setPos({ left, top, width, maxHeight })
  }, [align])

  useLayoutEffect(() => {
    if (open) place()
    else setPos(null)
  }, [open, place])

  useEffect(() => {
    if (!open) return
    const onPointer = (e) => {
      if (!menu.current?.contains(e.target) && !btn.current?.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && (setOpen(false), btn.current?.focus())
    const onScrollResize = () => place()
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onScrollResize)
    window.addEventListener('scroll', onScrollResize, { passive: true })
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onScrollResize)
      window.removeEventListener('scroll', onScrollResize)
    }
  }, [open, place])

  if (resumes.length === 1) {
    return (
      <a
        className={`btn btn-${variant}`}
        href={`${base}resumes/${resumes[0].file}`}
        download
        target="_blank"
        rel="noopener"
      >
        <DownloadIcon /> Resume
      </a>
    )
  }

  return (
    <div className="resume-menu">
      <button
        ref={btn}
        type="button"
        className={`btn btn-${variant}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <DownloadIcon /> Resume <span className="chev">▾</span>
      </button>
      {open &&
        createPortal(
          <ul
            ref={menu}
            className="menu"
            role="menu"
            style={pos ? { left: pos.left, top: pos.top, width: pos.width, maxHeight: pos.maxHeight } : { visibility: 'hidden' }}
          >
            {resumes.map((r) => (
              <li key={r.file} role="none">
                <a
                  role="menuitem"
                  href={`${base}resumes/${r.file}`}
                  download
                  target="_blank"
                  rel="noopener"
                  onClick={() => setOpen(false)}
                >
                  {r.label}
                  <small>PDF</small>
                </a>
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </div>
  )
}
