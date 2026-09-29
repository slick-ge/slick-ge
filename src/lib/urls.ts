/** Build public paths consistently for both domain-root and subpath deployments. */
export function sitePath(path = '') {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  return `${base}${path.replace(/^\//, '')}`;
}

export function absoluteUrl(path: string, site: URL) {
  return new URL(sitePath(path), site).href;
}
