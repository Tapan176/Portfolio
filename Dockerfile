# syntax=docker/dockerfile:1

# ---------- Stage 1: build the static site ----------
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies first so Docker can cache this layer.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Stage 2: serve with nginx ----------
FROM nginx:1.27-alpine AS runtime

# Port nginx listens on. Hosts like Render/Koyeb inject their own PORT at runtime.
ENV PORT=8080

# The nginx image renders /etc/nginx/templates/*.template into /etc/nginx/conf.d/ at start-up.
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- "http://127.0.0.1:${PORT}/healthz" || exit 1
