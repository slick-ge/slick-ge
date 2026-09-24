import georgian from './ka.json';
export type Locale = 'ka' | 'en';
export const translations: Record<string, string> = georgian;
export function translator(locale: Locale) {
  return (english: string): string => {
    if (locale === 'en') return english;
    const translated = translations[english];
    if (translated === undefined) throw new Error(`Missing Georgian translation: ${english}`);
    return translated;
  };
}
export function localePath(locale: Locale) {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');
  return `${base}${locale}/`;
}
