// Single source of truth for all portfolio content.
// Edit this file to update the site - no component changes needed.

export const profile = {
  name: 'Tapan Khokhariya',
  roles: [
    'Backend Engineer',
    'Distributed Systems Builder',
    'Node.js · Golang · Python',
    'RAG & Real-time Systems',
  ],
  location: 'Ahmedabad, Gujarat, India',
  summary:
    'Backend Engineer with 2+ years of experience building scalable distributed systems and cloud-native backend applications using Node.js, Golang, and Python. I work on microservices, event-driven architectures, real-time communication, intelligent retrieval pipelines and automation platforms, with a strong focus on system reliability, developer productivity and scalable platform engineering.',
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

export const stats = [
  { value: 2, suffix: '+', label: 'Years experience' },
  { value: 8, suffix: '', label: 'Backend platforms built' },
  { value: 8.94, suffix: '', label: 'CGPA / 10', decimals: 2 },
  { value: 3, suffix: '', label: 'Languages: Node · Go · Python' },
]

export const skills = [
  'Node.js',
  'Golang',
  'Python',
  'JavaScript',
  'SQL',
  'Express.js',
  'REST APIs',
  'Microservices',
  'WebSockets',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'RabbitMQ',
  'Docker',
  'AWS',
  'Git',
  'GitLab CI/CD',
  'Swagger',
  'Event-Driven',
  'Distributed Systems',
  'RAG',
  'Flask',
  'React',
  'Lambda',
  'EC2',
  'S3',
  'CloudWatch',
]

export const skillGroups = [
  { title: 'Languages', items: ['Node.js', 'Golang', 'Python', 'JavaScript (ES6+)', 'SQL'] },
  {
    title: 'Backend & Architecture',
    items: ['Express.js', 'RESTful APIs', 'Microservices', 'Event-Driven Architecture', 'Distributed Systems', 'WebSockets', 'Swagger'],
  },
  { title: 'Data & Messaging', items: ['PostgreSQL', 'MongoDB', 'Redis', 'RabbitMQ'] },
  { title: 'Cloud & DevOps', items: ['AWS (Lambda, EC2, S3, CloudWatch)', 'Docker', 'GitLab CI/CD', 'Git'] },
]

export const experience = [
  {
    role: 'Software Developer',
    company: 'ZURU Tech India Pvt. Ltd.',
    place: 'Ahmedabad',
    period: 'Aug 2023 – Present',
    points: [
      'Develop and maintain scalable microservices in Node.js and Golang within a distributed system architecture.',
      'Design RESTful APIs and database schemas on PostgreSQL and MongoDB.',
      'Built centralized services for release management, version distribution, changelog publishing and automated update delivery.',
      'Built event-driven notification systems (in-app, email, SMS, Microsoft Teams, web push) on RabbitMQ and WebSockets.',
      'Run real-time and asynchronous workflows with WebSockets, RabbitMQ and Redis.',
      'Manage AWS Lambda, EC2, CloudWatch and S3 for deployment, monitoring and scheduled data sync.',
      'Create GitLab CI/CD pipelines, Docker-based deployments, internal Node.js packages and cron automation; maintain Swagger docs for APIs and socket events.',
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

export const projects = [
  {
    title: 'Multimodal RAG Platform',
    blurb:
      'Retrieval-Augmented Generation over text and image queries, with configurable vector, graph and SQL retrieval, query rewriting, reranking and hybrid strategies. Ingests PDFs, DOCs, Markdown, HTML, tables, code and formula-rich documents.',
    tags: ['Python', 'RAG', 'Vector DB', 'Graph DB', 'SQL'],
    accent: '#22d3ee',
  },
  {
    title: 'Notification System',
    blurb:
      'Centralized event-driven notification microservice delivering in-app, Teams, email (Mailgun), SMS (Twilio) and web push, with live WebSocket panels, multi-language templates and modular channel handlers.',
    tags: ['Node.js', 'RabbitMQ', 'WebSockets', 'Mailgun', 'Twilio'],
    accent: '#a855f7',
  },
  {
    title: 'Release Build Management Platform',
    blurb:
      'Backend for desktop-app release builds: update-check and download APIs, admin tooling for release notes and changelogs, PDF changelog generation and cron jobs syncing build metadata from AWS S3.',
    tags: ['Node.js', 'AWS S3', 'Cron', 'REST', 'PDF'],
    accent: '#f472b6',
  },
  {
    title: 'Project Management Service',
    blurb:
      'Project lifecycle backend with folders, sharing and permissions, teams, comments, activity tracking, version history, soft delete and recovery, guest-to-user migration, search, and admin analytics APIs.',
    tags: ['Node.js', 'RabbitMQ', 'WebSockets', 'PostgreSQL'],
    accent: '#34d399',
  },
  {
    title: 'Asset Management Service',
    blurb:
      'Asset hierarchy backend for a 3D home design platform: categories, product groups, software-compatible assets and version-specific variants with admin upload and distribution workflows.',
    tags: ['Node.js', 'REST', '3D Assets', 'Versioning'],
    accent: '#fbbf24',
  },
  {
    title: 'User Management Service',
    blurb:
      'Central identity microservice for authentication, profiles and preferences, sharing user-change events with other services over RabbitMQ.',
    tags: ['Node.js', 'Auth', 'RabbitMQ', 'Microservices'],
    accent: '#60a5fa',
  },
  {
    title: 'Smart Device Controller Service',
    blurb:
      'Controller backend for smart home devices and sensors: device configuration, real-time state handling, sensor events and recurring automation scheduling.',
    tags: ['Node.js', 'IoT', 'Scheduling', 'REST'],
    accent: '#fb7185',
  },
  {
    title: 'Full Stack AIML Lab Platform',
    blurb:
      'No-code platform to train ANNs and CNNs: React UI for configuring layers and parameters, Flask training backend, Google Drive dataset storage, concurrent training sessions and dataset preview.',
    tags: ['React', 'Flask', 'Python', 'ML'],
    accent: '#c084fc',
  },
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
