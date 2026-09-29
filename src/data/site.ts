import type { ContentId } from '../i18n';

export const email = 'Aleksandre.Ghvineria@slick.ge';
export const services: { slug: string; link: ContentId; number: string; icon: string; title: ContentId; label: ContentId; description: ContentId; proof: ContentId; tags: ContentId[] }[] = [
  { slug: 'workflow-automation', link: 'services.automation.link', number: '01', icon: 'workflow', title: 'services.automation.title', label: 'services.automation.label', description: 'services.automation.description', proof: 'services.automation.proof', tags: ['tags.integrations', 'tags.tooling', 'tags.operations'] },
  { slug: 'ci-cd', link: 'services.delivery.link', number: '02', icon: 'terminal', title: 'services.delivery.title', label: 'services.delivery.label', description: 'services.delivery.description', proof: 'services.delivery.proof', tags: ['tags.pipelines', 'tags.releases', 'tags.gitops'] },
  { slug: 'code-secrets-security', link: 'services.security.link', number: '03', icon: 'shield', title: 'services.security.title', label: 'services.security.label', description: 'services.security.description', proof: 'services.security.proof', tags: ['tags.ghas', 'tags.secrets'] },
  { slug: 'cloud-infrastructure', link: 'services.infrastructure.link', number: '04', icon: 'layers', title: 'services.infrastructure.title', label: 'services.infrastructure.label', description: 'services.infrastructure.description', proof: "services.infrastructure.proof", tags: ['tags.iac', 'tags.cloud', 'tags.containers'] },
];
export const process: { title: ContentId; text: ContentId }[] = [
  { title: 'approach.understand.title', text: 'approach.understand.description' },
  { title: 'approach.plan.title', text: 'approach.plan.description' },
  { title: 'approach.build.title', text: 'approach.build.description' },
  { title: 'approach.handover.title', text: 'approach.handover.description' },
];
export const toolGroups: { title: ContentId; tools: (string | { name: string; tier: 'daily' | 'familiar' })[] }[] = [
  { title: 'toolkit.delivery', tools: ['GitHub', { name: 'GitHub Actions', tier: 'daily' }, 'GitLab', 'GitLab CI/CD', 'Jenkins', 'Azure DevOps', { name: 'Docker', tier: 'daily' }, 'Docker Compose', 'BuildKit', 'Artifactory', 'GHCR', { name: 'Kubernetes', tier: 'daily' }, 'Helm', 'Kustomize', 'Argo CD', 'k9s', 'K3s', 'kubectl'] },
  { title: 'toolkit.infrastructure', tools: ['AWS', 'Azure', 'GCP', { name: 'Terraform', tier: 'daily' }, { name: 'Ansible', tier: 'daily' }, { name: 'Proxmox', tier: 'daily' }, 'VMware ESXi / vSphere', 'Hyper-V', 'KVM', 'LXC', 'ZFS', 'TrueNAS', 'Proxmox Backup Server', 'CentOS', 'Debian', 'Ubuntu Server', 'Raspberry Pi', 'systemd', 'cloud-init', 'cron', 'SSH', 'rsync'] },
  { title: 'toolkit.security', tools: [{ name: 'GitHub Advanced Security', tier: 'daily' }, { name: 'CodeQL', tier: 'daily' }, 'Dependabot', 'SonarQube', 'Bitwarden Secrets Manager', 'Infisical', 'HashiCorp Vault', 'Ansible Vault', 'External Secrets Operator'] },
  { title: 'toolkit.observability', tools: [{ name: 'Grafana', tier: 'daily' }, { name: 'Prometheus', tier: 'daily' }, 'Alertmanager', 'ELK Stack', 'OpenTelemetry', 'Zabbix', 'Nagios', 'Loki', 'NGINX', 'Traefik', 'HAProxy', 'Cloudflare', 'WireGuard', 'Tailscale', 'OpenVPN', 'OPNsense', 'OpenWrt'] },
  { title: 'toolkit.automation', tools: ['PostgreSQL', 'MySQL', 'Redis', 'RabbitMQ', 'MongoDB', 'Apache Kafka', 'Apache ZooKeeper', 'n8n', 'Node-RED', 'Webhooks', { name: 'Go', tier: 'daily' }, { name: 'Bash', tier: 'daily' }, { name: 'Python', tier: 'daily' }, 'PowerShell', 'Postman', 'Bruno', 'jq', 'Codex', 'Claude'] },
];
export const recentWork: { role: ContentId; org: string; period: string; detail: ContentId }[] = [
  { role: 'work.epam.role', org: 'EPAM Systems', period: '2025–present', detail: 'work.epam.description' },
  { role: 'work.liberty.role', org: 'JSC Liberty Bank', period: '2022–2025', detail: 'work.liberty.description' },
  { role: 'work.justice.role', org: 'High Council of Justice of Georgia', period: '2021–2022', detail: 'work.justice.description' },
];
