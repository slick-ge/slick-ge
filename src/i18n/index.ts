import content from './content.json';
export type Locale = 'en';
export type ContentId = keyof typeof content;
export type ContentEntry = (typeof content)[ContentId];
export { content };
export const translations = content;
export function translator(_locale: Locale) {
  return (id: ContentId): string => {
    const entry = Object.hasOwn(translations, id) ? translations[id] : undefined;
    if (!entry) throw new Error(`Missing translation entry: ${id}`);
    return entry.en;
  };
}
export function localePath(_locale: Locale = 'en') {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  return base;
}
