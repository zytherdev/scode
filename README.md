<div align="center">

# SCode

**Hand-coding tools for classic ciphers — as an app, an API, and a library.**

Encode and decode messages with Enigma, Morse, Polybius, Vigenère, Bacon, and
more. Built for cryptography enthusiasts, learners, and developers who want to
embed ciphers into their own projects.

[![License: MIT](https://img.shields.io/badge/License-MIT-lime.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![npm](https://img.shields.io/npm/v/@zyther/scode-core.svg)](https://www.npmjs.com/package/@zyther/scode-core)

[Web app](https://scode.zyther.dev) · [API](https://api.scode.zyther.dev) · [Docs](https://api.scode.zyther.dev/docs) · [npm](https://www.npmjs.com/package/@zyther/scode-core)

</div>

---

## What is SCode

SCode is a monorepo with **four pieces** that share one core:

| Piece | What it is | Who it's for |
| --- | --- | --- |
| **[`web/`](./web)** | A React app for encoding/decoding in the browser. | Anyone curious about ciphers. |
| **[`npm/`](./npm)** | `@zyther/scode-core` — the cipher engine as a TypeScript library. | Developers embedding ciphers in JS/TS projects. |
| **[`api/`](./api)** | A Next.js HTTP API wrapping the core. | Apps in any language that need ciphers over HTTP. |
| **[`cli/`](./cli)** | `@zyther/scode-cli` — the `scd` command-line tool. | Terminal users, shell scripts, CI pipelines. |

Every cipher runs **entirely client-side** in the web app, and **statelessly** in
the API. No accounts, no tracking, no data stored between requests.

## Try it

- **Web app** → [scode.zyther.dev](https://scode.zyther.dev)
- **API playground** → [api.scode.zyther.dev/docs](https://api.scode.zyther.dev/docs)
- **Install the library** → `npm install @zyther/scode-core`
- **Install the CLI** → `npm install -g @zyther/scode-cli`

### Encode via API

```bash
curl -X POST https://api.scode.zyther.dev/api/encode \
  -H "Content-Type: application/json" \
  -d '{"message": "hello world", "pattern": "¬"}'
```

### Encode via library

```ts
import { encode, decode, format_str } from "@zyther/scode-core"

const { encrypted, config, pattern } = encode({
  message: format_str("hello world"),
  pattern: "¬",       // Morse
})

const { message } = decode({ encrypted, pattern, config })
// → "HELLOWORLD"
```

### Encode via CLI

```bash
scd encode "hello world" --pattern "¬"
# → -.-. .... . .-.. .-.. ---
```

## The pattern system

What makes SCode different from "just another cipher library": ciphers **compose**.

A **pattern** is a string of cipher symbols applied in sequence. Chain them to
layer encryption:

```ts
encode({ message: "meet me at dawn", pattern: "?|" })
//                                             ││
//                              Enigma ────────┘│
//                              Vigenère ───────┘
```

Patterns are applied **right-to-left** (last symbol = innermost encoding), so
decoding reverses the order automatically. The response includes a `config`
string with whatever parameters are needed to decode — pass it back verbatim.

| Symbol | Cipher | | Symbol | Cipher |
| :---: | --- | --- | :---: | --- |
| `$` | SCSimply (key) | | `\|` | Vigenère |
| `¢` | SCSimply (key_m) | | `§` | Frama |
| `@` | SCSimply (a_num) | | `₢` | Bacon |
| `¬` | Morse | | `&` | Mutation — reciprocity |
| `£` | Binary | | `~` | Mutation — decalation |
| `#` | Polybius | | `:` | Order — reverse |
| `*` | Navajo | | `°` | Order — random |
| `?` | Enigma | | | |

Symbols `@`, `*`, `#` are **restricted** — they only work at the end of a pattern.

## Repository structure

```
scode/
├── web/          React app (Vite + Tailwind)
├── npm/          @zyther/scode-core — the cipher engine
├── api/          Next.js HTTP wrapper around the core
├── cli/          @zyther/scode-cli — the `scd` command
└── ...
```

The **core** is the source of truth for every cipher. The web app and the API
both consume it — no duplicated logic.

## Tech stack

| | Web | Core | API | CLI |
| --- | --- | --- | --- | --- |
| **Framework** | React 18 + Vite | TypeScript | Next.js 15 | commander |
| **Styling** | Tailwind | — | Tailwind | picocolors |
| **Validation** | — | — | Zod | — |
| **Build** | Vite | tsup | Next | tsup |
| **Docs** | — | — | Scalar (OpenAPI) | `--help` |


## Contributing

Contributions are welcome — new ciphers, docs, bug reports, anything.

1. Fork the repo
2. Create a branch (`git checkout -b feat/my-cipher`)
3. Commit your changes (`git commit -m 'feat: add X cipher'`)
4. Push (`git push origin feat/my-cipher`)
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/).

## License

MIT © [Zyther Dev](https://zyther.dev)

---

<div align="center">

Built with ♥ for cryptography.

</div>