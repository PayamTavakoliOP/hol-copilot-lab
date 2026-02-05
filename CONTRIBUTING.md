# Contributing to The Daily Harvest

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Install dependencies: `cd eCommApp && npm install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`

## Development Setup

### Prerequisites

- Node.js 18.x or higher (see `.nvmrc`)
- npm 9.x or higher

### Environment Setup

1. Copy `.env.example` to `.env`
2. Update environment variables as needed

### Running the Project

```bash
npm run dev      # Start development server
npm test         # Run tests
npm run build    # Build for production
npm run lint     # Run ESLint
```

## Code Standards

### TypeScript

- Use strict TypeScript typing (no `any`)
- Define interfaces in `src/types/`
- Follow existing naming conventions

### React

- Use functional components with hooks
- Keep components small and focused
- Co-locate tests with components

### Styling

- Use CSS custom properties for theming
- Follow BEM-like naming conventions
- Ensure responsive design (mobile-first)

### Testing

- Write tests for all new components
- Maintain >80% code coverage
- Use React Testing Library best practices

### Accessibility

- Follow WCAG 2.1 Level AA guidelines
- Test with keyboard navigation
- Include ARIA labels where appropriate

## Commit Messages

Follow conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:

- `feat(products): add product filtering`
- `fix(cart): resolve quantity update bug`
- `docs(readme): update installation steps`

## Pull Request Process

1. Update tests for your changes
2. Ensure all tests pass: `npm test`
3. Run linter: `npm run lint`
4. Update documentation if needed
5. Create a pull request with a clear description
6. Link any related issues

## Code Review

- All PRs require at least one approval
- Address review feedback promptly
- Keep PRs focused and reasonably sized

## Questions?

Open an issue for questions or discussions about contributing.
