import { readFileSync, writeFileSync } from 'node:fs';
const translations = JSON.parse(readFileSync(new URL('../src/i18n/ka.json', import.meta.url), 'utf8'));
const escape = text => text.replaceAll('|', '\\|').replaceAll('\n', '<br>');
const rows = Object.entries(translations).map(([en, ka], index) => `| ${index + 1} | ${escape(ka)} | ${escape(en)} |`).join('\n');
writeFileSync(new URL('../docs/translations.md', import.meta.url), `# Georgian / English translation review\n\nDraft for review. Generated from src/i18n/ka.json with npm run translations:review.\nGeorgian is served at /, English at /en/. Product names stay unchanged.\n\n| # | ქართული | English |\n| --- | --- | --- |\n${rows}\n`);
