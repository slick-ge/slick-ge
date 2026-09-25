export const email = 'Aleksandre.Ghvineria@slick.ge';
export const services = [
  { number: '01', icon: 'workflow', title: 'Make the repetitive automatic.', label: 'Workflow automation', description: 'Connect your tools and turn recurring tasks into dependable workflows. Less copying, clicking, and chasing things down.', proof: 'Recent example: built a Go-based Telegram bot for automated search and download workflows, and use n8n / Node-RED for day-to-day integrations.', tags: ['Integrations', 'Custom tooling', 'Automated operations'] },
  { number: '02', icon: 'terminal', title: 'A clearer path to production.', label: 'CI/CD & delivery', description: 'Build pipelines your team can trust, with useful feedback, repeatable releases, and fewer manual steps between commit and deploy.', proof: 'At JSC Liberty Bank, I overhauled build, deploy, and rollback pipelines across every application — frontend and backend — including apps that had no automation at all before.', tags: ['Build pipelines', 'Release automation', 'GitOps'] },
  { number: '03', icon: 'shield', title: 'Bring security into the workflow.', label: 'Code & secrets security', description: 'Catch vulnerable code, exposed secrets, and risky dependencies earlier. Put practical security checks where your developers already work.', proof: 'Currently working hands-on with GitHub Advanced Security, CodeQL, and Mend.io in production at EPAM Systems.', tags: ['GitHub Advanced Security', 'Secret management'] },
  { number: '04', icon: 'layers', title: 'Infrastructure you can reason about.', label: 'Cloud & infrastructure', description: 'Simplify your environments, find wasted resources, and move manual configuration into versioned, repeatable infrastructure as code.', proof: "Managed and supported 170+ Windows and Linux virtual machines at Georgia's High Council of Justice, and run a full Proxmox/Kubernetes/Ansible homelab in my own time.", tags: ['Infrastructure as code', 'Cloud & on-prem', 'Containers'] },
];
export const process = [
  { title: 'Understand', text: 'We start with your team, your setup, and what is getting in the way.' },
  { title: 'Make a plan', text: 'Agree on a practical scope, clear priorities, and what a good result looks like.' },
  { title: 'Build & improve', text: 'Implement in manageable steps, with testing and visibility along the way.' },
  { title: 'Hand it over', text: 'Leave you with documented systems and the knowledge to keep them running.' },
];
export const toolGroups = [
  { title: 'Delivery & containers', tools: ['GitHub', { name: 'GitHub Actions', tier: 'daily' }, 'GitLab', 'GitLab CI/CD', 'Jenkins', 'Azure DevOps', { name: 'Docker', tier: 'daily' }, 'Docker Compose', 'BuildKit', 'Artifactory', 'GHCR', { name: 'Kubernetes', tier: 'daily' }, 'Helm', 'Kustomize', 'Argo CD', 'k9s', 'K3s', 'kubectl'] },
  { title: 'Infrastructure & systems', tools: ['AWS', 'Azure', 'GCP', { name: 'Terraform', tier: 'daily' }, { name: 'Ansible', tier: 'daily' }, { name: 'Proxmox', tier: 'daily' }, 'VMware ESXi / vSphere', 'Hyper-V', 'KVM', 'LXC', 'ZFS', 'TrueNAS', 'Proxmox Backup Server', 'CentOS', 'Debian', 'Ubuntu Server', 'Raspberry Pi', 'systemd', 'cloud-init', 'cron', 'SSH', 'rsync'] },
  { title: 'Security & secrets', tools: [{ name: 'GitHub Advanced Security', tier: 'daily' }, { name: 'CodeQL', tier: 'daily' }, 'Dependabot', 'SonarQube', 'Bitwarden Secrets Manager', 'Infisical', 'HashiCorp Vault', 'Ansible Vault', 'External Secrets Operator'] },
  { title: 'Observability & networking', tools: [{ name: 'Grafana', tier: 'daily' }, { name: 'Prometheus', tier: 'daily' }, 'Alertmanager', 'ELK Stack', 'OpenTelemetry', 'Zabbix', 'Nagios', 'Loki', 'NGINX', 'Traefik', 'HAProxy', 'Cloudflare', 'WireGuard', 'Tailscale', 'OpenVPN', 'OPNsense', 'OpenWrt'] },
  { title: 'Data & automation', tools: ['PostgreSQL', 'MySQL', 'Redis', 'RabbitMQ', 'MongoDB', 'Apache Kafka', 'Apache ZooKeeper', 'n8n', 'Node-RED', 'Webhooks', { name: 'Go', tier: 'daily' }, { name: 'Bash', tier: 'daily' }, { name: 'Python', tier: 'daily' }, 'PowerShell', 'Postman', 'Bruno', 'jq', 'Codex', 'Claude'] },
];
export const recentWork = [
  { role: 'System Engineer', org: 'EPAM Systems', period: '2025–present', detail: 'GHAS/CodeQL/Mend.io security scanning, GCP-focused.' },
  { role: 'Application Server Administration', org: 'JSC Liberty Bank', period: '2022–2025', detail: 'rebuilt CI/CD and rollback pipelines for every application, frontend and backend.' },
  { role: 'Systems Administration', org: 'High Council of Justice of Georgia', period: '2021–2022', detail: 'provisioned and maintained 170+ virtual machines across Windows and Linux.' },
];
