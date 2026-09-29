export interface ServiceSection {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: { title: string; text: string }[];
  bullets?: string[];
}

export interface ServicePage {
  id: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  fit: string;
  sections: ServiceSection[];
  experience: string;
  experienceContext: string;
  questions: string[];
  related: string[];
}

export const servicePages: ServicePage[] = [
  {
    id: 'delivery',
    slug: 'ci-cd',
    name: 'CI/CD and delivery',
    title: 'CI/CD Consulting & Pipeline Automation | Slick',
    description: 'Improve builds, releases, and rollback with hands-on CI/CD consulting for small software teams. Work directly with Aleksandre Ghvineria.',
    heading: 'CI/CD pipelines your team can operate confidently',
    intro: 'Manual releases and fragile pipelines take time away from product work. I help small software teams build a clearer path from commit to deployment, with repeatable releases and a handover the team can use.',
    fit: 'For teams with manual deployment steps, unreliable builds, inconsistent environments, or a release process that depends on one person remembering what to do.',
    sections: [
      {
        id: 'pipeline', title: 'Start with the path from commit to production',
        paragraphs: ['A pipeline should make the release process understandable. Before changing tools, the useful questions are where feedback arrives too late, which steps still happen by hand, and how the team recovers when a deployment fails. A working build is only part of that picture.'],
        items: [
          { title: 'Build and test', text: 'Review how dependencies, checks and build outputs move through the pipeline. Make failures easier to investigate and identify repeated steps that belong in shared configuration.' },
          { title: 'Release and rollback', text: 'Connect the build to a repeatable deployment process. Make the relationship between a release, its artifact and its target environment clear, including the steps needed to return to a working version.' },
          { title: 'Credentials and approvals', text: 'Look at how the pipeline accesses repositories and environments, where secrets are stored, and which changes need a human decision before they reach production.' },
        ],
      },
      {
        id: 'existing-stack', title: 'Work with the tools you already use',
        paragraphs: ['My toolkit includes GitHub Actions, GitLab CI/CD, Jenkins, Docker and Kubernetes. The starting point is your repository and deployment setup, rather than a requirement to migrate to a different platform.', 'Sometimes the useful change is a small repair to an existing workflow. In other cases, a team needs to replace manual deployment steps or make several pipelines follow a consistent pattern. We can discuss the approach in the context of your applications and the people who maintain them.'],
      },
      {
        id: 'handover', title: 'Keep the release process understandable after handover',
        paragraphs: ['Implementation and documentation belong together. The team taking over needs to know how to run a release, find its logs, understand its permissions and respond when something fails. Agreeing those acceptance checks early makes the handover concrete.'],
        bullets: ['Where the pipeline configuration and build artifacts live.', 'How releases reach each environment and who can approve them.', 'How deployment failures are investigated and rollback is handled.', 'Which parts of the process remain manual and who owns them.'],
      },
    ],
    experience: 'At JSC Liberty Bank, I overhauled build, deploy and rollback pipelines across frontend and backend applications, including applications that previously had no automation.',
    experienceContext: 'Application Server Administration · JSC Liberty Bank · 2022–2025',
    questions: ['Where does the code live, and what runs the pipeline today?', 'What is deployed, and to which environments?', 'Which build or release steps are causing problems?', 'Are you looking for a defined implementation project or ongoing support?'],
    related: ['code-secrets-security', 'cloud-infrastructure'],
  },
  {
    id: 'security',
    slug: 'code-secrets-security',
    name: 'Code and secrets security',
    title: 'Code & Secrets Security Consulting | Slick',
    description: 'Integrate code scanning, dependency checks, and secrets management into development workflows with independent, hands-on DevOps support.',
    heading: 'Bring code and secrets security into your workflow',
    intro: 'Security checks are most useful when developers can understand and act on their results. I help teams bring code scanning, dependency checks and secrets management into the tools and delivery workflows they already use.',
    fit: 'For software teams introducing repository security checks, untangling an existing scanning setup, or moving secrets out of manual configuration and into a more manageable workflow.',
    sections: [
      {
        id: 'checks', title: 'Put the right checks in the development workflow',
        paragraphs: ['Adding a scanner is a starting point. The useful work includes deciding where it runs, making its findings visible, and understanding who responds. A check that nobody can interpret or maintain adds friction without a clear benefit.'],
        items: [
          { title: 'Code scanning', text: 'Bring static analysis into the repository workflow so findings can be reviewed alongside development. My production work includes GitHub Advanced Security and CodeQL.' },
          { title: 'Dependency checks', text: 'Make dependency findings visible to the team responsible for the application. Consider where checks run, how updates enter the workflow, and which results need attention before a release.' },
          { title: 'Secrets management', text: 'Review where application and pipeline credentials are stored and how they reach the systems that need them. Secret scanning and secret management address different parts of that process.' },
        ],
      },
      {
        id: 'rollout', title: 'Plan the rollout around the repositories and people',
        paragraphs: ['An existing repository has its own languages, build requirements, permissions and release constraints. Those details determine how a check fits into development and what the team will need to operate it.', 'We can start by discussing the current setup and the problems you want to address. The relevant implementation work might involve an existing scanning pipeline, a new check, or the way credentials are passed between systems. The scope follows that discussion.'],
      },
      {
        id: 'ownership', title: 'Make findings and ownership clear',
        paragraphs: ['A useful handover explains both the configuration and the workflow around it. The team needs to understand where findings appear, how to investigate failures and who owns the next action.'],
        bullets: ['Which repositories and workflows are covered by each check.', 'How the checks authenticate and what access they require.', 'Where developers review findings and pipeline failures.', 'Who maintains the configuration and handles follow-up work.'],
      },
    ],
    experience: 'My work at EPAM Systems includes hands-on security scanning with GitHub Advanced Security, CodeQL and Mend.io, with a GCP focus.',
    experienceContext: 'System Engineer · EPAM Systems · 2025–present',
    questions: ['Which repositories, languages and CI/CD tools are involved?', 'Which scanning or secrets-management tools do you use now?', 'What is difficult about the current setup or the findings it produces?', 'Do you need an implementation project or ongoing engineering support?'],
    related: ['ci-cd', 'cloud-infrastructure'],
  },
  {
    id: 'automation',
    slug: 'workflow-automation',
    name: 'Workflow automation',
    title: 'Workflow Automation for Software Teams | Slick',
    description: 'Connect tools and automate recurring reporting and operational tasks. Practical workflow automation for software teams, with clear handover.',
    heading: 'Automate recurring work across your tools',
    intro: 'Copying data, downloading reports and repeating the same operational steps can get in the way of engineering work. I help software teams connect their tools and turn recurring tasks into dependable workflows.',
    fit: 'For teams with a repeatable task spread across several tools, manual reporting steps, or small operational jobs that are easy to forget and difficult to hand over.',
    sections: [
      {
        id: 'task', title: 'Choose a recurring task with a clear outcome',
        paragraphs: ['A useful automation starts with a task that can be described. What starts the work? Which data or systems does it need? What should happen when it finishes? Which exceptions still need a person?', 'Writing down the current process exposes the steps that are stable enough to automate and the decisions that should stay with the team. It also provides a way to check whether the resulting workflow does what is needed.'],
      },
      {
        id: 'workflow', title: 'Connect the steps and account for failure',
        items: [
          { title: 'Inputs and integrations', text: 'Identify how the workflow reads and writes data: an API, a webhook, an export or an existing command. Keep the data format and the source of each input understandable.' },
          { title: 'Errors and retries', text: 'Consider missing inputs, unavailable systems and partial completion. Repeating a job should not accidentally duplicate an operation that already succeeded.' },
          { title: 'Visibility and ownership', text: 'Make it possible to tell whether a job ran and what it produced. The person maintaining it needs a place to start when a system or data format changes.' },
        ],
      },
      {
        id: 'tools', title: 'Use tooling the team can maintain',
        paragraphs: ['My toolkit includes Go, Bash, Python, webhooks, n8n and Node-RED. A small script may be enough for one task; an integration spanning several systems may benefit from a workflow tool. The choice depends on the task and who will maintain it.', 'A handover should cover the trigger, inputs, configuration, expected output and recovery steps. Useful acceptance checks include a normal run, a missing input and a repeat run, rather than only demonstrating that the happy path works once.'],
      },
    ],
    experience: 'A recent automation example involved generating and downloading reports, parsing the data and visualizing the results to make recurring reporting easier.',
    experienceContext: 'Reporting automation example',
    questions: ['What steps do you repeat, and how often?', 'Which tools and data sources are involved?', 'What should a successful run produce?', 'Who will use and maintain the workflow?'],
    related: ['ci-cd', 'cloud-infrastructure'],
  },
  {
    id: 'infrastructure',
    slug: 'cloud-infrastructure',
    name: 'Cloud and infrastructure',
    title: 'Cloud & Infrastructure as Code Consulting | Slick',
    description: 'Simplify cloud and on-prem environments with infrastructure as code, practical automation, and documentation your software team can use.',
    heading: 'Make infrastructure repeatable and easier to maintain',
    intro: 'Infrastructure is easier to work with when the configuration is understandable and changes can be reviewed. I help software teams simplify environments and move manual setup into versioned, repeatable infrastructure as code.',
    fit: 'For teams managing configuration by hand, dealing with environments that have drifted apart, or trying to understand a setup that has grown difficult to maintain.',
    sections: [
      {
        id: 'review', title: 'Understand the environment before changing it',
        paragraphs: ['Start with what is running, what depends on it and who owns it. An environment may include cloud resources, virtual machines, containers and configuration that only exists in someone’s notes.', 'That picture helps identify the manual steps worth automating and the parts that need particular care. It also makes the boundary between infrastructure work and application changes explicit.'],
      },
      {
        id: 'configuration', title: 'Move repeatable configuration into code',
        items: [
          { title: 'Provisioning with Terraform', text: 'Use versioned configuration to describe infrastructure changes. Review the environment boundaries, state ownership and how changes are proposed before deciding what to bring under management.' },
          { title: 'Configuration with Ansible', text: 'Turn repeated setup and configuration tasks into a process the team can read and run again. Account for differences between environments and how credentials are supplied.' },
          { title: 'Containers where they help', text: 'Consider how Docker or Kubernetes fits the application and the team operating it. Container tooling should solve an identifiable deployment or operational problem.' },
        ],
      },
      {
        id: 'operations', title: 'Plan for day-to-day operation',
        paragraphs: ['The configuration is only part of the result. Someone still needs to review changes, investigate failures and keep documentation current. Agreeing who owns those tasks is part of making the setup maintainable.', 'My background includes production systems administration as well as a personal Proxmox, Kubernetes and Ansible homelab. Cloud and on-prem work have different constraints; we can discuss the existing environment before choosing an approach.'],
        bullets: ['Record environment ownership and the location of configuration.', 'Make the change and review process clear.', 'Document validation and recovery steps appropriate to the environment.', 'Identify remaining manual tasks and follow-up work.'],
      },
    ],
    experience: 'At Georgia’s High Council of Justice, I managed and supported more than 170 Windows and Linux virtual machines. My personal homelab work includes Proxmox, Kubernetes and Ansible.',
    experienceContext: 'Systems Administration · High Council of Justice of Georgia · 2021–2022; personal homelab',
    questions: ['Is the environment cloud, on-prem, or a combination?', 'Which resources and configuration are already managed as code?', 'Which manual changes or recurring problems take the most time?', 'Are you planning an implementation project or looking for ongoing help?'],
    related: ['ci-cd', 'code-secrets-security'],
  },
];
