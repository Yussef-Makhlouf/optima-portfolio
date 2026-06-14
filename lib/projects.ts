import projectsData from './projects.json'

// ─── Raw JSON schema ───────────────────────────────────────────
interface RawRepoAnalysis {
  tech_stack?: string[]
  problem_solved?: string
  strengths?: string[]
  portfolio_summary?: string
}

interface RawRepo {
  index: number
  name: string
  full_name: string
  description: string | null
  language: string | null
  category: string
  stars: number
  forks: number
  watchers: number
  open_issues: number
  topics?: string[]
  is_fork: boolean
  is_archived: boolean
  is_private: boolean
  default_branch: string
  license: string | null
  url: string
  clone_url: string
  homepage: string | null
  created_at: string
  updated_at: string
  pushed_at: string
  size_kb: number
  analysis?: RawRepoAnalysis
}

interface ProjectsJson {
  user?: {
    login: string
    name: string
  }
  repos: RawRepo[]
}

// ─── Types ───────────────────────────────────────────────────

export type ProjectStatus = 'Production' | 'MVP' | 'In Progress' | 'Archived'

export interface Project {
  id: string
  title: string
  slug: string
  category: string
  sector: string
  type: string
  status: ProjectStatus
  year: string
  client: string
  market: string[]
  stack: string[]
  description: string
  features: string[]
  value: string[]
  techHighlights: string[]
  coverImage: string
  images: string[]
  featured: boolean
  liveUrl: string | null
  githubUrl: string | null
  stars: number
  forks: number
  openIssues: number
  sizeKb: number
  defaultBranch: string
  cloneUrl: string | null
  language: string | null
}

// Picsum seeds per project for consistent placeholder images
const COVER_SEEDS: Record<string, number> = {
  'optima-platform': 10,
  'optima-content-studio': 20,
  'idurar-erp-crm': 30,
  'gig-jordan': 40,
  'nestoria-real-estate': 50,
  'technova-platform': 60,
  'fifth-floor-agency': 70,
  'b-genius-academy': 80,
  'admaf-website': 90,
  'ahcp-platform': 100,
  'arabic-ecommerce-ui': 110,
  'goory-ecommerce': 120,
  'react-ecommerce-template': 130,
  'jeddah-real-estate': 140,
  'real-estate-dashboard': 150,
  'clean-company-ksa': 160,
  'sopol-logistics': 170,
  'moqael-construction': 180,
  'al-qemma-app': 190,
  'ksa-elevator-company': 200,
  'law-firm-landing': 210,
  'deem-medical': 220,
  'hotel-booking-frontend': 230,
  'digital-events-platform': 240,
  'arabic-admin-dashboard': 250,
  'sport-dashboard': 260,
  'secure-portal': 270,
  'ticket-booker-bot': 280,
  'tarmiz-clone': 290,
  'capital-smart': 300,
  'language-learning-app': 310,
  'pwa-todo-app': 320,
  'yussef-dev-studio': 330,
  'workshop-with-chat': 340,
  'saudi-invoice-system': 350,
  'figma-design-system-generator': 360,
  'technova-hiring-platform': 370,
  'uaemmaf-website': 380,
  'apartment-landing-page': 390,
  'interior-design-website': 400,
  'health-supplements-landing': 410,
  'spa-landing-page': 420,
  'movies-web-app': 430,
}

function titleFromRepoName(name: string) {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

function getProjectType(category: string) {
  if (/frontend/i.test(category)) return 'Frontend App'
  if (/backend/i.test(category)) return 'Backend App'
  if (/website/i.test(category)) return 'Website'
  return 'Web Project'
}

function getCoverImage(slug: string, w = 800, h = 500): string {
  const seed = COVER_SEEDS[slug] ?? 1
  return `https://picsum.photos/seed/${seed}/${w}/${h}`
}

function rawRepoToProject(repo: RawRepo): Project {
  const slug = slugify(repo.name)
  const title = titleFromRepoName(repo.name)
  const techStack = repo.analysis?.tech_stack ?? (repo.language ? [repo.language] : [])
  const strengths = repo.analysis?.strengths ?? []
  const features = repo.analysis?.problem_solved ? [repo.analysis.problem_solved] : strengths.slice(0, 3)
  const value = repo.analysis?.portfolio_summary ? [repo.analysis.portfolio_summary] : []
  const market = Array.isArray(repo.topics) && repo.topics.length ? repo.topics : repo.language ? [repo.language] : []
  const status: ProjectStatus = repo.open_issues > 0 ? 'In Progress' : 'Production'

  return {
    id: String(repo.index),
    title: title || repo.name,
    slug,
    category: repo.category || 'Other',
    sector: repo.language || repo.category || 'General',
    type: getProjectType(repo.category),
    status,
    year: repo.created_at
      ? new Date(repo.created_at).getFullYear().toString()
      : new Date(repo.updated_at).getFullYear().toString(),
    client: repo.full_name,
    market,
    stack: techStack,
    description: repo.description || 'A portfolio project from the updated JSON feed.',
    features,
    value,
    techHighlights: strengths.length ? strengths : techStack,
    coverImage: getCoverImage(slug),
    images: [],
    featured: repo.stars > 0 || repo.forks > 0,
    liveUrl: repo.homepage || null,
    githubUrl: repo.url || null,
    stars: repo.stars,
    forks: repo.forks,
    openIssues: repo.open_issues,
    sizeKb: repo.size_kb,
    defaultBranch: repo.default_branch || 'main',
    cloneUrl: repo.clone_url || null,
    language: repo.language || 'TypeScript',
  }
}

const rawData = projectsData as ProjectsJson
const projects = rawData.repos.map(rawRepoToProject)

export function getProjectCategories() {
  return ['All', ...Array.from(new Set(projects.map((p) => p.category)))]
}

export { getCoverImage }

export function getProjectImage(slug: string, index: number, w = 1200, h = 700): string {
  const baseSeed = COVER_SEEDS[slug] ?? 1
  const seed = baseSeed + (index + 1) * 7
  return `https://picsum.photos/seed/${seed}/${w}/${h}`
}

export function getGalleryImages(slug: string): { src: string; alt: string; caption?: string; liveUrl?: string | null }[] {
  const project = getProjectBySlug(slug)
  if (!project || !project.images || project.images.length === 0) return []

  return project.images.map((imgPath, i) => ({
    src: getProjectImage(slug, i, 1400, 900),
    alt: `${project.title} - screenshot ${i + 1}`,
    caption: i === 0 ? `${project.title} — Main View` : undefined,
    liveUrl: project.liveUrl,
  }))
}

export function getBeforeAfterImages(slug: string): { before: string; after: string }[] {
  const baseSeed = COVER_SEEDS[slug] ?? 1
  const pairs: { before: string; after: string }[] = []
  for (let i = 0; i < 3; i++) {
    const beforeSeed = baseSeed + i * 10
    const afterSeed = baseSeed + i * 10 + 1
    pairs.push({
      before: `https://picsum.photos/seed/${beforeSeed}/1400/900`,
      after: `https://picsum.photos/seed/${afterSeed}/1400/900`,
    })
  }
  return pairs
}

export function getAllProjects(): Project[] {
  return projects
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAllSlugs(): { slug: string }[] {
  return projects.map((p) => ({ slug: p.slug }))
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === 'All') return projects
  return projects.filter((p) => p.category === category)
}

export function getRelatedProjects(slug: string, limit = 3): Project[] {
  const current = getProjectBySlug(slug)
  if (!current) return []
  return projects
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit)
}

export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = { All: projects.length }
  projects.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1
  })
  return counts
}

export function getPortfolioStats() {
  const markets = new Set<string>()
  projects.forEach((p) => p.market.forEach((m) => markets.add(m)))
  return {
    total: projects.length,
    featured: projects.filter((p) => p.featured).length,
    markets: markets.size,
    sectors: new Set(projects.map((p) => p.sector)).size,
  }
}

export function projectMetadata(slug: string) {
  const p = getProjectBySlug(slug)
  if (!p) return {}
  return {
    title: `${p.title} | OPTIMA Portfolio`,
    description: p.description.slice(0, 160),
    openGraph: {
      title: p.title,
      description: p.description.slice(0, 160),
      images: [{ url: getCoverImage(slug) }],
      type: 'article' as const,
    },
    keywords: [...p.stack, ...p.market, p.sector].join(', '),
  }
}