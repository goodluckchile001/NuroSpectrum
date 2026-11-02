export type Translation = Record<string, string>
export type Tone = 'green' | 'indigo' | 'gold' | 'rose'

export type ApiPost = {
  slug: string
  tone: Tone
  tag: Translation
  title: Translation
  summary: Translation
  cover_image: string | null
  cover_alt: string
  paragraphs?: string[]
  images?: ApiPostImage[]
  note?: string
  source?: string
  published_at: string
}

export type ApiPostImage = {
  id: number
  image: string
  alt_text: string
  caption: string
  position: number
  order: number
}

export type ApiEvent = {
  id: number
  date: string
  title: Translation
  description: Translation
  location: string
  is_online: boolean
  tone: Tone
}

export type ApiResource = {
  id: number
  kind: 'article' | 'book' | 'magazine' | 'video'
  title: string
  by: string
  note: string
  url: string
}

export type ApiCommunity = { state: string; has_whatsapp: boolean }
export type ApiStory = {
  id: number
  author_name: string
  state: string
  text: string
  created_at: string
}
export type ApiPage<T> = { count: number; next: string | null; previous: string | null; results: T[] }
export type ApiProfile = {
  email: string
  name: string
  state: string
  language: string
  role: string
  communities: string[]
}

export class ApiError extends Error {
  constructor(message: string, readonly status: number) {
    super(message)
    this.name = 'ApiError'
  }
}

function readCookie(name: string) {
  return document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.slice(name.length + 1)
}

export async function ensureCsrfCookie() {
  if (readCookie('csrftoken')) return
  const response = await fetch('/api/csrf', { credentials: 'same-origin', cache: 'no-store' })
  if (!response.ok) throw new ApiError(`Could not initialize API security (HTTP ${response.status}).`, response.status)
}

export async function csrfToken() {
  await ensureCsrfCookie()
  return decodeURIComponent(readCookie('csrftoken') || '')
}

async function errorMessage(response: Response) {
  const text = await response.text()
  if (text) {
    try {
      const body: unknown = JSON.parse(text)
      if (typeof body === 'string') return body
      if (body && typeof body === 'object') {
        const values = Object.values(body)
        const message = values.flatMap((value) => Array.isArray(value) ? value : [value])
          .filter((value): value is string => typeof value === 'string')
          .join(' ')
        if (message) return message
      }
    } catch {
      return `API request failed (HTTP ${response.status}).`
    }
  }
  return `API request failed (HTTP ${response.status}).`
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const method = (init.method || 'GET').toUpperCase()
  const headers = new Headers(init.headers)
  if (init.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json')
  if (!['GET', 'HEAD', 'OPTIONS', 'TRACE'].includes(method)) {
    headers.set('X-CSRFToken', await csrfToken())
  }

  const response = await fetch(`/api${path}`, {
    ...init,
    method,
    headers,
    credentials: 'same-origin',
    cache: 'no-store',
  })
  if (!response.ok) throw new ApiError(await errorMessage(response), response.status)
  return response.json() as Promise<T>
}

export function localized(value: Translation, language: string) {
  return value[language] || value.en || Object.values(value)[0] || ''
}

export function apiErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'The request could not be completed.'
}
