# Free 24x7 Hosting Guide

This portfolio builds to **plain static files** (`dist/`). Static hosting is the right fit for a portfolio: it is free, serves from a global CDN, never "sleeps" and needs no server to keep alive.

| Option | Cost | Always on? | Auto-deploy on `git push` | Best for |
| --- | --- | --- | --- | --- |
| **A. GitHub Pages** (recommended) | Free | Yes | Yes (workflow included) | Simplest, you already use GitHub |
| **B. Cloudflare Pages** | Free | Yes | Yes | Fastest CDN, easy custom domain |
| C. Docker on a free container host (Render, Koyeb, ...) | Free tier | **No - free instances sleep when idle** | Yes | Only if you specifically want to run the Docker image |

> Why not Docker for the main hosting? Free container tiers (e.g. Render's free web service) spin down after ~15 minutes without traffic, so the first visitor waits ~30-60 s for a cold start. That is not 24x7. The Dockerfile is still included and works - see Option C.

---

## Before you start (one-time)

1. Make sure `npm run build` works locally.
2. Create a GitHub account (you have one: `Tapan176`).
3. Decide the repo name:
   - `portfolio` -> site URL `https://tapan176.github.io/portfolio/`
   - `Tapan176.github.io` -> site URL `https://tapan176.github.io/` (cleaner; this is GitHub's special "user site" repo name)

   Both work because the build uses relative asset paths (`base: './'`).

---

## Step 1 - Push the code to GitHub

The local repo is already initialised with a first commit on the `main` branch.

1. Go to <https://github.com/new>.
2. Enter the repository name (see above), set it to **Public**, and **do not** tick "Add a README / .gitignore / license" (the repo must be empty).
3. Click **Create repository**.
4. In a terminal inside `d:\Portfolio` run (replace `portfolio` if you chose another name):

   ```bash
   git remote add origin https://github.com/Tapan176/portfolio.git
   git push -u origin main
   ```

   GitHub will ask you to sign in the first time (browser popup or a Personal Access Token).

> **Privacy check before making the repo public:** the resume PDFs in `public/resumes/` contain whatever is on your resume (including your phone number). Anyone can open them once the site is live. If you do not want that, remove the phone number from the PDFs before committing, or delete the files and the `resumes` entries in `src/data/portfolio.js`.

---

## Option A - GitHub Pages (recommended)

The workflow `.github/workflows/deploy.yml` builds the site and publishes it on every push to `main`.

1. Open your repo on GitHub -> **Settings** -> **Pages** (left sidebar).
2. Under **Build and deployment -> Source**, choose **GitHub Actions**.
3. Go to the **Actions** tab. The workflow **"Deploy to GitHub Pages"** starts automatically after your push (or click it -> **Run workflow**).
4. Wait ~1-2 minutes until both jobs (`build`, `deploy`) are green.
5. Open the URL shown in the `deploy` job (or Settings -> Pages):
   - `https://tapan176.github.io/portfolio/` (repo `portfolio`), or
   - `https://tapan176.github.io/` (repo `Tapan176.github.io`).
6. Done. Every future `git push` to `main` redeploys automatically.

**Troubleshooting**
- *Workflow fails at `npm ci`*: make sure `package-lock.json` is committed (it is).
- *Deploy job says "Pages not enabled"*: redo step 2 (Source must be **GitHub Actions**).
- *Blank page*: hard-refresh (Ctrl+Shift+R). The build uses relative paths, so no base-path config is needed.

---

## Option B - Cloudflare Pages

1. Sign up at <https://dash.cloudflare.com/sign-up> (free).
2. Left menu: **Workers & Pages** -> **Create** -> **Pages** -> **Connect to Git**.
3. Authorise Cloudflare to access GitHub and select your portfolio repo.
4. Build settings:
   - **Framework preset:** `Vite` (or None)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variable:** `NODE_VERSION` = `22`
5. Click **Save and Deploy**. After ~1-2 minutes you get `https://<project-name>.pages.dev`.
6. Every push to `main` redeploys; pushes to other branches get preview URLs.

You can run Option A and B at the same time; they do not conflict.

---

## Option C - Run the Docker image on a free container host

Use this only if you want to host the container itself. Remember the free tier may sleep when idle.

### Test the image locally first

```bash
docker build -t tapan-portfolio .
docker run --rm -p 8080:8080 tapan-portfolio
# open http://localhost:8080  (health check: http://localhost:8080/healthz)
```

### Deploy on Render (Docker, free instance)

1. Push the repo to GitHub (Step 1).
2. Sign in at <https://render.com> with GitHub.
3. **New +** -> **Web Service** -> select the repo.
4. **Language/Runtime:** `Docker` (Render auto-detects the `Dockerfile`). **Instance type:** `Free`.
5. Set **Health Check Path** to `/healthz`.
6. Click **Deploy**. You get `https://<name>.onrender.com`. No `PORT` setting is needed: the container reads the `PORT` env var Render provides.

### Deploy on Koyeb (Docker)

1. Sign in at <https://www.koyeb.com> -> **Create Service** -> **GitHub** -> pick the repo.
2. **Builder:** `Dockerfile`. Choose the free instance type if offered in your region.
3. **Exposed port:** `8080`, protocol HTTP. Health check path `/healthz`.
4. Deploy and open the generated `*.koyeb.app` URL.

> Free-tier limits change often; check each provider's current pricing page.

---

## Updating the site later

```bash
# edit src/data/portfolio.js or replace a PDF in public/resumes/
git add -A
git commit -m "content: update experience"
git push
```

GitHub Pages / Cloudflare Pages rebuild automatically within a couple of minutes.

## Custom domain (optional)

- **GitHub Pages:** Settings -> Pages -> **Custom domain** -> enter your domain, then add the DNS records GitHub shows. Tick **Enforce HTTPS**.
- **Cloudflare Pages:** project -> **Custom domains** -> **Set up a domain** and follow the prompts.

## Quick checklist

- [ ] `npm run build` succeeds locally
- [ ] Repo pushed to GitHub (`main`)
- [ ] Pages source set to **GitHub Actions** (Option A) or Cloudflare project connected (Option B)
- [ ] Site opens, the 3D scene animates, resume downloads work
- [ ] Added the live URL to your LinkedIn and GitHub profiles
