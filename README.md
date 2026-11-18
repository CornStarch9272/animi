# Animi

Anime bingo boards making tool & realtime multiplayer jigsaw puzzles game!

## Project Overview

This is a monorepo managed with [Bun](https://bun.sh) workspaces and [Turborepo](https://turbo.build).

## Prerequisites

- **[Git](https://git-scm.com/install/)**
- **[Bun](https://bun.sh/docs/installation)**
- **[Node.js](https://nodejs.org/en/download)**

## Running Locally

1. **Clone the repository**

```bash
git clone https://github.com/aesnor/animi.git
cd animi
```

2. **Install dependencies** from the root

```bash
bun install
```

3. **Start the dev servers** from the root

```bash
bun run dev
```

The app should be open locally at http://localhost:3000 (3001 for boards and 3002 for puzzles)

## Puzzles API

The realtime worker starts with the admin key set to `dev`.

While running, change the puzzle with a POST request:

```bash
curl "http://127.0.0.1:8787/api/admin/update-puzzle" \
  -H "X-Admin-Key: dev" \
  -d '{
    "title": "Puzzle Title",
    "imageUrl": "<direct image URL>",
    "pieces": 30
  }'
```

Open/close a room with:

```bash
curl "http://127.0.0.1:8787/api/admin/set-closed" \
  -H "X-Admin-Key: dev" \
  -d '{
    "closed": true
  }'
```

When on a deployed app, change the `http://127.0.0.1:8787` to your domain, like https://puzzles.animi.moe or https://puzzles-XXX.pages.dev

## Deploying Animi

You'll need a cloudflare account, and if you want to deploy boards, you also need a vercel account for the proxy.

### Cloudflare

Each app (home, boards, and puzzles) should be deployed as its own separate Cloudflare Pages project.

1. Navigate to your Cloudflare Dashboard and select Workers & Pages in the sidebar.
2. Click Create application, then click **Continue to Pages** (next to **Need to use the legacy Pages workflow?**)
3. Link your GitHub account and select your forked repository.
4. Use these build settings (replace boards with any other):

- **Framework preset:** None / Other
- **Build command:** `bun run --filter boards build`
- **Build output directory:** `apps/boards/out`
- **Root directory:** _(leave blank)_

5. Under Environment Variables, add any required production URLs or configuration variables (such as `NEXT_PUBLIC_PROXY_URL` or custom domains) before clicking Save and Deploy.

### Puzzles Realtime Worker

The worker can be deployed locally from your terminal.

1. Navigate to your `apps/puzzles-realtime` directory in your terminal

```bash
cd apps/puzzles-realtime
```

2. Deploy with:

```bash
bunx wrangler deploy
```

3. Set the `ADMIN_KEY` variable:

```bash
bunx wrangler secret put ADMIN_KEY
```

### Vercel Proxy

The boards app uses a proxy deployed on Vercel to handle downloading AniList images when exporting a board to a JPEG.

#### Setting up the Proxy on Vercel:

1. Log in to your [Vercel Dashboard](https://vercel.com/) and click **Create new...** then **Project**.
2. Connect your github account and import your forked repository.
3. In the project configuration settings, make sure the **Root Directory** setting is set to `apps/proxy`
4. Deploy, Vercel should handle most of the setup

Once deployed, use your Vercel proxy URL (e.g., [https://your-proxy-project.vercel.app](https://your-proxy-project.vercel.app)) as the value for the `NEXT_PUBLIC_PROXY_URL` environment variable for the boards app.
