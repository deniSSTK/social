# Social Monorepo

<p align="left">
  <img alt="Go" src="https://img.shields.io/badge/Go-1.24-00ADD8?logo=go&logoColor=white" />
  <img alt="Vue" src="https://img.shields.io/badge/Vue-3-42B883?logo=vue.js&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white" />
  <img alt="Docker" src="https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white" />
</p>

This repository contains the full Social app in one place:

- `frontend/`: Vue 3 + TypeScript + Vite client
- `backend/`: Go API
- `docker-compose.yml`: local container orchestration for the whole stack

## Overview

The frontend and backend now live side by side in a single repository so the app can be developed, shipped, and deployed from one root. The monorepo setup keeps Docker, environment configuration, and project documentation centralized.

## Architecture

```text
.
├── backend
│   ├── cmd/app
│   ├── internal
│   └── Dockerfile
├── frontend
│   ├── nginx
│   ├── src
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

At runtime:

- PostgreSQL runs in Docker
- the Go backend serves the API on `:8080`
- nginx serves the built frontend and proxies `/api` to the backend

## Run With Docker

1. Copy the root example env file:

   ```bash
   cp .env.example .env
   ```

2. Fill in real secrets, especially `JWT_SECRET` and `IMGBB_API_KEY`.

3. Start the stack from the repo root:

   ```bash
   docker compose up --build
   ```

4. Open the app at `http://localhost:3000`.

## Run Locally Without Docker

### Backend

1. Copy the backend env file:

   ```bash
   cp backend/.env.example backend/.env
   ```

2. Make sure PostgreSQL is running and matches `backend/.env`.

3. Start the API:

   ```bash
   cd backend
   go run ./cmd/app
   ```

### Frontend

1. Install dependencies:

   ```bash
   cd frontend
   npm install
   ```

2. Optionally copy the frontend env example if you want to customize the Vite dev proxy target:

   ```bash
   cp .env.example .env
   ```

3. Start the Vite dev server:

   ```bash
   npm run dev
   ```

By default, the frontend uses `/api` and the Vite dev server proxies that traffic to `http://localhost:8080`.

## Notes

> [!WARNING]
> This monorepo replaces the previously separate repositories:
> `social-backend`: https://github.com/deniSSTK/social-backend
> `social-frontend`: https://github.com/deniSSTK/social-frontend

> [!NOTE]
> The demo is currently down because the backend is not deployed.
