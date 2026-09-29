import toolIcons from './tool-icons.json';
import { sitePath } from '../lib/urls';
import { toolGroups } from './site';

export const cvUrl = 'https://cv.ghvineria.com/assets/pdf/Aleksandre-Ghvineria-CV-EN.pdf';

export function toolLogo(name: string) {
  const slug = (toolIcons as Record<string, string>)[name];
  return slug ? sitePath(`tool-icons/${slug}.svg`) : undefined;
}

export const profile = {
  en: {
    name: 'Aleksandre Ghvineria',
    role: 'Independent DevOps and automation consultant',
    email: 'aleksandre@ghvineria.com',
    phone: '+995 557 48 38 58',
    summary: 'Independent DevOps and automation consultant working under the name Slick.',
    intro: "My background spans systems administration, application server administration, and DevOps: from supporting 170+ VMs at Georgia's High Council of Justice, to overhauling CI/CD pipelines for every application at JSC Liberty Bank, to my current work in security scanning and cloud infrastructure at EPAM Systems.",
    certifications: [
      ['LPIC-2', 'Linux Professional Institute', '11/2023 – 02/2024'],
      ['LPIC-1', 'Linux Professional Institute', '02/2022 – 04/2022'],
      ['System administration and security course', 'Scientific Cyber Security Association', '11/2020 – 12/2020'],
      ['BSc in Electrical & Computer Engineering', 'Agricultural University of Tbilisi', '2016 – 2021'],
    ],
    projects: [
      ['Secret Santa', 'Personal Golang project with a Gin and GORM backend.', null],
      ['Golang Tools', 'TCP port checker, HTTP load tester, web scraper, and MKV converter.', 'https://github.com/Ghvinerias/learning-golang'],
      ['HomeLAB', 'Proxmox, Kubernetes, Docker, OPNsense, monitoring, and automated updates.', 'https://github.com/Ghvinerias/homelab'],
    ],
  }
} as const;

export { toolGroups };
