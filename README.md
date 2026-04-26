# Simple Calculator (Tauri + Vue + TypeScript)

A desktop calculator pet project built to learn the Tauri + Vue + TS stack step by step.

## Features

- Basic operations: `+`, `-`, `*`, `/`, `=`
- Utilities: clear, sign toggle, percent, decimal input
- Keyboard support: digits, operators, `Enter`, `=`, `Backspace`, `Escape`
- Edge-case handling: divide by zero, repeated equals, long output formatting
- Optional Rust bridge mode for `=` to compare TS local logic vs Tauri `invoke`

## Tech Stack

- Tauri 2
- Vue 3 + TypeScript
- Pinia for state management
- Vite for frontend tooling

## Prerequisites

- Node.js 18+ and npm
- Rust toolchain (`rustup`, `cargo`)
- Tauri system dependencies for your OS: [Tauri prerequisites](https://tauri.app/start/prerequisites/)

## Install

```bash
npm install
```

## Development

- Frontend only (Vite):

```bash
npm run dev
```

- Desktop app (Tauri + frontend):

```bash
npm run tauri dev
```

## Build

- Frontend production build:

```bash
npm run build
```

- Desktop bundle (installer/binary via Tauri):

```bash
npm run tauri build
```

Build artifacts are generated under `src-tauri/target/release/` (and bundled outputs under the Tauri bundle directories).

## Learning Milestones

1. Project scaffolding and Pinia wiring
2. Core calculator store actions
3. Reusable UI components and keyboard controls
4. Edge cases and UX polish
5. Optional Rust bridge command integration
6. Docs and packaging workflow
