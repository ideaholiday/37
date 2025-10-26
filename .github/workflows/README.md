# GitHub Actions Workflows

## Lint Workflow

This workflow runs linting checks and notifies Vercel about the status.

### Trigger

The workflow is triggered by `repository_dispatch` events from Vercel deployments:
- `vercel.deployment.created` - When a new deployment is created
- `vercel.deployment.ready` - When a deployment is ready

### Requirements

1. **Node.js Project**: The repository must contain a `package.json` file with a `lint` script defined.

2. **Vercel Integration**: 
   - The repository should be connected to a Vercel project
   - Vercel should be configured to send repository dispatch events
   - The workflow name "Vercel - 37: lint" should be added to Vercel Deployment Checks
     - Note: "37" is the project identifier - update this to match your project name if needed

3. **GitHub Secrets** (if needed):
   - No additional secrets are required for basic usage
   - The workflow uses the default `GITHUB_TOKEN` for authentication

### Workflow Steps

1. **Checkout code**: Checks out the repository code
2. **Setup Node.js**: Sets up Node.js v20 with npm caching
3. **Install dependencies**: Runs `npm ci` to install dependencies
4. **Run linter**: Executes the `npm run lint` command
5. **Notify Vercel**: Reports the lint status back to Vercel using the `vercel/repository-dispatch/actions/status@v1` action

### Configuration in Vercel

To enable this workflow with Vercel Deployment Checks:

1. Go to your Vercel project settings
2. Navigate to "Git" → "Deployment Checks"
3. Add a new check with the name: `Vercel - 37: lint` (or update "37" to your project name)
4. Configure when the check should run (e.g., on all deployments or production only)

### Customization

To modify the workflow:

- Change Node.js version: Update the `node-version` in the "Setup Node.js" step
- Change lint command: Modify the `npm run lint` command in the "Run linter" step
- Change check name: Update the `name` parameter in the "notify vercel" step (must match Vercel configuration)
- Add more event types: Update the `types` list under `repository_dispatch` (e.g., add `vercel.deployment.success`)

For more information, see:
- [Vercel Deployment Checks Documentation](https://vercel.com/docs/deployment-checks)
- [Vercel repository-dispatch GitHub Action](https://github.com/vercel/repository-dispatch)
