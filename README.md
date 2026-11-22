# Tapan Khokhariya - 3D Portfolio

An animated 3D portfolio built with **React + Vite + three.js** (via `@react-three/fiber` and `@react-three/drei`).

- Scroll-driven 3D hero scene (distorted torus-knot core, orbiting satellites, star field, floating debris, mouse parallax)
- Interactive 3D skill sphere (drag to rotate)
- Timeline, tilt-on-hover project cards, count-up stats, typewriter intro
- Role-focused resume downloads (General, Node.js, Golang, Python, ...)
- Respects `prefers-reduced-motion`; falls back to a plain gradient background when WebGL is unavailable
- 100% static output, so it can be hosted free and runs 24x7 with no server

## Search & link previews

`index.html` carries SEO meta tags, Open Graph / Twitter card tags (preview image: `public/og-image.png`) and `Person` structured data (JSON-LD). `public/sitemap.xml` and `public/robots.txt` list the site URL.

**If the site URL changes (custom domain), update `https://tapan-portfolio-e5d5.onrender.com` in `index.html`, `public/sitemap.xml` and `public/robots.txt`.**

## Responsive behaviour

Tested (headless Edge) at 320x568, 360x740, 390x844, 844x390 (landscape phone), 768x1024, 1024x768, 1280x720, 1920x1080 and 2560x1440 with no horizontal overflow.

- **Layout:** fluid grids that can shrink below their content, burger menu below 960px, single column below 880px, a dedicated short-landscape layout for phones turned sideways.
- **Scaling:** root font size grows smoothly on 1080p/1440p/4K screens; the content container is rem-based so it scales with it.
- **3D scene:** positions and sizes are computed from the visible viewport, so the hero scales with any aspect ratio. Phones/portrait screens get a lighter scene and a stacked layout; resolution drops automatically on slow GPUs; shapes shrink as they near the camera.
- **Touch:** no hover-only effects or tilt, idle camera sway instead of mouse parallax, 44px tap targets, vertical swipes over the skill sphere still scroll the page.
- **Other:** iPhone notch / safe-area insets, `prefers-reduced-motion`, print stylesheet, resume dropdown clamped to the viewport.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # serve the production build locally
```

Requires Node 20+ (`.nvmrc` pins 22).

## Edit your content

All text lives in one file: [`src/data/portfolio.js`](src/data/portfolio.js) (profile, links, skills, experience, projects, education).

Resume PDFs live in [`public/resumes/`](public/resumes). To add, replace or remove one, change the file **and** the `resumes` list in `portfolio.js`.

## Project structure

```
index.html
vite.config.js
public/
  favicon.svg
  robots.txt
  resumes/                 resume PDFs served at /resumes/<file>
src/
  main.jsx  App.jsx  styles.css  hooks.js
  data/portfolio.js        <- all site content
  components/
    Scene3D.jsx            main fixed 3D background scene
    SkillSphere.jsx        interactive 3D skill globe
    Navbar.jsx  ResumeMenu.jsx  ui.jsx
Dockerfile                 multi-stage: node build -> nginx
nginx.conf.template        nginx config (PORT-aware, gzip, caching, /healthz)
docker-compose.yml
.github/workflows/         deploy.yml (GitHub Pages) + ci.yml
docs/HOSTING.md            step-by-step free 24x7 hosting guide
```

## Docker

```bash
# build + run with plain docker
docker build -t tapan-portfolio .
docker run --rm -p 8080:8080 tapan-portfolio      # http://localhost:8080

# or with compose
docker compose up --build -d
docker compose down
```

The image is small (nginx:alpine + static files). It listens on `$PORT` (default `8080`), so it also works on platforms that inject their own port.

## Git workflow

```bash
git checkout -b feature/my-change     # work on a branch
git add -A && git commit -m "feat: describe the change"
git push -u origin feature/my-change  # CI builds it; open a PR into main
```

Pushing to `main` automatically deploys to GitHub Pages (see the hosting guide).

## Hosting

See **[docs/HOSTING.md](docs/HOSTING.md)** for a step-by-step guide (GitHub Pages and Cloudflare Pages - both free and always on).
