/**
 * Sveltia CMS Auth — Password Portal Worker
 * Autenticación directa por contraseña sin cuenta de GitHub para el cliente.
 * Incluye ruta /cambiar-clave para que el administrador cambie su contraseña
 * de forma autónoma sin necesidad de acceder al código fuente.
 */

const DEFAULT_PASSWORD = 'seiken2026';
const KV_KEY = 'admin_password';

/**
 * Obtiene la contraseña activa en este orden de prioridad:
 * 1. Cloudflare KV (si el dueño la cambió alguna vez)
 * 2. Variable de entorno ADMIN_PASSWORD
 * 3. Contraseña por defecto 'seiken2026'
 */
async function getActivePassword(env) {
  try {
    if (env.CMS_STORAGE) {
      const stored = await env.CMS_STORAGE.get(KV_KEY);
      if (stored) return stored;
    }
  } catch (_) { /* KV no disponible, continuar */ }
  return env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
}

export default {
  async fetch(request, env) {
    const url  = new URL(request.url);
    const path = url.pathname;

    const corsHeaders = {
      'Access-Control-Allow-Origin':  '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // ── Ruta: Pantalla de inicio de sesión ──────────────────────────────────
    if (path === '/auth' && request.method === 'GET') {
      return new Response(renderLoginForm(''), {
        headers: { ...corsHeaders, 'Content-Type': 'text/html;charset=UTF-8' }
      });
    }

    // ── Ruta: Procesar inicio de sesión ─────────────────────────────────────
    if (path === '/auth' && request.method === 'POST') {
      try {
        const formData  = await request.formData();
        const password  = formData.get('password');
        const adminPass = await getActivePassword(env);

        if (password === adminPass) {
          const pat = env.GITHUB_PAT;
          if (!pat) {
            return new Response(renderLoginForm('Error de servidor: GITHUB_PAT no está configurado en Cloudflare.'), {
              headers: { ...corsHeaders, 'Content-Type': 'text/html;charset=UTF-8' }
            });
          }
          return sendScript('success', { token: pat, provider: 'github' }, corsHeaders);
        } else {
          return new Response(renderLoginForm('Contraseña incorrecta. Inténtalo de nuevo.'), {
            headers: { ...corsHeaders, 'Content-Type': 'text/html;charset=UTF-8' }
          });
        }
      } catch (e) {
        return new Response(renderLoginForm('Error al procesar la solicitud.'), {
          headers: { ...corsHeaders, 'Content-Type': 'text/html;charset=UTF-8' }
        });
      }
    }

    // ── Ruta: Pantalla de cambio de contraseña ──────────────────────────────
    if (path === '/cambiar-clave' && request.method === 'GET') {
      return new Response(renderChangePasswordForm({ error: '', success: '' }), {
        headers: { ...corsHeaders, 'Content-Type': 'text/html;charset=UTF-8' }
      });
    }

    // ── Ruta: Procesar cambio de contraseña ─────────────────────────────────
    if (path === '/cambiar-clave' && request.method === 'POST') {
      try {
        const formData    = await request.formData();
        const currentPass = formData.get('current_password');
        const newPass     = formData.get('new_password');
        const confirmPass = formData.get('confirm_password');
        const adminPass   = await getActivePassword(env);

        if (currentPass !== adminPass) {
          return new Response(renderChangePasswordForm({ error: 'La contraseña actual es incorrecta.', success: '' }), {
            headers: { ...corsHeaders, 'Content-Type': 'text/html;charset=UTF-8' }
          });
        }

        if (!newPass || newPass.trim().length < 6) {
          return new Response(renderChangePasswordForm({ error: 'La nueva contraseña debe tener al menos 6 caracteres.', success: '' }), {
            headers: { ...corsHeaders, 'Content-Type': 'text/html;charset=UTF-8' }
          });
        }

        if (newPass !== confirmPass) {
          return new Response(renderChangePasswordForm({ error: 'Las contraseñas nuevas no coinciden.', success: '' }), {
            headers: { ...corsHeaders, 'Content-Type': 'text/html;charset=UTF-8' }
          });
        }

        if (!env.CMS_STORAGE) {
          return new Response(renderChangePasswordForm({ error: 'Error de servidor: el almacenamiento KV no está configurado.', success: '' }), {
            headers: { ...corsHeaders, 'Content-Type': 'text/html;charset=UTF-8' }
          });
        }

        await env.CMS_STORAGE.put(KV_KEY, newPass);

        return new Response(renderChangePasswordForm({ error: '', success: '¡Contraseña actualizada correctamente! Ya puedes usar tu nueva clave para ingresar al panel.' }), {
          headers: { ...corsHeaders, 'Content-Type': 'text/html;charset=UTF-8' }
        });

      } catch (e) {
        return new Response(renderChangePasswordForm({ error: 'Error al procesar la solicitud. Inténtalo de nuevo.', success: '' }), {
          headers: { ...corsHeaders, 'Content-Type': 'text/html;charset=UTF-8' }
        });
      }
    }

    // ── Callback de compatibilidad ───────────────────────────────────────────
    if (path === '/callback') {
      return new Response('OK', { status: 200, headers: corsHeaders });
    }

    return new Response('Sveltia CMS Password Auth Worker — OK', {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'text/plain' },
    });
  },
};

// ── Templates HTML ───────────────────────────────────────────────────────────

const BASE_STYLES = `
  :root {
    --bg: #0b0f19;
    --card: #182234;
    --accent: #22c55e;
    --accent-hover: #16a34a;
    --text: #f8fafc;
    --muted: #94a3b8;
    --error: #ef4444;
    --success: #22c55e;
  }
  * { margin:0; padding:0; box-sizing:border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
  body {
    background: var(--bg);
    color: var(--text);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
  }
  .card {
    background: var(--card);
    border-radius: 16px;
    padding: 32px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.1);
    text-align: center;
  }
  .logo { font-size: 22px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 6px; color: #fff; }
  .logo span { color: var(--accent); }
  .subtitle { font-size: 13px; color: var(--muted); margin-bottom: 24px; }
  label { display: block; text-align: left; font-size: 12px; color: var(--muted); margin-bottom: 6px; font-weight: 500; }
  .field { margin-bottom: 14px; }
  input[type="password"] {
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #334155;
    background: #0b0f19;
    color: #fff;
    font-size: 15px;
    outline: none;
    transition: border-color 0.2s;
  }
  input[type="password"]:focus { border-color: var(--accent); }
  button {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: none;
    background: var(--accent);
    color: #000;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 6px;
  }
  button:hover { background: var(--accent-hover); }
  .alert {
    font-size: 13px;
    padding: 10px 14px;
    border-radius: 8px;
    margin-bottom: 16px;
    text-align: left;
  }
  .alert-error   { background: rgba(239,68,68,0.15);  border: 1px solid var(--error);   color: #fca5a5; }
  .alert-success { background: rgba(34,197,94,0.15);  border: 1px solid var(--success); color: #86efac; }
  .divider   { border: none; border-top: 1px solid #1e2d45; margin: 20px 0; }
  .back-link { display: inline-block; margin-top: 16px; font-size: 12px; color: var(--muted); text-decoration: none; }
  .back-link:hover { color: var(--accent); }
`;

function renderLoginForm(errorMessage = '') {
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Acceso Administrador — Seiken Box</title>
  <style>${BASE_STYLES}</style>
</head>
<body>
  <div class="card">
    <div class="logo">SEIKEN<span>BOX</span></div>
    <div class="subtitle">Panel de Administración · Ingrese su Clave</div>
    ${errorMessage ? `<div class="alert alert-error">${errorMessage}</div>` : ''}
    <form method="POST" action="/auth">
      <input type="password" name="password" placeholder="Contraseña de acceso" autofocus required>
      <button type="submit">Ingresar al Panel</button>
    </form>
    <hr class="divider">
    <a class="back-link" href="/cambiar-clave">¿Olvidaste tu clave o quieres cambiarla?</a>
  </div>
</body>
</html>`;
}

function renderChangePasswordForm({ error, success }) {
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Cambiar Contraseña — Seiken Box</title>
  <style>${BASE_STYLES}</style>
</head>
<body>
  <div class="card">
    <div class="logo">SEIKEN<span>BOX</span></div>
    <div class="subtitle">Cambio de Contraseña del Panel</div>

    ${error   ? `<div class="alert alert-error">${error}</div>`     : ''}
    ${success ? `<div class="alert alert-success">${success}</div>` : ''}

    ${!success ? `
    <form method="POST" action="/cambiar-clave">
      <div class="field">
        <label>Contraseña actual</label>
        <input type="password" name="current_password" placeholder="Tu contraseña actual" required autofocus>
      </div>
      <div class="field">
        <label>Nueva contraseña</label>
        <input type="password" name="new_password" placeholder="Mínimo 6 caracteres" required>
      </div>
      <div class="field">
        <label>Confirmar nueva contraseña</label>
        <input type="password" name="confirm_password" placeholder="Repite la nueva contraseña" required>
      </div>
      <button type="submit">Guardar nueva contraseña</button>
    </form>
    ` : ''}

    <a class="back-link" href="/auth">← Volver al inicio de sesión</a>
  </div>
</body>
</html>`;
}

function sendScript(status, data, corsHeaders) {
  const content = JSON.stringify({ ...data });
  const html = `<!doctype html>
<html><body>
<script>
  (function () {
    var data = { provider: 'github', status: '${status}', result: ${content} };
    window.opener && window.opener.postMessage(
      'authorization:github:${status}:' + JSON.stringify(data.result),
      '*'
    );
    window.close();
  })();
<\/script>
<p>Autenticado correctamente...</p>
</body></html>`;

  return new Response(html, {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'text/html;charset=UTF-8' },
  });
}

