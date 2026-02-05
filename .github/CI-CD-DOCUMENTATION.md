# CI/CD Pipeline Documentation

## Overview

This project uses a comprehensive, security-first CI/CD pipeline built on GitHub Actions.

## Pipeline Architecture

```
┌─────────────┐
│   PR/Push   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│     CI Pipeline (Parallel)      │
├─────────────┬───────────────────┤
│    Lint     │    Security       │
│  Type Check │   Trivy Scan      │
│             │   npm audit       │
├─────────────┼───────────────────┤
│   Test      │    Build          │
│  Node 18    │   SBOM Gen        │
│  Node 20    │   Attestation     │
├─────────────┴───────────────────┤
│      Performance Budget         │
│      Bundle Size Check          │
└────────────┬────────────────────┘
             │
             ▼
      ┌─────────────┐
      │   CD Flow   │
      │  (on main)  │
      └──────┬──────┘
             │
             ▼
      ┌──────────────┐
      │   Staging    │
      │  Environment │
      └──────┬───────┘
             │
             ▼
      ┌──────────────┐
      │  Production  │
      │ (Manual Gate)│
      └──────────────┘
```

## Workflows

### 1. CI Workflow (`ci.yml`)

**Triggers**: Push to main/develop, Pull Requests

**Jobs (Parallel)**:

- **Lint & Type Check**
  - ESLint validation
  - TypeScript type checking
  - Fast fail on code quality issues

- **Security Scan**
  - npm audit for dependency vulnerabilities
  - Trivy filesystem scan (CRITICAL/HIGH only)
  - Results uploaded to GitHub Security tab

- **Test** (Matrix: Node 18.x, 20.x)
  - Unit & integration tests
  - Code coverage collection
  - Coverage upload to Codecov (with token)
  - Test results artifacts

- **Build** (After lint, security, test pass)
  - Production build
  - SBOM generation (CycloneDX)
  - Build artifact upload
  - Provenance attestation

- **Performance Budget**
  - Bundle size analysis
  - Automatic PR comments if size exceeds limits
  - Current limits:
    - Main bundle: 150 KB (gzipped)
    - CSS bundle: 50 KB (gzipped)
    - Total: 200 KB (gzipped)

### 2. CodeQL Security Analysis (`codeql.yml`)

**Triggers**:

- Push to main/develop
- Pull Requests
- Daily at 2 AM UTC

**Features**:

- Static Application Security Testing (SAST)
- JavaScript & TypeScript analysis
- Security-extended + quality queries
- Results in GitHub Security tab

### 3. Dependency Review (`dependency-review.yml`)

**Triggers**: Pull Requests

**Features**:

- Reviews new/updated dependencies
- Blocks HIGH severity vulnerabilities
- Denies GPL-3.0, AGPL-3.0 licenses
- Posts summary in PR comments

### 4. CD Workflow (`cd.yml`)

**Triggers**:

- Successful CI completion (staging)
- Manual workflow dispatch (production)

**Staging Deployment**:

- Automatic on main branch CI success
- Smoke tests
- Health checks
- No approval required

**Production Deployment**:

- Manual trigger only
- Requires staging success
- Environment protection rules
- Artifact signing
- Production SBOM
- Deployment tagging
- Health checks
- Rollback on failure

### 5. Dependabot (`dependabot.yml`)

**Schedule**: Weekly (Mondays, 9 AM)

**Features**:

- npm dependency updates
- GitHub Actions version updates
- Grouped PRs (prod vs dev dependencies)
- Auto-labels and assignees
- Max 10 npm PRs, 5 Actions PRs

## Security Features

### ✅ Implemented

1. **Least Privilege Permissions**
   - Each job declares minimal required permissions
   - No workflows run with default (write-all) access

2. **Dependency Security**
   - Daily vulnerability scanning
   - Automated security patches via Dependabot
   - Supply chain attack prevention via dependency review
   - License compliance enforcement

3. **Code Security**
   - CodeQL SAST scanning
   - Trivy vulnerability scanning
   - npm audit on every build

4. **Build Security**
   - SBOM generation (transparency)
   - Build provenance attestation
   - Artifact signing capability
   - Immutable build artifacts

5. **Secrets Management**
   - No hardcoded secrets
   - GitHub Secrets for sensitive data
   - OIDC token support for cloud deployments

## Required Secrets

Configure these in GitHub Settings → Secrets:

```bash
# Required
CODECOV_TOKEN              # Codecov upload token

# Optional (for deployments)
STAGING_API_URL           # Staging environment API URL
PRODUCTION_API_URL        # Production environment API URL
AZURE_STATIC_WEB_APP_NAME # If deploying to Azure
```

## Branch Protection Rules

Recommended settings for `main` branch:

```yaml
Required status checks (strict):
  - Lint & Type Check
  - Security Scan
  - Test (Node 20.x)
  - Build & Bundle Analysis
  - CodeQL

Required reviews: 1
Dismiss stale reviews: Yes
Require review from Code Owners: Yes
Restrict pushes: Yes
Require signed commits: Yes
Require linear history: Yes
```

## Performance Budgets

Bundle size limits enforced on every PR:

| Asset   | Limit  | Current |
| ------- | ------ | ------- |
| Main JS | 150 KB | ~TBD    |
| CSS     | 50 KB  | ~TBD    |
| Total   | 200 KB | ~TBD    |

## Local Development

### Run security checks locally:

```bash
# Dependency audit
npm audit

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Tests with coverage
npm run test:coverage

# Bundle size check
npm run size

# See what's in the bundle
npm run size:why
```

## Monitoring & Alerts

- **GitHub Security Tab**: CVE alerts, CodeQL findings, Dependabot alerts
- **Codecov Dashboard**: Test coverage trends
- **Actions Tab**: CI/CD run history
- **Deployments**: Environment deployment history

## Troubleshooting

### CI failing on security scan?

- Check GitHub Security tab for details
- Run `npm audit` locally
- Review Trivy scan results in Actions logs

### Tests failing only in CI?

- Check Node version matrix
- Verify environment variables
- Review test artifacts in Actions

### Build size over budget?

- Run `npm run size:why` to analyze
- Consider code splitting
- Review dependency sizes

### Deployment failed?

- Check health check logs
- Review deployment logs in CD workflow
- Use rollback workflow if needed

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Support

For pipeline issues, open an issue with:

- Workflow run URL
- Error messages
- Steps to reproduce
