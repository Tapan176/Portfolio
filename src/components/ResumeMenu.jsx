import { useEffect, useRef, useState } from 'react'
import { resumes } from '../data/portfolio.js'
import { DownloadIcon } from './ui.jsx'

const base = import.meta.env.BASE_URL

/** Download button with a dropdown of role-focused resume variants. */
export default function ResumeMenu({ variant = 'primary', align = 'left' }) {
  const [open, setOpen] = useState(false)
  const box = useRef(null)

  useEffect(() => {
    if (!open) return
    const close = (e) => {
      if (e.type === 'keydown' ? e.key === 'Escape' : !box.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', close)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', close)
    }
  }, [open])

  return (
    <div className="resume-menu" ref={box}>
      <button
        type="button"
        className={`btn btn-${variant}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <DownloadIcon /> Resume <span className="chev">▾</span>
      </button>
      {open && (
        <ul className={`menu ${align}`} role="menu">
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
        </ul>
      )}
    </div>
  )
}
