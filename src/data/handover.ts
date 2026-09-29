export const handoverSections = [
  {
    id: 'ownership', title: 'Repository and access ownership',
    description: 'Start with the people who will operate the pipeline. Having a copy of the configuration is different from having access to run, change and recover it.',
    checks: ['Identify the repository, pipeline configuration and people responsible for maintaining them.', 'Confirm that the receiving team has the appropriate access without relying on the departing engineer’s personal account.', 'Record ownership of runners, artifact registries and deployment credentials.', 'Agree who reviews pipeline changes and who handles a failed release.'],
  },
  {
    id: 'build-and-release', title: 'Build and deployment instructions',
    description: 'Follow a change through the actual delivery process. A new maintainer should be able to connect a commit to its build output and the environment running it.',
    checks: ['Document the triggers for build, test and deployment workflows.', 'Record required runtime versions, build inputs and where artifacts are stored.', 'Explain how a release is identified and promoted between environments.', 'List manual steps and approvals, including who performs them.', 'Locate build and deployment logs, and demonstrate how to investigate a failed run.'],
  },
  {
    id: 'configuration', title: 'Environment configuration and secrets',
    description: 'Document how configuration reaches the application without copying secret values into the handover. Environment differences should be understandable and intentional.',
    checks: ['List environment names, their purpose and where non-secret configuration is maintained.', 'Record where secrets are managed and which identities can retrieve them; do not include their values.', 'Review the permissions used by build and deployment workflows.', 'Document who owns credential rotation and the effect of changing or revoking access.'],
  },
  {
    id: 'rollback', title: 'Rollback and recovery',
    description: 'Define recovery for the application being handed over. Restoring an earlier binary does not necessarily undo a database migration or a change to an external system. Agree a safe test environment and recovery approach before rehearsing.',
    checks: ['Identify a known working release and how to locate its artifacts.', 'Document the recovery steps and who is authorized to run them.', 'Record database, data-format and external-system changes that need separate treatment.', 'Rehearse the agreed recovery procedure in an appropriate non-production environment.', 'Record remaining limitations and the situations that need escalation.'],
  },
  {
    id: 'monitoring', title: 'Monitoring and failure response',
    description: 'A completed deployment job is one signal. The receiving team also needs to know how to check that the application is behaving as expected and how to respond when it is not.',
    checks: ['Identify the checks used to validate the application after deployment.', 'Locate relevant application logs, dashboards and alerts.', 'Confirm where failure notifications go and who receives them.', 'Document initial investigation steps and escalation contacts.'],
  },
  {
    id: 'acceptance', title: 'Acceptance walkthrough',
    description: 'Have the receiving team lead the walkthrough with the documentation in front of them. The useful result is a shared understanding of what they can operate and what still needs attention.',
    checks: ['Run a representative build and deployment in an agreed test environment.', 'Investigate a controlled failure and find the information needed to resolve it.', 'Walk through recovery and explain any steps that remain manual.', 'Record open questions, follow-up tasks and owners.', 'Confirm where the documentation lives and who updates it when the pipeline changes.'],
  },
];
