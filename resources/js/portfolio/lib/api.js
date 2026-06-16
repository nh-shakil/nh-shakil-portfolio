export function getApiBase() {
  const base = import.meta.env?.VITE_API_BASE_URL;
  return typeof base === 'string' ? base.replace(/\/+$/, '') : '';
}

export async function apiGet(path) {
  const base = getApiBase();
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`GET ${url} failed`);
  return await res.json();
}

export async function apiPost(path, body) {
  const base = getApiBase();
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const err = new Error(data?.message || `POST ${url} failed`);
    err.status = res.status;
    err.errors = data?.errors;
    throw err;
  }

  return data;
}
