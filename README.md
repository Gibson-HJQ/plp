# Kintaro Portfolio Clone

Next.js recreation of https://www.xkintaro.com/en.

```bash
npm install
npm run dev
```

Open `http://localhost:3000/en` (the root path also renders the same page).

The page includes responsive layouts, smooth anchor navigation, theme toggle, language toggle state, expandable About copy, project hover states, contact links, and locally stored visual assets.

## Docker

完整部署、更新和故障排查说明见 [DEPLOYMENT.md](./DEPLOYMENT.md)。

The Docker setup exposes the app on host port `3002` by default:

```bash
docker compose up -d --build
```

Open `http://localhost:3002/en`. To use another host port, set `HOST_PORT`:

```bash
HOST_PORT=8080 docker compose up -d --build
```
