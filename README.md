# anonvpn-web

Landing page oficial do AnonVPN servida no Cloudflare Workers (`anon.palv.org`).

## Comandos

```bash
# Rodar localmente
npm run dev

# Deploy para anon.palv.org
npm run deploy
```

## Estrutura
- `src/index.ts`: Worker único contendo landing page otimizada (HTML/CSS inline, 0 dependências de runtime) e endpoint `/api/ping` para medição de latência edge.
- `wrangler.toml`: Configuração de rota customizada para o domínio `anon.palv.org`.
