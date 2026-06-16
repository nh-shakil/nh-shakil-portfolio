import { useEffect, useState } from 'react';
import { defaultSite, mergeSiteSettings } from '../data/site';
import { getApiBase } from '../lib/api';

export function useSite() {
  const [site, setSite] = useState(defaultSite);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiBase = getApiBase();

    fetch(`${apiBase}/api/settings`, { headers: { Accept: 'application/json' } })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.ok && data.site) {
          setSite(mergeSiteSettings(data.site));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { site, loading };
}
