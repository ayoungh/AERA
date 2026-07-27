# AERA — Cinematic Next.js Template

A cinematic, scroll-led portfolio template for architecture studios, creative
practices, and design-led brands. Built with Next.js, React, and Tailwind CSS.

Created by Anthony Young.

![AERA template preview](./public/og.png)

## Features

- App Router and TypeScript
- Tailwind CSS 4 with CSS-first theme tokens
- Responsive, image-led landing page
- Scroll-based project transitions and reveal animations
- Accessible navigation with a mobile menu
- Optimized local images with `next/image`
- Open Graph and X/Twitter metadata
- Centralized content in one typed configuration file
- No component framework or animation dependency

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Requires Node.js 24.

## Make it yours

Most template content lives in
[`lib/site-config.ts`](./lib/site-config.ts):

- studio name and contact details
- navigation
- headings and supporting copy
- capabilities and projects
- image paths and accessible alt text
- SEO title, description, and production URL

Replace the images in `public/images` while keeping their paths, or update the
paths in the config. The Tailwind visual theme tokens are in the `@theme` block
at the top of [`app/globals.css`](./app/globals.css).

For correct social links in production, copy `.env.example` to `.env.local` and
set `NEXT_PUBLIC_SITE_URL` to your deployed URL.

## Project structure

```text
app/
  globals.css          Tailwind import, theme tokens, and shared motion
  layout.tsx           Document shell and metadata
  page.tsx             Home route
components/
  aera-experience.tsx  Landing-page sections, Tailwind styles, and interactions
  arrow-icon.tsx       Shared interface icon
lib/
  site-config.ts       Editable site content and SEO
public/
  images/              Portfolio imagery
  og.png               Social sharing image
```

## Commands

```bash
npm run dev        # Start the development server
npm run typecheck  # Check TypeScript
npm run build      # Create a production build
npm run start      # Run the production build
```

## Publish as a GitHub template

1. Create a new GitHub repository and push this project.
2. Open the repository's **Settings** page.
3. Enable **Template repository** under **General**.
4. Add the preview image, `nextjs-template`, and `portfolio` as repository
   metadata so people can find it.

## Contributing

Contributions are welcome. Please read
[`CONTRIBUTING.md`](./CONTRIBUTING.md) before opening a pull request.

## License

MIT licensed. See [`LICENSE`](./LICENSE).
