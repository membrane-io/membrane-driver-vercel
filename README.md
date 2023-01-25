# Vercel Driver

This [driver](https://membrane.io) lets you interact with the [vercel](https://vercel.com) API.

## Setup

$~~~~$ `mctl action 'vercel:configure(token:"<AccessToken>"'`

## Example Query

Get projects

`mctl query 'vercel:projects.page.items' '{ id name framework }'`

```
[
  {
    "id": "prj_5UwGzhAqU4W0aIE2eO35XB1lcQtO",
    "name": "site-prod",
    "framework": "nextjs"
  },
  {
    "id": "prj_YdrxTD8laMQaT2vwIyGraEqlIAMz",
    "name": "slack-bot",
    "framework": vue
  },
  {
    "id": "prj_8KpB2fsI1hua79xGhB2oqMp70ptY",
    "name": "personal-site",
    "framework": "nextjs"
  },
  ...
]
```

## Example Action

Promote deployment to Production

`mctl action 'vercel:deployments.one(idOrUrl:"dpl_G2hcxx3mppABtomgwTB9ornkCUDs").promoteToProduction'`

# Schema

### Types

```javascript
<Root>
    - fields:
        artifacts: Ref -> <ArtifactCollection>
        deployments: Ref -> <DeploymentCollection>
        certs: Ref -> <CertCollection>
        events: Ref -> <EventCollection>
        aliases: Ref -> <AliasCollection>
        files: Ref -> <FileCollection>
        users: Ref -> <UserCollection>
        domains: Ref -> <DomainCollection>
        secrets: Ref -> <SecretCollection>
        projects: Ref -> <ProjectCollection>
        verifies: Ref -> <VerifyCollection>
        integrations: -> <IntegrationCollection>
        teams: Ref -> <TeamCollection>
    - actions:
        configure(token): Ref -> Void
<ArtifactCollection>
	- fields:
    	one(hash, teamId, x-artifact-client-interactive, x-artifact-client-ci): Ref -> <Artifact>
<DeploymentCollection>
    - fields:
    	one(idOrUrl, teamId): Ref -> <Deployment>
    	page(app, from, limit, projectId, target, to, users, since, until, state, rollbackCandidate, teamId): Ref -> <DeploymentPage>
<CertCollection>
    - fields:
    	one(id, teamId): Ref -> <Cert>
<EventCollection>
    - fields:
    	page(limit, since, untilm types, userId, teamId): Ref -> <EventPage>
<AliasCollection>
    - fields:
    	one(from, idOrAlias, projectId, since, until, teamId): Ref -> <Alias>
    	page(from, domain, projectId, limit, since, until, teamId, rollbackDeploymentId): Ref -> <AliasPage>
<DomainCollection>
    - fields:
    	one(domain, teamId): Ref -> <Domain>
		page(limit, since, until, teamId): Ref -> <DomainPage>
<SecretCollection>
    - fields:
    	one(idOrName, decrypt, teamId): Ref -> <Secret>
    	page(id, projectId, teamId): Ref -> <SecretPage>
<ProjectCollection>
    - fields:
    	one:(idOrName, teamId) Ref -> <Project>
    	page(from, limit, search, gitForkProtection, repo, repoId, repoUrl. excludeRepos, edgeConfig, teamId ): Ref -> <ProjectPage>
<VerifyCollection>
    - fields:
    	page(email, token, tokenName, ssoUserId): Ref -> <VerifyPage>
<IntegrationCollection>
<TeamCollection>
    - fields:
    	one(slug, teamId): Ref -> <Team>
    	page(llimit, since, until): Ref -> <TeamPage>
<FileCollection>
<UserCollection>
<SecretPage>
    - fields:
    	items: List -> <Secret>
    	next: Ref -> <SecretPage>
<TeamPage>
    - fields:
    	items: List -> <Team>
    	next: Ref -> <TeamPage>
<VerifyPage>
    - fields:
    	items: List -> <Verify>
    	next: Ref -> <VerifyPage>
<ProjectPage>
    - fields:
    	items: List -> <Project>
    	next: Ref -> <ProjectPage>
<DeploymentPage>
    - fields:
    	items: List -> <Deployment>
    	next: Ref -> <DeploymentPage>
<EventPage>
    fields:
      - items: List -> <Event>
      - next: Ref -> <EventPage>
<AliasPage>
    fields:
      - items: List -> <Alias>
        ofType: 
      - next: Ref -> <AliasPage>
<DomainPage>
    - fields:
    	items: List -> <Domain>
    	next: Ref -> <DomainPage>
<Deployment>
    - fields:
        aliasAssignedAt: -> Int
        build: -> String
        builds: -> String
        createdIn: -> String
        env: -> String
        functions: -> String
        inspectorUrl: -> String
        meta: -> String
        monorepoManager: -> String
        name: -> String
        ownerId: -> String
        plan: -> String
        projectId: -> String
        routes: List -> String
        alias: List -> String
        aliasAssigned: -> Boolean
        aliasError: -> String
        aliasFinal: -> String
        aliasWarning: -> String
        automaticAliases: List -> String
        bootedAt: -> Int
        buildErrorAt: -> Int
        buildingAt: -> Int
        canceledAt: -> Int
        checksState: -> String
        checksConclusion: -> String
        createdAt: -> Int
        creator: -> String
        errorCode: -> String
        errorLink: -> String
        errorMessage: -> String
        errorStep: -> String
        gitSource: -> String
        id: -> String
        lambdas: List -> String
        public: -> Boolean
        readyState: -> String
        regions: List -> String
        source: -> String
        target: -> String
        team: -> String
        type: -> String
        url: -> String
        userAliases: List -> String
        version: -> Int
    actions:
    	promoteToProduction: -> Void
<Cert>
    fields:
    	id: -> String
    	createdAt: -> Int
    	expiresAt: -> Int
    	autoRenew: -> Boolean
    	cns: List -> String
<Alias>
    fields:
    	alias: -> String
    	created: -> String
    	createdAt: -> Int
    	creator: -> String
    	deletedAt: -> Int
    	deployment: -> String
    	deploymentId: -> String
    	projectId: -> String
    	redirect: -> String
    	redirectStatusCode: -> Int
    	uid: -> String
    	updatedAt: -> Int
    	protectionBypass: -> String
<Secret>
    fields:
    	created: -> String
    	name: -> String
    	teamId: -> String
    	uid: -> String
    	userId: -> String
    	value: -> String
    	createdAt: -> Int
    	projectId: -> String
    	decryptable: -> Boolean
<Project>
    fields:
    	accountId: -> String
    	analytics: -> String
    	autoExposeSystemEnvs: Ref -> Boolean
    	buildCommand: -> String
    	commandForIgnoringBuildStep: -> String
    	createdAt: -> Int
    	devCommand: -> String
    	directoryListing: -> Boolean
    	installCommand: -> String
    	env: List -> String
    	framework: -> String
    	gitForkProtection: -> Boolean
    	id: -> String
    	latestDeployments: List -> String
    	link: -> String
    	name: -> String
    	nodeVersion: -> String
    	outputDirectory: -> String
    	passwordProtection: -> String
    	publicSource: -> Boolean
    	rootDirectory: -> String
    	serverlessFunctionRegion: -> String
    	skipGitConnectDuringLink: -> Boolean
    	sourceFilesOutsideRootDirectory: -> Boolean
    	ssoProtection: -> String
    	targets: -> String
    	transferCompletedAt: -> Int
    	transferStartedAt: -> Int
    	transferToAccountId: -> String
    	transferredFromAccountId: -> String
    	updatedAt: -> Int
    	live: -> Boolean
    	enablePreviewFeedback: -> Boolean
    	permissions: -> String
    	lastRollbackTarget: -> String
    	hasFloatingAliases: -> Boolean
    	protectionBypass: -> String
<File>
<User>
<Artifact>
<Domain>
<Event>
<Verify>
<Integration>
<Team>
```
