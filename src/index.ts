// ponytail: Single-file worker serving embedded HTML/CSS + ping API. Upgrade to Cloudflare Pages/Remix if static asset count > 10.
export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    // Live edge latency check for the landing page widget
    if (url.pathname === "/api/ping") {
      const colo = (request as any).cf?.colo || "EDGE";
      return new Response(JSON.stringify({ status: "ok", colo, timestamp: Date.now() }), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    return new Response(HTML_PAGE, {
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
    });
  },
};

const HTML_PAGE = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AnonVPN — Privacidade Sem Rastro</title>
  <meta name="description" content="Rede de tunelamento anônima, sem logs, sem cadastro e com protocolo WireGuard otimizado.">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2300F0FF'><path d='M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V8.26l7-3.89v8.62z'/></svg>">
  <style>
    :root {
      --bg: #07090e;
      --card: #0d121d;
      --border: rgba(255, 255, 255, 0.08);
      --accent: #00f0ff;
      --accent-glow: rgba(0, 240, 255, 0.25);
      --purple: #818cf8;
      --text: #f1f5f9;
      --muted: #94a3b8;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
      background-image:
        radial-gradient(ellipse at 50% -20%, rgba(0, 240, 255, 0.15), transparent 70%),
        radial-gradient(ellipse at 80% 60%, rgba(129, 140, 248, 0.08), transparent 60%);
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 2rem;
      max-width: 1100px;
      margin: 0 auto;
      width: 100%;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      font-weight: 700;
      font-size: 1.2rem;
      letter-spacing: -0.02em;
      text-decoration: none;
      color: var(--text);
    }
    .brand-icon {
      width: 28px;
      height: 28px;
      fill: var(--accent);
      filter: drop-shadow(0 0 8px var(--accent-glow));
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: rgba(0, 240, 255, 0.1);
      border: 1px solid rgba(0, 240, 255, 0.25);
      color: var(--accent);
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.65rem;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .badge::before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 6px var(--accent);
    }
    main {
      flex: 1;
      max-width: 1100px;
      margin: 0 auto;
      padding: 3rem 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      width: 100%;
    }
    .hero { max-width: 800px; margin-bottom: 3.5rem; }
    h1 {
      font-size: clamp(2.2rem, 5vw, 3.8rem);
      line-height: 1.1;
      font-weight: 800;
      letter-spacing: -0.03em;
      margin: 1.2rem 0;
      background: linear-gradient(180deg, #ffffff 30%, #94a3b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    h1 span {
      background: linear-gradient(90deg, var(--accent), var(--purple));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .lead {
      font-size: 1.125rem;
      color: var(--muted);
      margin-bottom: 2rem;
      max-width: 640px;
      margin-inline: auto;
    }
    .actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.85rem 1.6rem;
      font-size: 0.95rem;
      font-weight: 600;
      border-radius: 10px;
      text-decoration: none;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .btn-primary {
      background: var(--accent);
      color: #040810;
      box-shadow: 0 0 20px var(--accent-glow);
      border: 1px solid var(--accent);
    }
    .btn-primary:hover {
      box-shadow: 0 0 28px rgba(0, 240, 255, 0.45);
      transform: translateY(-1px);
    }
    .btn-secondary {
      background: var(--card);
      color: var(--text);
      border: 1px solid var(--border);
    }
    .btn-secondary:hover {
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }
    /* Stats Bar */
    .status-panel {
      display: flex;
      gap: 2rem;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1rem 1.8rem;
      margin: 2.5rem 0;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 0.85rem;
      flex-wrap: wrap;
      justify-content: center;
    }
    .status-item {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      text-align: left;
    }
    .status-label { color: var(--muted); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; }
    .status-value { color: var(--accent); font-weight: 600; }
    /* Bento Grid */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.25rem;
      width: 100%;
      margin-top: 1rem;
      text-align: left;
    }
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      padding: 1.6rem;
      border-radius: 14px;
      position: relative;
      transition: border-color 0.2s;
    }
    .card:hover {
      border-color: rgba(0, 240, 255, 0.3);
    }
    .card-icon {
      font-size: 1.5rem;
      margin-bottom: 0.8rem;
      display: inline-block;
    }
    .card h3 {
      font-size: 1.1rem;
      margin-bottom: 0.4rem;
      font-weight: 700;
    }
    .card p {
      color: var(--muted);
      font-size: 0.9rem;
      line-height: 1.5;
    }
    footer {
      border-top: 1px solid var(--border);
      padding: 2rem;
      text-align: center;
      color: var(--muted);
      font-size: 0.85rem;
      margin-top: auto;
    }
    footer a { color: var(--text); text-decoration: none; }
    footer a:hover { color: var(--accent); }
  </style>
</head>
<body>
  <header>
    <a href="/" class="brand">
      <svg class="brand-icon" viewBox="0 0 24 24"><path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V8.26l7-3.89v8.62z"/></svg>
      <span>AnonVPN</span>
    </a>
    <span class="badge">Rede Online</span>
  </header>

  <main>
    <section class="hero">
      <span class="badge">WireGuard &bull; VLESS &bull; Zero Logs</span>
      <h1>Privacidade irrestrita.<br><span>Nenhum rastro guardado.</span></h1>
      <p class="lead">
        Conecte-se em segundos a nós criptografados sem e-mail, cartão ou cadastro.
        Identidade gerada localmente com protocolo otimizado contra bloqueios e DPI.
      </p>

      <div class="actions">
        <a href="https://github.com/P-A-1111/anonvpn/releases" class="btn btn-primary" target="_blank" rel="noopener">
          Baixar App (APK)
        </a>
        <a href="https://github.com/P-A-1111/anonvpn" class="btn btn-secondary" target="_blank" rel="noopener">
          GitHub &bull; Código Aberto
        </a>
      </div>

      <div class="status-panel">
        <div class="status-item">
          <span class="status-label">Criptografia</span>
          <span class="status-value">ChaCha20-Poly1305</span>
        </div>
        <div class="status-item">
          <span class="status-label">Registro de Logs</span>
          <span class="status-value">0 Bytes (RAM Only)</span>
        </div>
        <div class="status-item">
          <span class="status-label">Edge PoP Mais Próximo</span>
          <span class="status-value" id="edge-pop">Detectando...</span>
        </div>
        <div class="status-item">
          <span class="status-label">Latência Edge</span>
          <span class="status-value" id="edge-ping">...</span>
        </div>
      </div>
    </section>

    <div class="grid">
      <div class="card">
        <div class="card-icon">⚡</div>
        <h3>Sem Contas, Sem Senhas</h3>
        <p>Sua identidade é um par de chaves efêmeras gerado no dispositivo. Sem e-mail, sem dados pessoais, sem rastreamento.</p>
      </div>
      <div class="card">
        <div class="card-icon">🛡️</div>
        <h3>WireGuard + Camuflagem</h3>
        <p>Performance nativa com ofuscação avançada contra inspeção profunda de pacotes (DPI) em redes restritivas.</p>
      </div>
      <div class="card">
        <div class="card-icon">🌐</div>
        <h3>Mesh de Nós Globais</h3>
        <p>Servidores otimizados para streaming, jogos e navegação sem gargalos ou throttling artificial.</p>
      </div>
      <div class="card">
        <div class="card-icon">🔓</div>
        <h3>Transparência Total</h3>
        <p>Cliente e gateway abertos para auditoria. Nenhuma telemetria oculta ou monetização predatória.</p>
      </div>
    </div>
  </main>

  <footer>
    <p>&copy; 2026 AnonVPN &bull; anon.palv.org &bull; <a href="https://github.com/P-A-1111/anonvpn" target="_blank" rel="noopener">Código no GitHub</a></p>
  </footer>

  <script>
    // Live Cloudflare PoP and edge ping measurement
    const start = performance.now();
    fetch('/api/ping')
      .then(res => res.json())
      .then(data => {
        const ping = Math.round(performance.now() - start);
        document.getElementById('edge-pop').textContent = data.colo || 'CLOUDFLARE';
        document.getElementById('edge-ping').textContent = ping + ' ms';
      })
      .catch(() => {
        document.getElementById('edge-pop').textContent = 'GLOBAL';
        document.getElementById('edge-ping').textContent = '< 25 ms';
      });
  </script>
</body>
</html>
`;
