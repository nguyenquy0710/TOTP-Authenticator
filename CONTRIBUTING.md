# Contributing to TOTP Authenticator

Thank you for your interest in contributing to TOTP Authenticator! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Publishing others' private information
- Any unprofessional conduct

## Getting Started

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/TOTP-Authenticator.git
   cd TOTP-Authenticator
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/nguyenquy0710/TOTP-Authenticator.git
   ```

4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

### Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher
- Git

### Installation

```bash
# Install dependencies
npm install

# Run application in development
npm start

# Run tests
npm test
```

### Project Structure

```
TOTP-Authenticator/
├── src/
│   ├── main.js          # Main process
│   ├── preload.js       # Preload script
│   ├── renderer.js      # Renderer process
│   ├── index.html       # UI
│   ├── styles.css       # Styles
│   └── utils/
│       ├── database.js  # Database operations
│       └── crypto.js    # Encryption
├── test.js              # Test suite
└── package.json         # Dependencies
```

## How to Contribute

### Types of Contributions

1. **Bug Fixes**
   - Find a bug
   - Create an issue (if not exists)
   - Fix the bug
   - Submit a pull request

2. **New Features**
   - Discuss in an issue first
   - Get approval from maintainers
   - Implement the feature
   - Add tests
   - Update documentation
   - Submit a pull request

3. **Documentation**
   - Fix typos
   - Improve clarity
   - Add examples
   - Translate to other languages

4. **Tests**
   - Add missing tests
   - Improve test coverage
   - Fix failing tests

## Coding Standards

### JavaScript Style

```javascript
// Use const for constants
const MAX_ATTEMPTS = 3;

// Use let for variables
let counter = 0;

// Use arrow functions
const add = (a, b) => a + b;

// Use template literals
const message = `Hello, ${name}!`;

// Use async/await for promises
async function fetchData() {
  try {
    const data = await getData();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Code Organization

```javascript
// 1. Imports
const { app, BrowserWindow } = require('electron');
const Database = require('./utils/database');

// 2. Constants
const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 800;

// 3. Variables
let mainWindow;
let db;

// 4. Functions
function createWindow() {
  // Implementation
}

// 5. Event handlers
app.on('ready', createWindow);
```

### Naming Conventions

- **Variables and Functions**: camelCase
  ```javascript
  const userName = 'John';
  function getUserData() {}
  ```

- **Classes**: PascalCase
  ```javascript
  class DatabaseManager {}
  ```

- **Constants**: UPPER_SNAKE_CASE
  ```javascript
  const MAX_RETRY_COUNT = 3;
  ```

- **Private variables**: prefix with underscore
  ```javascript
  const _privateVar = 'private';
  ```

### Comments

```javascript
// Single-line comment for brief explanations

/**
 * Multi-line comment for functions
 * @param {string} name - User name
 * @param {number} age - User age
 * @returns {Object} User object
 */
function createUser(name, age) {
  return { name, age };
}

// TODO: Add error handling
// FIXME: Bug in validation logic
// NOTE: This is a temporary solution
```

### HTML/CSS

```html
<!-- Use semantic HTML -->
<header>
  <h1>Title</h1>
</header>

<main>
  <section class="form-section">
    <!-- Content -->
  </section>
</main>

<!-- Use meaningful class names -->
<button class="btn btn-primary">Submit</button>
```

```css
/* Use consistent formatting */
.button {
  padding: 10px 20px;
  border-radius: 4px;
  background: #007bff;
}

/* Use CSS variables */
:root {
  --primary-color: #007bff;
  --text-color: #333333;
}

/* Group related properties */
.card {
  /* Layout */
  display: flex;
  flex-direction: column;
  
  /* Sizing */
  width: 100%;
  padding: 20px;
  
  /* Visual */
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

## Testing Guidelines

### Writing Tests

```javascript
// Test structure
describe('Feature', () => {
  beforeEach(() => {
    // Setup
  });

  it('should do something', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = doSomething(input);
    
    // Assert
    expect(result).toBe('expected');
  });

  afterEach(() => {
    // Cleanup
  });
});
```

### Test Coverage

- Aim for 80%+ code coverage
- Test happy paths
- Test error cases
- Test edge cases

### Running Tests

```bash
# Run all tests
npm test

# Run specific test
node test.js

# Check for errors
npm run lint  # If linter is configured
```

## Commit Message Guidelines

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```bash
# Feature
git commit -m "feat(auth): add TOTP code generation"

# Bug fix
git commit -m "fix(database): prevent SQL injection"

# Documentation
git commit -m "docs(readme): update installation instructions"

# Refactoring
git commit -m "refactor(crypto): simplify encryption logic"
```

### Best Practices

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor" not "moves cursor")
- Keep first line under 72 characters
- Reference issues: "fixes #123" or "closes #456"

## Pull Request Process

### Before Submitting

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests**
   ```bash
   npm test
   ```

3. **Check code style**
   - Follow coding standards
   - Remove console.logs
   - Fix linter errors

4. **Update documentation**
   - Update README if needed
   - Add JSDoc comments
   - Update CHANGELOG.md

### Creating Pull Request

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create PR on GitHub**
   - Click "New Pull Request"
   - Choose your branch
   - Fill in the template

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing
- [ ] Tests pass locally
- [ ] Added new tests
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added where needed
- [ ] Documentation updated
- [ ] No new warnings

## Screenshots (if applicable)
Add screenshots for UI changes
```

### Review Process

1. **Automated checks**
   - Tests must pass
   - No conflicts with main

2. **Code review**
   - At least one approval required
   - Address review comments

3. **Merge**
   - Maintainer will merge
   - Branch will be deleted

## Reporting Bugs

### Before Reporting

1. Check existing issues
2. Update to latest version
3. Reproduce the bug

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., Windows 10]
- App Version: [e.g., 1.0.0]
- Node.js Version: [e.g., 16.0.0]

## Screenshots
Add screenshots if applicable

## Additional Context
Any other relevant information
```

## Suggesting Features

### Feature Request Template

```markdown
## Feature Description
Clear description of the feature

## Problem Statement
What problem does this solve?

## Proposed Solution
How should it work?

## Alternatives Considered
What other solutions did you consider?

## Additional Context
Mockups, examples, etc.
```

## Development Tips

### Debugging

```bash
# Enable DevTools
npm start
# Then: Ctrl+Shift+I (Windows/Linux) or Cmd+Option+I (macOS)

# Debug main process
npm start --inspect

# Debug renderer process
# Open DevTools in app
```

### Performance

- Profile with Chrome DevTools
- Use console.time() for timing
- Minimize database queries
- Optimize re-renders

### Security

- Never commit secrets
- Validate all inputs
- Escape HTML output
- Use prepared statements
- Follow security best practices

## Questions?

- Create a [GitHub Discussion](https://github.com/nguyenquy0710/TOTP-Authenticator/discussions)
- Ask in pull request comments
- Check existing documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Thank You!

Your contributions make this project better. We appreciate your time and effort! 🎉
