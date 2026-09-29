import { profile } from '../data/profile';
import { servicePages, type ServicePage } from '../data/services';
import { sitePath, absoluteUrl } from './urls';

export const guidePath = 'en/guides/ci-cd-handover-checklist/';
export const indexablePaths = [
  'en/', 'en/about/',
  ...servicePages.map(service => `en/services/${service.slug}/`),
  guidePath,
];

export interface Breadcrumb { name: string; href: string; }
export type PageKind = 'home' | 'about' | 'service' | 'guide';

export function pageSchema({ site, canonical, title, description, kind, breadcrumbs = [], service }: {
  site: URL; canonical: string; title: string; description: string;
  kind: PageKind; breadcrumbs?: Breadcrumb[]; service?: ServicePage;
}) {
  const root = absoluteUrl('', site);
  const personId = `${root}#person`;
  const websiteId = `${root}#website`;
  const person = {
    '@type': 'Person', '@id': personId,
    name: profile.en.name, url: absoluteUrl('en/about/', site),
    image: absoluteUrl('aleksandre-ghvineria.jpeg', site),
    description: profile.en.summary,
    sameAs: ['https://github.com/ghvinerias', 'https://www.linkedin.com/in/aleksandre-ghvineria', 'https://cv.ghvineria.com/en/'],
  };
  const serviceNode = (item: ServicePage) => ({
    '@type': 'Service', '@id': `${root}#service-${item.id}`,
    name: item.name, description: item.description,
    url: absoluteUrl(`en/services/${item.slug}/`, site),
    provider: { '@id': personId },
  });
  const page: Record<string, unknown> = {
    '@type': kind === 'about' ? ['AboutPage', 'ProfilePage'] : 'WebPage',
    '@id': `${canonical}#webpage`, url: canonical, name: title, description,
    inLanguage: 'en', isPartOf: { '@id': websiteId },
  };
  const graph: Record<string, unknown>[] = [
    { '@type': 'WebSite', '@id': websiteId, url: root, name: 'Slick', inLanguage: 'en', publisher: { '@id': personId } },
    person, page,
  ];
  if (kind === 'about') page.mainEntity = { '@id': personId };
  if (kind === 'guide') page.author = { '@id': personId };
  if (kind === 'home') {
    graph.push(...servicePages.map(serviceNode));
    page.mainEntity = servicePages.map(item => ({ '@id': `${root}#service-${item.id}` }));
  }
  if (kind === 'service' && service) {
    graph.push(serviceNode(service));
    page.mainEntity = { '@id': `${root}#service-${service.id}` };
  }
  if (breadcrumbs.length > 1) {
    page.breadcrumb = { '@id': `${canonical}#breadcrumb` };
    graph.push({
      '@type': 'BreadcrumbList', '@id': `${canonical}#breadcrumb`,
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem', position: index + 1, name: item.name,
        item: new URL(item.href, site).href,
      })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

export function pageBreadcrumb(name: string, path: string): Breadcrumb[] {
  return [{ name: 'Home', href: sitePath('en/') }, { name, href: sitePath(path) }];
}
