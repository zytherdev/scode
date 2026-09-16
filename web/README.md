<div align="center">

# SCode

**Hand-coding tools for classic ciphers.**

Encode and decode messages using manual methods — built for cryptography
enthusiasts, learners, and anyone curious about how secrets were kept before
computers.

[![License: MIT](https://img.shields.io/badge/License-MIT-lime.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

[Live](https://scode.zyther.dev) · [Documentation](https://scode.zyther.dev/documentation) · [Report a bug](https://github.com/zytherdev/scode/issues)

</div>

---

## About

SCode is a web platform for encoding and decoding messages with **classic
ciphers** — Enigma, Morse, Polybius, Vigenère, Bacon, Binary, Navajo, and more.
Every cipher runs **entirely in your browser**: no accounts, no tracking, no
data leaving your machine.

Beyond individual ciphers, SCode introduces a **pattern system** that lets you
compose multiple ciphers into a single chain — apply Enigma, then Morse, then
reverse the result, all from one expression.

## Features

- **13+ ciphers** — from the WWII Enigma machine to the ancient Polybius square
- **Pattern composition** — chain ciphers with symbols like `&§`, `°|#`, `?`
- **Decode documents** — export the configuration needed to decrypt any message
  as PDF, Word, or TXT
- **Dark mode** — full support, system-aware
- **100% client-side** — no backend, no telemetry

## Tech stack

- **React 18** + **TypeScript**
- **Vite** for bundling
- **Tailwind CSS** for styling
- **React Router** for navigation

## Getting started

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

### Install

```bash
git clone https://github.com/zytherdev/scode.git
cd scode
npm install
```

### Run

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build

```bash
npm run build
npm run preview
```

## Roadmap

- [x] Web app with 13+ ciphers
- [x] Pattern composition system
- [x] Decode document export (PDF / Word / TXT)
- [x] **Public API** — programmatic access to all ciphers
- [x] **npm package** — `@scode/core` for use in any JS/TS project
- [ ] **CLI** — `scode encode --pattern "?" --message "hello"`
- [ ] Plugin system for custom ciphers

## Contributing

Contributions are welcome — bug reports, new ciphers, docs, anything.

1. Fork the repo
2. Create a branch (`git checkout -b feat/my-cipher`)
3. Commit your changes (`git commit -m 'feat: add X cipher'`)
4. Push (`git push origin feat/my-cipher`)
5. Open a Pull Request

Please follow the [Conventional Commits](https://www.conventionalcommits.org/) spec.

## License

MIT © [Zyther Dev](https://zyther.dev)

---

<div align="center">

Built with ♥ for cryptography.

</div>
