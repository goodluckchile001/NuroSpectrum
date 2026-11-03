# Nurospectrum API

Django + Django REST Framework backend for the Nurospectrum website.
Email/password accounts and optional Google sign-in use django-allauth in headless (API-only) mode.

| Area | What it does |
|---|---|
| `apps/accounts` | Email-based `User` (no username), `Profile` (state, language, role), email/password and Google sign-up |
| `apps/content` | `Post` (blog), `Event`, `Resource` (Library). Text is stored per language: `{"en": "...", "ha": "..."}` |
| `apps/community` | `StateCommunity` (WhatsApp links, editable in admin), `Membership`, `Story` (moderated), `PartnerInquiry` |

## 1. Run it locally

```bash
python -m venv .venv && source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env                                   # then edit .env

python manage.py makemigrations accounts content community   # first time only: creates the migration files
python manage.py migrate
python manage.py seed_site                             # loads the 4 posts, 3 events, Library items, 37 states
python manage.py createsuperuser                       # your admin login (email + password)
python manage.py runserver
```

Open `http://localhost:8000/admin/` and `http://localhost:8000/api/posts`.
Commit the generated `migrations/` folders to git.
Use `docker compose up --build` instead if you prefer Postgres in Docker.

Run the tests with `python manage.py test`.

## 2. What you manage in the admin
- **State communities**: paste each state's WhatsApp invite link in the list view. States with no link use `WHATSAPP_NATIONAL_URL`.
- **Stories**: select pending stories and use the "Approve" or "Reject" action. Nothing is public until approved.
- **Partner inquiries**: tick "handled" when answered. New ones are also emailed to `INQUIRY_NOTIFY_EMAIL`.
- **Blog posts / Events / Resources**: add or edit content. Blog post and event translations have separate English, Hausa, Yorùbá and Igbo fields; no JSON editing is needed. English is required, other languages are optional, and a blog post's web address is generated from its English title. Untranslated languages fall back to English in the frontend.
- **Blog images**: upload an optional cover image on a post; it appears on the blog card and at the top of the article. Add smaller images in the post's inline section and set their paragraph position, caption and alt text. JPG, PNG and WebP files up to 5 MB are supported.
- `seed_site` never overwrites existing items, so it is safe to re-run.
- Event dates in the seed file are assumed to be 14 Nov 2026, 5 Dec 2026 and 23 Jan 2027. Edit them in the admin.

## 3. API

All JSON. No trailing slashes. Responses use `{ "en": ..., "ha": ... }` for translated fields.

| Method and path | Auth | Purpose |
|---|---|---|
| `GET /api/posts`, `GET /api/posts/<slug>` | none | Blog |
| `GET /api/events` (`?when=all` for past too) | none | Events |
| `GET /api/resources` | none | Library |
| `GET /api/communities` | none | States, with `has_whatsapp` (never the link itself) |
| `POST /api/join` `{state, role?}` | sign-in | Records membership, returns `whatsapp_invite_url` |
| `GET` / `PATCH /api/me` | sign-in | Profile (state, language, role, joined communities) |
| `GET /api/stories` | none | Approved stories (paginated) |
| `POST /api/stories` | none | Submit a story: `text` (50+ chars), `consent: true`, optional `display_name`, `is_anonymous`, `state` |
| `POST /api/partner-inquiries` | none | `name`, `email`, `kind` (partner, invest, contribute), `message`, optional `organisation` |
| `GET /api/csrf` | none | Sets the `csrftoken` cookie |

Public forms are rate limited (10 per hour per client), include a hidden honeypot field `website` that must stay empty, and support Cloudflare Turnstile (send `turnstile_token`; set `TURNSTILE_SECRET_KEY`).

Sign-in/out and session endpoints come from allauth under `/_allauth/browser/v1/`.

## 4. Google sign-in
1. Google Cloud Console > APIs & Services > Credentials > Create OAuth client ID > **Web application**.
2. Authorized redirect URIs (the callback is served by Django):
   - `http://localhost:3000/accounts/google/login/callback/` (when using the Next.js proxy below)
   - `https://YOUR-SITE/accounts/google/login/callback/`
   - add the same paths on the Django host if you call it directly
3. Put the client ID and secret in `.env` as `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
4. Email/password sign-up is enabled. Email verification is required before a new account can sign in; configure SMTP delivery for production.

## 5. Connecting the Next.js site

Let Next.js proxy the API so the browser only talks to one domain (no CORS, first-party cookies).

`next.config.mjs`:
```js
const API = process.env.API_ORIGIN || 'http://localhost:8000'
const nextConfig = {
  // Django URLs such as /accounts/google/login/callback/ end in a slash. Without this,
  // Next.js strips the slash and Django adds it back, causing a redirect loop.
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      { source: '/api/:path*', destination: `${API}/api/:path*` },
      { source: '/_allauth/:path*', destination: `${API}/_allauth/:path*` },
      { source: '/accounts/:path*', destination: `${API}/accounts/:path*` },
    ]
  },
}
export default nextConfig
```
The website is wired to this proxy and uses django-allauth for Google sign-in. Set `API_ORIGIN` in the website environment to the backend origin (defaults to `http://localhost:8000`). The login/logout pages use the allauth browser API, and account state, profile updates and community joins use the Django session cookie.

Frontend recipes (all same-origin, `credentials: 'same-origin'` is the default):
```ts
// 1. On page load: get the CSRF cookie
await fetch('/api/csrf')
const csrf = () => document.cookie.split('; ').find(c => c.startsWith('csrftoken='))?.split('=')[1] ?? ''

// 2. Who is signed in? 200 = yes, 401 = no
const res = await fetch('/_allauth/browser/v1/auth/session')

// 3. "Continue with Google": must be a real form POST (a full page navigation)
function loginWithGoogle(next = '/') {
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = '/_allauth/browser/v1/auth/provider/redirect'
  for (const [k, v] of Object.entries({ provider: 'google', process: 'login', callback_url: next, csrfmiddlewaretoken: csrf() })) {
    const input = document.createElement('input'); input.type = 'hidden'; input.name = k; input.value = v; form.appendChild(input)
  }
  document.body.appendChild(form); form.submit()
}

// 4. Sign out
await fetch('/_allauth/browser/v1/auth/session', { method: 'DELETE', headers: { 'X-CSRFToken': csrf() } })

// 5. Join a state community (signed in), then open the WhatsApp link
const r = await fetch('/api/join', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrf() },
  body: JSON.stringify({ state: 'Lagos', role: 'family' }),
})
const { whatsapp_invite_url } = await r.json()
```
Every POST/PATCH/DELETE from a signed-in browser needs the `X-CSRFToken` header.

The story and partner forms submit directly to the API and surface validation errors. If Turnstile is enabled, set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` on the website as well as `TURNSTILE_SECRET_KEY` on the backend.

## 6. Deploying
- Set `DEBUG=false`, a real `SECRET_KEY`, `ALLOWED_HOSTS`, `CSRF_TRUSTED_ORIGINS`, `FRONTEND_URL`, `DATABASE_URL` (Postgres) and a hard-to-guess `ADMIN_URL`.
- The Docker container runs `python manage.py migrate --noinput` before starting Gunicorn, so schema updates are applied at startup (including on Render's free tier, which does not offer a pre-deploy command). Migration errors stop the service from starting. This startup approach is intended for a single running instance; use a release/pre-deploy migration step before scaling to multiple instances.
- The `/healthz` endpoint checks database connectivity and can be used as the platform health-check path.
- `nurospectrum-backend/.env.production.example` is a template, not a deployable environment file. Set its values in your hosting provider. The current Render hostname is `nurospectrum.onrender.com`; the app also allows Render's `RENDER_EXTERNAL_HOSTNAME` automatically.
- On Render, set the service root directory to `nurospectrum-backend`, use its Dockerfile, and set `/healthz` as the health-check path. The container applies migrations before serving requests, so a separate pre-deploy command is not required. Configure a managed PostgreSQL database and use its internal connection URL as `DATABASE_URL`. Set a long, random `SECRET_KEY` using the command in the environment template.
- Attach persistent storage and set `MEDIA_ROOT` to its mount path before launch. After deployment, run `python manage.py seed_site` once from the Render Shell so generated cover images are written to the persistent disk; run it again after removing the seed image files. Do not run image seeding as a pre-deploy command because that command's filesystem is not the running service's disk.
- On Vercel, set the project root directory to `nurospectrum-website` and configure `NEXT_PUBLIC_SITE_URL` and `API_ORIGIN` from `nurospectrum-website/.env.production.example`. `API_ORIGIN` must be `https://nurospectrum.onrender.com`. Redeploy after setting environment variables.
- Google sign-in is hidden while `NEXT_PUBLIC_GOOGLE_SIGN_IN_ENABLED=false`. When ready, configure the OAuth client ID and secret in Render, add `https://nurospectrum-website.vercel.app/accounts/google/login/callback/` as an authorized redirect URI in Google Cloud, set the frontend flag to `true` in Vercel, then redeploy.
- Configure an SMTP provider before launch; without `EMAIL_HOST`, Django uses the console backend and inquiries will not be delivered by email.
- Blog uploads require persistent storage. Render persistent disks may require a paid service plan; confirm the hosting cost before enabling uploads. Set `MEDIA_ROOT` to the disk mount path or configure object storage before accepting uploads; deploy containers' local filesystems are not a durable media store.
- Behind a load balancer set `NUM_PROXIES` so rate limiting sees real client IPs.
- Rate-limit counters are kept in each process's memory by default. With several workers, switch Django's cache to Redis or the database cache so limits are shared.
- Back up the database. Stories and member data are personal.
- Blog uploads are stored under `MEDIA_ROOT` (`media/` locally). Configure persistent media storage or an object-storage backend before accepting uploads in production; uploaded files are not included in database backups automatically.

## 7. Privacy checklist
- Only collect what you need. Phone numbers are never stored; WhatsApp joining happens in WhatsApp.
- Nigeria's data protection law (NDPA 2023) applies. Add a privacy policy and get proper legal advice on consent and retention.
- Moderate every story, and remove any child's full name or photo before approving.
- Turn on 2-step verification for every Google account that can use the admin, and keep the admin user list short.
