import content from './content.json';
export type Locale = 'ka' | 'en';
export type ContentEntry = (typeof content)[number];
export { content };
export const translations = Object.fromEntries(content.map(entry => [entry.id, entry])) as Record<string, ContentEntry>;
export function translator(locale: Locale) {
  return (id: string): string => {
    const entry = translations[id];
    if (!entry) throw new Error(`Missing translation entry: ${id}`);
    return entry[locale];
  };
}
export function localePath(locale: Locale) {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  return `${base}${locale}/`;
}
