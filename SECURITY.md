# Security Policy

## Supported Versions

We release security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| main    | :white_check_mark: |
| develop | :white_check_mark: |
| < 1.0   | :x:                |

## Security Features

### 🛡️ Automated Security Scanning

- **Daily CodeQL scans** - Advanced semantic code analysis for vulnerabilities
- **Dependency vulnerability scanning** - npm audit + Trivy for known CVEs
- **Supply chain security** - Dependency review on every PR
- **SBOM generation** - Software Bill of Materials for transparency
- **Artifact attestation** - Cryptographic build provenance

### 🔒 CI/CD Security

- **Least privilege permissions** - Each job has minimal required permissions
- **Artifact signing** - Build artifacts are cryptographically signed
- **Automated dependency updates** - Dependabot for security patches
- **License compliance** - Blocks GPL-3.0 and AGPL-3.0 licenses

## Reporting a Vulnerability

**Please DO NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via:

1. **Email**: security@dailyharvest.example.com
2. **GitHub Security Advisories**: [Create a private security advisory](../../security/advisories/new)

### What to include:

- Type of vulnerability
- Full paths of source file(s) affected
- Location of the affected code (tag/branch/commit)
- Step-by-step instructions to reproduce
- Proof-of-concept or exploit code (if possible)
- Impact of the vulnerability

### Response Timeline

- **Initial response**: Within 48 hours
- **Status update**: Within 7 days
- **Fix timeline**: Depends on severity
  - Critical: 1-7 days
  - High: 7-30 days
  - Medium: 30-90 days
  - Low: Best effort

## Security Best Practices

### For Contributors

1. **Never commit secrets** - Use environment variables
2. **Run security checks locally** - `npm audit` before pushing
3. **Keep dependencies updated** - Review Dependabot PRs
4. **Use strong types** - TypeScript helps prevent injection attacks
5. **Validate all inputs** - Sanitize user data

### For Maintainers

1. **Enable branch protection** - Require status checks
2. **Review security alerts** - Check GitHub Security tab daily
3. **Sign commits** - Use GPG signing for verified commits
4. **Rotate secrets** - Change tokens/keys quarterly
5. **Monitor logs** - Watch for suspicious activity

## Security Contacts

- Security Team: security@dailyharvest.example.com
- Emergency: emergency@dailyharvest.example.com
- PGP Key: [Link to public key]

## Acknowledgments

We appreciate responsible disclosure and will acknowledge security researchers who help us keep our project secure.
