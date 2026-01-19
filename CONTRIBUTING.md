# Contributing to ProArch

First off, thank you for considering contributing to ProArch! 🎉

This document provides guidelines and steps for contributing. Following these guidelines helps communicate that you respect the time of the developers managing and developing this open source project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)

---

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

---

## Getting Started

### Issues

- **Bug Reports**: Use the bug report template to describe the issue
- **Feature Requests**: Use the feature request template to propose new ideas
- **Questions**: Open a discussion in the Discussions tab

### Good First Issues

Look for issues labeled `good first issue` - these are great for newcomers!

---

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

When creating a bug report, include:
- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Screenshots if applicable
- Your environment (OS, browser, Node version)

### 💡 Suggesting Features

Feature requests are welcome! Please provide:
- A clear and descriptive title
- Detailed description of the proposed feature
- Use case / why this would be useful
- Mockups or examples if possible

### 🔧 Code Contributions

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests if applicable
5. Submit a Pull Request

---

## Development Setup

### Prerequisites

- Node.js 18+
- npm 9+
- Git

### Setup Steps

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/proarch.git
cd proarch

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open http://localhost:3000
```

### Project Structure

```
src/
├── app/           # Next.js pages and layouts
├── components/    # React components
│   ├── canvas/    # React Flow canvas
│   ├── editor/    # Monaco editor
│   ├── nodes/     # Custom node types
│   └── ui/        # Shared UI components
├── lib/           # Core utilities
│   ├── parser/    # Mermaid parser
│   ├── layout/    # Dagre layout
│   ├── icons/     # Icon mappings
│   ├── templates/ # Sample diagrams
│   └── export/    # PNG/SVG export
├── stores/        # Zustand state management
└── types/         # TypeScript types
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Pull Request Process

### Before Submitting

1. **Update documentation** if you're changing functionality
2. **Run linting**: `npm run lint`
3. **Test your changes** in the browser
4. **Write clear commit messages**

### PR Guidelines

- Use a clear, descriptive title
- Reference any related issues (e.g., "Fixes #123")
- Describe what changes you made and why
- Include screenshots for UI changes
- Keep PRs focused - one feature/fix per PR

### Review Process

1. A maintainer will review your PR
2. They may request changes or ask questions
3. Once approved, your PR will be merged
4. Your contribution will be credited! 🎉

---

## Style Guidelines

### Code Style

- **TypeScript**: Use strict types, avoid `any`
- **React**: Functional components with hooks
- **Naming**: camelCase for variables, PascalCase for components
- **Files**: kebab-case for file names

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new icon for MongoDB
fix: resolve edge rendering issue
docs: update README with new examples
style: format code with prettier
refactor: simplify parser logic
```

### Component Guidelines

```tsx
// ✅ Good: Clear props interface, descriptive name
interface ServiceNodeProps {
  label: string;
  icon?: string;
  theme: 'classic' | 'modern';
}

export function ServiceNode({ label, icon, theme }: ServiceNodeProps) {
  // Component logic
}
```

---

## Adding New Icons

To add a new technology icon:

1. Edit `src/lib/icons/iconMapper.ts`
2. Import the icon from `react-icons`
3. Add a mapping with keyword and color:

```typescript
// Example: Adding Rust icon
import { SiRust } from 'react-icons/si';

const iconMappings = {
  // ... existing icons
  'rust': { icon: SiRust, color: '#000000' },
};
```

---

## Adding New Templates

To add a new sample template:

1. Edit `src/lib/templates/sampleTemplates.ts`
2. Add your template:

```typescript
{
  name: 'My Template',
  description: 'Description of the template',
  code: `graph LR
    A[Node A] --> B[Node B]
  `,
}
```

---

## Questions?

Feel free to:
- Open a GitHub Discussion
- Create an issue with the `question` label
- Reach out to maintainers

Thank you for contributing! 🙏
