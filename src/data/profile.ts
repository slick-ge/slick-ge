import { toolGroups } from './site';

export const cvUrl = 'https://cv.ghvineria.com/assets/pdf/Aleksandre-Ghvineria-CV-EN.pdf';

const logoSlugs: Record<string, string> = {
  GitHub: 'github', 'GitHub Actions': 'githubactions', GitLab: 'gitlab', Jenkins: 'jenkins', Docker: 'docker', Kubernetes: 'kubernetes', Helm: 'helm', Terraform: 'terraform', Ansible: 'ansible', Proxmox: 'proxmox', 'VMware ESXi / vSphere': 'vmware', 'Hyper-V': 'microsoft', AWS: 'amazonaws', Azure: 'microsoftazure', GCP: 'googlecloud', Linux: 'linux', Debian: 'debian', Ubuntu: 'ubuntu', 'Raspberry Pi': 'raspberrypi', 'GitLab CI/CD': 'gitlab', 'GitHub Advanced Security': 'github', CodeQL: 'github', Dependabot: 'dependabot', SonarQube: 'sonarqube', Grafana: 'grafana', Prometheus: 'prometheus', Zabbix: 'zabbix', Loki: 'grafana', NGINX: 'nginx', Cloudflare: 'cloudflare', WireGuard: 'wireguard', Tailscale: 'tailscale', OpenVPN: 'openvpn', OPNsense: 'opnsense', PostgreSQL: 'postgresql', MySQL: 'mysql', Redis: 'redis', MongoDB: 'mongodb', 'Apache Kafka': 'apachekafka', n8n: 'n8n', 'Node-RED': 'nodered', Go: 'go', Bash: 'gnubash', Python: 'python', PowerShell: 'powershell', Postman: 'postman', 'Docker Compose': 'docker', BuildKit: 'docker', 'Argo CD': 'argo', 'Artifactory': 'jfrog', GHCR: 'github', 'K3s': 'k3s', kubectl: 'kubernetes', 'CentOS': 'centos', 'TrueNAS': 'truenas', ZFS: 'openzfs', 'HashiCorp Vault': 'vault', Infisical: 'infisical', 'Bitwarden Secrets Manager': 'bitwarden', 'OpenTelemetry': 'opentelemetry', 'ELK Stack': 'elastic', RabbitMQ: 'rabbitmq', 'Apache ZooKeeper': 'apachezookeeper', 'Home Assistant': 'homeassistant', 'Cloud-init': 'cloudflare', SSH: 'gnubash', rsync: 'linux', LXC: 'linux', KVM: 'linux', systemd: 'linux', cron: 'linux', Webhooks: 'webhooks', jq: 'jqlang', Codex: 'openai', Claude: 'anthropic', Bruno: 'bruno', 'HAProxy': 'haproxy', Traefik: 'traefik', OpenWrt: 'openwrt', Nagios: 'nagios', Alertmanager: 'prometheus', Kustomize: 'kubernetes', k9s: 'kubernetes', 'External Secrets Operator': 'kubernetes', 'Ansible Vault': 'ansible', 'Proxmox Backup Server': 'proxmox', MariaDB: 'mariadb', 'Azure DevOps': 'azuredevops', 'OpenStack': 'openstack', Veeam: 'veeam'
};

const logoUrls: Record<string, string> = {
  Infisical: 'https://avatars.githubusercontent.com/u/107880645?v=4',
  'Apache ZooKeeper': 'apache',
  'Cloud-init': 'linux',
  'cloud-init': 'linux',
  HAProxy: 'nginx',
  jq: 'json',
  Nagios: 'grafana',
  Traefik: 'nginx',
  'Ubuntu Server': 'ubuntu',
  Webhooks: 'github',
  Zabbix: 'grafana',
};

export function toolLogo(name: string) {
  const slug = logoUrls[name] || logoSlugs[name] || name.toLowerCase().replace(/[^a-z0-9]+/g, '');
  return slug.startsWith('http') ? slug : `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`;
}

export const profile = {
  en: {
    name: 'Aleksandre Ghvineria',
    role: 'DevOps Practitioner',
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
      ['Secret Santa', 'Personal Golang project with a Gin and GORM backend.', 'https://github.com/slick-ge/secret-santa-backend'],
      ['Golang Tools', 'TCP port checker, HTTP load tester, web scraper, and MKV converter.', 'https://github.com/Ghvinerias/learning-golang'],
      ['HomeLAB', 'Proxmox, Kubernetes, Docker, OPNsense, monitoring, and automated updates.', 'https://github.com/Ghvinerias/homelab'],
    ],
  }
} as const;

export { toolGroups };
