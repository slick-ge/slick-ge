import { handoverSections } from '../data/handover';

export function GET() {
  const markdown = [
    '# CI/CD handover checklist',
    'By Aleksandre Ghvineria — Slick',
    'Use this as a walkthrough with the team receiving the pipeline. Adapt it to your application, assign owners to open items, and keep secret values out of the document.',
    ...handoverSections.map(section => `## ${section.title}\n\n${section.description}\n\n${section.checks.map(check => `- [ ] ${check}`).join('\n')}`),
    '## Follow-up\n\n| Open item | Owner | Next step |\n| --- | --- | --- |\n| | | |',
  ].join('\n\n');
  return new Response(`${markdown}\n`, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
