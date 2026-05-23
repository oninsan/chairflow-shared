# @chairflow/shared

Shared TypeScript types, ChairFlow theme tokens, and formatting helpers for the ChairFlow API and stylist mobile app.

## Build

```bash
npm install
npm run build
```

Output is written to `dist/`. Consumers should run `npm run build` here after changing types or theme values.

## Consumers

- [`chairflow-api`](../chairflow-api) — stylist REST API
- [`chairflow-stylist`](../chairflow-stylist) — Expo mobile app

Dependency in those projects:

```json
"@chairflow/shared": "file:../chairflow-shared"
```
