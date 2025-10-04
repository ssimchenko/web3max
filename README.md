# web3max

> An accessible digital safety guide that helps people protect their social media and messenger accounts.

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![CI](https://github.com/ssimchenko/web3max/actions/workflows/ci.yml/badge.svg)](https://github.com/ssimchenko/web3max/actions/workflows/ci.yml)

**University team project · Developer & Team Lead: [Alexander Simchenko](https://github.com/ssimchenko)**

[Design](https://www.figma.com/design/zo1KYvtGjnlnQm4a3cl5n3/Untitled?node-id=0-1&t=PrZQTyByxhpHc3Pp-1) · [Project presentation](https://www.figma.com/deck/Op16ZojQaDi72jxcwDBk67/web3max-presentation?node-id=1-660&t=X6x91tMtZRPUx62s-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1)

## About

web3max is an interactive educational website for adults who want practical online-safety guidance without complex technical language. The project turns common threats into short lessons, realistic examples, quizzes, and step-by-step instructions.

The MVP was shaped through audience research and usability testing with representatives of the target group. The feedback helped us simplify the wording, make important controls more visible, and improve the instructional screenshots.

## What the product includes

- four learning modules covering account protection, phishing, two-factor authentication, and everyday safety habits;
- realistic scenarios and quizzes with immediate feedback;
- illustrated 2FA guides for Telegram, WhatsApp, and MAX;
- learning progress saved locally without registration;
- search across the educational content;
- FAQ and a printable safety checklist;
- responsive layouts for desktop and mobile;
- an accessibility panel with font, contrast, spacing, and link-visibility settings;
- keyboard navigation, a skip link, visible focus states, and text-to-speech support.

## My contribution

As **Developer & Team Lead**, I was responsible for the technical implementation and delivery of the product:

- planned the application structure and development workflow;
- built the interface with Next.js, React, TypeScript, and Tailwind CSS;
- implemented the learning modules, quizzes, search, local progress, and accessibility features;
- integrated the research content and design into a responsive application;
- prepared the production build and Docker environment;
- coordinated the team and brought the MVP to completion.

## Team

- **Alexander Simchenko** — Developer & Team Lead
- **Timur Pospelov** — Analyst
- **Grigory Gorodilov** — Designer

## Tech stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS, PostCSS
- **State and persistence:** React state, `localStorage`
- **Delivery:** Docker, Docker Compose, GitHub Actions

## Project structure

```text
app/          pages, layouts, and module routes
components/   reusable UI and interactive learning flows
lib/          course content and shared logic
public/       static assets and instructional screenshots
```

## Run locally

Requirements: Node.js 20+ and npm.

```bash
git clone https://github.com/ssimchenko/web3max.git
cd web3max
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For a production build:

```bash
npm run build
npm run start
```

## Run with Docker

```bash
docker compose up --build
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Academic context

This repository contains the completed MVP of a university team project. Product decisions were supported by audience research, a 5W analysis, competitor review, and usability testing. The repository preserves the original development history.
