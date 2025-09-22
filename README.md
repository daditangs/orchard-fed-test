![GitHub Actions Status](https://img.shields.io/github/actions/workflow/status/daditangs/orchard-fed-test/deploy.yml?branch=main)

## Orchard FED Skill Assessment 2025

This project implements the assessment requirements using semantic, CMS-friendly markup, vanilla JavaScript, SCSS utilities, and Vite for the build system. It follows accessibility (WCAG) and responsive best practices.

### Features

- **Gallery Block**: Click images to open an accessible modal with a larger image.
- **Cards Block**: Delegated click handler logs all anchor elements to the console.
- **Dynamic Header**: Injected with vanilla JS (logo/home icon + site title).
- **Accessibility**: Keyboard focus management, Escape to close modal, skip link.
- **Responsive**: Scales cleanly down to 320px.
- **SEO**: Basic meta tags and social Open Graph tags.
- **Tooling**: Vite + Sass build, GitHub Pages auto-deploy.

### Project Structure

```
orchard-fed-test/
├── .github/workflows/deploy.yml
├── src/
│   ├── index.html
│   ├── styles/style.scss
│   ├── js/script.js
│   └── images/
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

### Getting Started

1. Install dependencies:

```bash
npm ci
```

2. Start dev server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview local production build:

```bash
npm run preview
```

### Deployment

- The site is deployed to GitHub Pages via GitHub Actions on every push/PR to `main` using Node 20.
- Live URL format: https://daditangs.github.io/orchard-fed-test/

### Notes

- The texts are injected dynamically to simulate CMS-driven regions.
- SCSS uses variables, mixins, and utility-like class patterns instead of Tailwind.
- No SPA frameworks are used.
