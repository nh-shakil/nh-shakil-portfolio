function getApiBase() {
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

