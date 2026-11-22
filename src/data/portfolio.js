// Single source of truth for all portfolio content.
// Edit this file to update the site - no component changes needed.

export const profile = {
  name: 'Tapan Khokhariya',
  roles: [
    'Backend Engineer',
    'Golang Backends for Trading Apps',
    'Distributed Systems Builder',
    'Node.js · Golang · Python',
    'RAG & Real-time Systems',
  ],
  location: 'Ahmedabad, Gujarat, India',
  summary:
    'Backend Engineer with 3+ years of experience building scalable distributed systems and cloud-native backend applications using Node.js, Golang, and Python. Currently building Golang backend services for a stock trading platform at Greeksoft Technology. I work on microservices, event-driven architectures, real-time communication, intelligent retrieval pipelines and automation platforms, with a strong focus on system reliability, developer productivity and scalable platform engineering.',
  links: {
    github: 'https://github.com/Tapan176',
    linkedin: 'https://www.linkedin.com/in/tapan-khokhariya-52b294205/',
  },
}

// Files live in /public/resumes. Add or remove entries to change the dropdown.
export const resumes = [
  { label: 'General', file: 'Tapan-Khokhariya-Resume-General.pdf' },
  { label: 'Node.js', file: 'Tapan-Khokhariya-Resume-NodeJS.pdf' },
  { label: 'Golang', file: 'Tapan-Khokhariya-Resume-Golang.pdf' },
  { label: 'Python', file: 'Tapan-Khokhariya-Resume-Python.pdf' },
  { label: 'Node.js + Go', file: 'Tapan-Khokhariya-Resume-Node-Go.pdf' },
  { label: 'Node.js + Python', file: 'Tapan-Khokhariya-Resume-Node-Python.pdf' },
  { label: 'Python + Go', file: 'Tapan-Khokhariya-Resume-Python-Go.pdf' },
  { label: 'Polyglot', file: 'Tapan-Khokhariya-Resume-Polyglot.pdf' },
]

// Labels shown on the 3D skill sphere (keep it to ~30 so it stays readable).
export const skills = [
  'Golang',
  'Node.js',
  'Python',
  'TypeScript',
  'JavaScript',
  'SQL',
  'Express.js',
  'FastAPI',
  'Flask',
  'React',
  'Next.js',
  'REST APIs',
  'Microservices',
  'Event-Driven',
  'Distributed Systems',
  'WebSockets',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'RabbitMQ',
  'Vector DB',
  'RAG',
  'PyTorch',
  'TensorFlow',
  'Trading Systems',
  'Docker',
  'AWS',
  'GitLab CI/CD',
  'Git',
  'Swagger',
]

export const skillGroups = [
  {
    title: 'Languages',
    items: ['Golang', 'Node.js', 'Python', 'TypeScript', 'JavaScript (ES6+)', 'SQL'],
  },
  {
    title: 'Backend & Architecture',
    items: [
      'Microservices',
      'Event-Driven Architecture',
      'Distributed Systems',
      'RESTful APIs',
      'WebSockets',
      'Express.js',
      'FastAPI',
      'Flask',
      'JWT Auth',
      'OpenAPI / Swagger',
    ],
  },
  {
    title: 'Data & Messaging',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'RabbitMQ', 'SQLite', 'CockroachDB', 'Drizzle ORM', 'ChromaDB'],
  },
  {
    title: 'Trading & Fintech',
    items: ['IPO', 'Option chain', 'SIP', 'Fundamentals', 'Market-data feeds (NSE, Yahoo)', 'F&O strategies (paper trading)'],
  },
  {
    title: 'AI / ML',
    items: ['RAG pipelines', 'Vector & Graph DBs', 'LLM tooling (Ollama)', 'TensorFlow / Keras', 'PyTorch', 'scikit-learn', 'Ultralytics YOLO', 'Computer Vision'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'three.js / React Three Fiber'],
  },
  {
    title: 'Cloud & DevOps',
    items: ['AWS (Lambda, EC2, S3, CloudWatch)', 'Docker', 'GitLab CI/CD', 'GitHub Actions', 'Render', 'Git'],
  },
]

export const experience = [
  {
    role: 'Software Developer · Golang',
    company: 'Greeksoft Technology',
    place: '',
    period: 'Jun 2026 – Present',
    points: [
      'Build and maintain the Golang backend systems behind a stock trading platform, including IPO, option chain, SIP, fundamentals and notification services, along with many other trading-app services.',
      'Provide accurate market information and the features users expect from leading trading apps.',
      'Work on a Next.js web application for the same stock platform; it runs on the same Golang backend that powers the trading app, so both clients share one set of services.',
    ],
  },
  {
    role: 'Software Developer',
    company: 'ZURU Tech India Pvt. Ltd.',
    place: 'Ahmedabad',
    period: 'Aug 2023 – Jun 2026',
    points: [
      'Developed and maintained scalable microservices in Node.js and Golang within a distributed system architecture.',
      'Designed RESTful APIs and database schemas on PostgreSQL and MongoDB.',
      'Built centralized services for release management, version distribution, changelog publishing and automated update delivery.',
      'Built event-driven notification systems (in-app, email, SMS, Microsoft Teams, web push) on RabbitMQ and WebSockets.',
      'Ran real-time and asynchronous workflows with WebSockets, RabbitMQ and Redis.',
      'Managed AWS Lambda, EC2, CloudWatch and S3 for deployment, monitoring and scheduled data sync.',
      'Created GitLab CI/CD pipelines, Docker-based deployments, internal Node.js packages and cron automation; maintained Swagger docs for APIs and socket events.',
    ],
  },
  {
    role: 'Backend Development Intern',
    company: 'ZURU Tech India Pvt. Ltd.',
    place: 'Ahmedabad',
    period: 'May 2023 – Jul 2023',
    points: [
      'Developed backend features and APIs with Node.js and Express.js.',
      'Designed MongoDB schemas and built scraping → cleaning → loading data pipelines.',
      'Implemented real-time features using WebSockets.',
    ],
  },
  {
    role: 'Computer Vision Intern',
    company: 'Necesario Innovations Pvt Ltd, IIT Gandhinagar',
    place: 'Gandhinagar',
    period: 'Jun 2022 – Jul 2022',
    points: [
      'R&D of algorithms and scripts for High Dynamic Range (HDR) image capture.',
      'Implemented image bracketing and exposure-fusion techniques to merge multi-exposure frames.',
    ],
  },
]

// cats: backend | trading | ai | web   (used by the filter chips on the Projects section)
// links: optional { github, live }
export const projects = [
  {
    title: 'Trading Platform Backend Services',
    blurb:
      'Golang backend systems for a stock trading platform at Greeksoft: IPO, option chain, SIP, fundamentals, notifications and many other trading-app services, built to deliver accurate market information and the features users expect from leading trading apps.',
    tags: ['Golang', 'Trading', 'Market Data', 'Microservices'],
    cats: ['backend', 'trading'],
    accent: '#34d399',
  },
  {
    title: 'Stock Platform Web App',
    blurb:
      'Next.js web application for the same stock platform. It consumes the same Golang backend as the trading app, so the web app and the trading app share one source of truth for market information and features.',
    tags: ['Next.js', 'Golang APIs', 'Trading', 'Web'],
    cats: ['web', 'trading'],
    accent: '#22d3ee',
  },
  {
    title: 'PaperBot - Always-on Paper-Trading Platform',
    blurb:
      'Paper-trading server with an installable live dashboard (PWA). Adaptive strategy bots run 24/7 on NSE index futures and options (NIFTY, BANKNIFTY), NSE and US stocks, 24 NSE indices and crypto, using live NSE, Yahoo and Coinbase feeds, Black-Scholes option modelling and a strategy-research toolkit that back-tests thousands of strategies. Paper money only; zero runtime dependencies.',
    tags: ['Node.js', 'NSE / F&O', 'Black-Scholes', 'PWA', 'Redis', 'Docker'],
    cats: ['trading', 'backend', 'web'],
    accent: '#fbbf24',
    links: { github: 'https://github.com/Tapan176/TradeAI', live: 'https://paperbot-3g7l.onrender.com/' },
  },
  {
    title: 'Multimodal RAG Platform',
    blurb:
      'Retrieval-Augmented Generation over text and image queries, with configurable vector, graph and SQL retrieval, query rewriting, reranking and hybrid strategies. Ingests PDFs, DOCs, Markdown, HTML, tables, code and formula-rich documents.',
    tags: ['Python', 'RAG', 'Vector DB', 'Graph DB', 'SQL'],
    cats: ['ai', 'backend'],
    accent: '#22d3ee',
  },
  {
    title: 'TAPAN_AI - Local-first AI Companion',
    blurb:
      'Cognitive AI assistant built as a perception → memory → reasoning → planning → tooling → reflection pipeline, with episodic, semantic and persona memory, Chroma vector and graph storage, async FastAPI / WebSocket / streaming / CLI interfaces and an Ollama / BitNet LLM fallback chain.',
    tags: ['Python', 'FastAPI', 'ChromaDB', 'WebSockets', 'LLM'],
    cats: ['ai', 'backend'],
    accent: '#c084fc',
    links: { github: 'https://github.com/Tapan176/local-ai-assistant' },
  },
  {
    title: 'DX-Ray - Developer Experience Diagnostics',
    blurb:
      'Scans a dev workflow like an X-ray: dashboards for CI/CD health, flaky tests, code quality, PR review cycles and docs freshness, with generated insights. A pnpm TypeScript monorepo with a React + Vite frontend, Express 5 API, PostgreSQL with Drizzle ORM and an OpenAPI-generated client.',
    tags: ['TypeScript', 'React', 'Express', 'PostgreSQL', 'OpenAPI'],
    cats: ['web', 'backend'],
    accent: '#60a5fa',
    links: { github: 'https://github.com/Tapan176/friction_finder' },
  },
  {
    title: 'Notification System',
    blurb:
      'Centralized event-driven notification microservice delivering in-app, Teams, email (Mailgun), SMS (Twilio) and web push, with live WebSocket panels, multi-language templates and modular channel handlers.',
    tags: ['Node.js', 'RabbitMQ', 'WebSockets', 'Mailgun', 'Twilio'],
    cats: ['backend'],
    accent: '#a855f7',
  },
  {
    title: 'Release Build Management Platform',
    blurb:
      'Backend for desktop-app release builds: update-check and download APIs, admin tooling for release notes and changelogs, PDF changelog generation and cron jobs syncing build metadata from AWS S3.',
    tags: ['Node.js', 'AWS S3', 'Cron', 'REST', 'PDF'],
    cats: ['backend'],
    accent: '#f472b6',
  },
  {
    title: 'Project Management Service',
    blurb:
      'Project lifecycle backend with folders, sharing and permissions, teams, comments, activity tracking, version history, soft delete and recovery, guest-to-user migration, search, and admin analytics APIs.',
    tags: ['Node.js', 'RabbitMQ', 'WebSockets', 'PostgreSQL'],
    cats: ['backend'],
    accent: '#34d399',
  },
  {
    title: 'Asset Management Service',
    blurb:
      'Asset hierarchy backend for a 3D home design platform: categories, product groups, software-compatible assets and version-specific variants with admin upload and distribution workflows.',
    tags: ['Node.js', 'REST', '3D Assets', 'Versioning'],
    cats: ['backend'],
    accent: '#fbbf24',
  },
  {
    title: 'User Management Service',
    blurb:
      'Central identity microservice for authentication, profiles and preferences, sharing user-change events with other services over RabbitMQ.',
    tags: ['Node.js', 'Auth', 'RabbitMQ', 'Microservices'],
    cats: ['backend'],
    accent: '#60a5fa',
  },
  {
    title: 'Smart Device Controller Service',
    blurb:
      'Controller backend for smart home devices and sensors: device configuration, real-time state handling, sensor events and recurring automation scheduling.',
    tags: ['Node.js', 'IoT', 'Scheduling', 'REST'],
    cats: ['backend'],
    accent: '#fb7185',
  },
  {
    title: 'AMQP - RabbitMQ Package for Node.js',
    blurb:
      'Reusable RabbitMQ module: managed connections with automatic reconnection, confirm channels, publish / send / consume helpers, delayed publishing, retry with requeue, and file-based storage for unprocessed messages.',
    tags: ['Node.js', 'RabbitMQ', 'amqplib', 'Reliability'],
    cats: ['backend'],
    accent: '#f472b6',
    links: { github: 'https://github.com/Tapan176/rabbitMq' },
  },
  {
    title: 'Full Stack AIML Lab Platform',
    blurb:
      'No-code ML lab: React UI for configuring layers and parameters, Flask + MongoDB backend with JWT auth, Google Drive dataset storage, concurrent training sessions and dataset preview. Supports scikit-learn, TensorFlow / Keras, PyTorch and Ultralytics YOLO.',
    tags: ['React', 'Flask', 'MongoDB', 'TensorFlow', 'PyTorch'],
    cats: ['ai', 'web'],
    accent: '#c084fc',
    links: { github: 'https://github.com/Tapan176/AIML-vlab' },
  },
]

// Smaller repos, shown as a compact "More on GitHub" list.
export const moreOnGithub = [
  { name: 'Go practice programs', desc: 'Golang fundamentals and practice programs', url: 'https://github.com/Tapan176/blog-platform-backend-golang' },
  { name: 'Blog app', desc: 'Node.js, Express and CockroachDB', url: 'https://github.com/Tapan176/Blog-app-using-node-express-and-cockroachDb' },
  { name: 'E-commerce app', desc: 'Node.js, Express and Mongoose (MongoDB)', url: 'https://github.com/Tapan176/Ecommerce-app-using-node-express-and-mongoose' },
  { name: 'StyleGAN2', desc: 'StyleGAN2 image-generation model in Python', url: 'https://github.com/Tapan176/stylegan2' },
]

export const education = {
  school: 'Marwadi University, Rajkot',
  degree: 'B.Tech in Information and Communication Technology (ICT)',
  period: '2020 – 2024',
  score: 'CGPA 8.94 / 10',
}

export const awards = [
  'Runners-up, Azadi Ka Amrit Mahotsav SSIP Hackathon (2022)',
]

export const stats = [
  { value: 3, suffix: '+', label: 'Years experience' },
  { value: projects.length, suffix: '', label: 'Projects & platforms' },
  { value: 8.94, suffix: '', label: 'CGPA / 10', decimals: 2 },
  { value: 3, suffix: '', label: 'Languages: Node · Go · Python' },
]

// "What I bring" list in the About section.
export const highlights = [
  'Golang & Node.js microservices running in production',
  'Trading-platform services: IPO, option chain, SIP, fundamentals, notifications',
  'Event-driven and real-time systems with RabbitMQ, Redis and WebSockets',
  'Cloud delivery on AWS with Docker and CI/CD pipelines',
  'RAG, LLM and ML platforms in Python',
  'Runner-up, SSIP Hackathon 2022 · B.Tech ICT, CGPA 8.94',
]
