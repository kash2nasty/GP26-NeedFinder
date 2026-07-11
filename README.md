# GP 26 NeedFinder

**Find every benefit you're owed. In seconds.**

GP 26 NeedFinder is an AI-powered benefits and resource navigator that helps residents across the Northeast United States discover government assistance programs, financial aid, healthcare support, and social services they qualify for based on their personal situation.

Built by students of [The Germination Project](https://germinationproject.com).

## Features

- **AI-Powered Eligibility Analysis** - Claude analyzes your situation against 200+ federal, state, and local programs
- **11 Northeast States** - CT, DE, MA, MD, ME, NH, NJ, NY, PA, RI, VT
- **Multi-Step Intake Form** - Smooth, guided experience with progress tracking
- **Personalized Results** - Filterable program cards with apply links and document checklists
- **Nearby Resources Map** - Mapbox map of food banks, legal aid, and workforce centers
- **Share Results** - Generate a unique link to save or share your results
- **English & Spanish** - Full i18n support throughout the app

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Tailwind CSS, Framer Motion, Vite |
| Backend | Node.js, Express |
| AI | Anthropic Claude API (claude-sonnet-4-6) |
| Database | Supabase |
| Maps | Mapbox GL |
| Deployment | Vercel (frontend) + Render (backend) |

## Project Structure

```
GP-26-NeedFinder/
├── client/          # React frontend (Vite)
├── server/          # Express API backend
├── .env.example     # Environment variable template
├── package.json     # Root scripts (run both with one command)
└── README.md
```

## Local Development

### Prerequisites

- Node.js 18+
- npm
- Anthropic API key ([console.anthropic.com](https://console.anthropic.com))
- Supabase project (optional - share links fall back to in-memory storage)
- Mapbox access token (optional - map shows list fallback without it)

### Setup

1. **Clone and install everything:**

```bash
cd GP-26-NeedFinder
cp .env.example .env
npm run install:all
```

2. **Configure `.env`** at the project root:

```env
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
VITE_MAPBOX_TOKEN=pk.your-mapbox-token
VITE_API_URL=http://localhost:5000
PORT=5000
CLIENT_URL=http://localhost:5173
```

3. **Set up Supabase** (optional but recommended for share links):

   - Create a project at [supabase.com](https://supabase.com)
   - Run the SQL in `server/supabase-schema.sql` in the SQL Editor
   - Copy your project URL and service role key to `.env`

4. **Run the app with one command:**

```bash
npm run dev
```

This starts both the backend (`http://localhost:5000`) and frontend (`http://localhost:5173`) concurrently.

### Individual Commands

```bash
# Backend only
npm run dev --prefix server

# Frontend only
npm run dev --prefix client

# Build frontend for production
npm run build
```

## Deployment

### Frontend → Vercel

1. Push the repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Set **Root Directory** to `client`
4. Add environment variables:
   - `VITE_API_URL` = your Render backend URL (e.g. `https://gp26-needfinder-api.onrender.com`)
   - `VITE_MAPBOX_TOKEN` = your Mapbox token
5. Deploy - Vercel auto-detects Vite and uses `vercel.json` for SPA routing

### Backend → Render

1. Create a new **Web Service** on [Render](https://render.com)
2. Connect your GitHub repo
3. Set **Root Directory** to `server`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables:
   - `ANTHROPIC_API_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `CLIENT_URL` = your Vercel frontend URL (e.g. `https://gp26-needfinder.vercel.app`)
   - `NODE_ENV` = `production`
7. Deploy

Alternatively, use the included `server/render.yaml` with Render Blueprint.

### Post-Deploy Checklist

- [ ] Update `CLIENT_URL` on Render to match your Vercel URL
- [ ] Update `VITE_API_URL` on Vercel to match your Render URL
- [ ] Run Supabase schema SQL if using share links
- [ ] Test the intake form end-to-end in production
- [ ] Verify CORS allows your Vercel domain

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/eligibility/analyze` | Analyze intake data with Claude AI |
| POST | `/api/share` | Create a shareable results link |
| GET | `/api/share/:id` | Retrieve shared results |
| GET | `/api/resources` | List resource centers (filter by state/city/category) |
| GET | `/api/resources/nearby` | Resources sorted by distance |

## Team

**Development:** Advik, Ella, Sofia  
**Marketing:** Aditi, Kent, Neel, Claire

Built by students of **The Germination Project** - [germinationproject.com](https://germinationproject.com)

## Disclaimer

GP 26 NeedFinder is a free community tool. We are not affiliated with any government agency. Always verify eligibility and application requirements directly with the program administrator.
