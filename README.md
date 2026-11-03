# Nurospectrum

Nurospectrum is a neurodiversity education and community website for Nigeria.
This repository contains the Next.js website and Django REST API.

## Project structure

- `nurospectrum-website/` - Next.js frontend
- `nurospectrum-backend/` - Django API, admin, seed content, and media

## Run locally

Start the backend in one PowerShell terminal:

```powershell
cd nurospectrum-backend
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py seed_site
.\.venv\Scripts\python.exe manage.py runserver
```

Start the website in a second terminal:

```powershell
cd nurospectrum-website
pnpm install
pnpm dev
```

Open <http://localhost:3000>. The API runs at <http://localhost:8000>.

Copy `nurospectrum-backend/.env.example` to `nurospectrum-backend/.env` and
`nurospectrum-website/.env.example` to `nurospectrum-website/.env.local` when
configuring local secrets and integrations. Never commit those local files.
Set `NEXT_PUBLIC_SITE_URL` in the website environment to the production site
origin (for example, `https://www.example.com`) so canonical metadata, social
previews, `robots.txt`, and `sitemap.xml` use the correct public URLs.
Email/password account creation and sign-in are available. New accounts must
verify their email address. Google sign-in is optional and requires OAuth
credentials; the public website can be explored without them.

See [the backend README](./nurospectrum-backend/README.md) for API, admin,
deployment, and configuration details.

## Production setup

The current deployment target is Vercel for the website and Render for the API.
Use [the frontend production environment template](./nurospectrum-website/.env.production.example)
for Vercel and [the backend production environment template](./nurospectrum-backend/.env.production.example)
for Render. The current backend hostname is `nurospectrum.onrender.com`.
Keep OAuth, database, SMTP, Turnstile secret, and Django secret values in provider
environment settings, never in Git.
