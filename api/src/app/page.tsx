import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Home",
  description:
    "Free public API for classic ciphers. Encode and decode with Enigma, Morse, Polybius, Vigenère, and more.",
}

const ENDPOINTS = [
  {
    method: "POST",
    path: "/api/encode",
    description: "Encode a plain message using a cipher pattern.",
  },
  {
    method: "POST",
    path: "/api/decode",
    description: "Decode an encrypted message back to plain text.",
  },
  {
    method: "GET",
    path: "/api/ciphers",
    description: "List every cipher available in the API.",
  },
  {
    method: "GET",
    path: "/api/health",
    description: "Health check — status and server timestamp.",
  },
]

const CODE_EXAMPLE = `curl -X POST https://api.scode.zyther.dev/api/encode \\
  -H "Content-Type: application/json" \\
  -d '{"message": "hello world", "pattern": "¬"}'

# → {
#     "encrypted": "-.-. .... . .-.. .-.. ---",
#     "config": "",
#     "pattern": "¬"
#   }`

const version = '0.1.0'

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* grd fundo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-125 w-200 -translate-x-1/2 rounded-full bg-linear-to-br from-lime-400/12 via-transparent to-transparent blur-3xl"
      />

      <main className="mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-10">
        {/* Hero */}
        <header className="mb-24">
          <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-gray-500">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime-400" />
            <span>Public API · v{version}</span>
          </div>

          <h1 className="text-5xl font-semibold leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl">
            Classic ciphers,
            <br />
            <span className="bg-linear-to-r from-lime-400 via-emerald-400 to-violet-400 bg-clip-text text-transparent">
              one HTTP call away.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-gray-400">
            A free, stateless JSON API for encoding and decoding messages with
            Enigma, Morse, Polybius, Vigenère, and 10+ other ciphers. No
            authentication. No rate limits. No data stored.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="group inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-3 text-sm font-medium text-black transition-all hover:gap-3 hover:bg-lime-300"
            >
              Read the docs
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
            <a
              href="/api/openapi.json"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-gray-300 transition-colors hover:border-lime-400 hover:text-lime-400"
            >
              OpenAPI spec
            </a>
          </div>

          {/* stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            <div>
              <div className="font-mono text-2xl font-medium text-white">10+</div>
              <div className="mt-1 text-xs text-gray-500">Cipher symbols</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-medium text-white">∞</div>
              <div className="mt-1 text-xs text-gray-500">Requests</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-medium text-white">$0</div>
              <div className="mt-1 text-xs text-gray-500">Forever</div>
            </div>
          </div>
        </header>

        {/* endpoints */}
        <section className="mb-24">
          <div className="mb-8 flex items-baseline gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-lime-400">
              01 / Endpoints
            </span>
            <h2 className="text-2xl font-semibold tracking-tight">
              What you can call
            </h2>
          </div>

          <ul className="space-y-3">
            {ENDPOINTS.map((ep) => (
              <li
                key={ep.path}
                className="group flex flex-col gap-3 rounded-xl border border-white/6 bg-white/2 p-5 transition-colors hover:border-white/12 sm:flex-row sm:items-center sm:gap-6"
              >
                <span
                  className={`inline-flex w-fit items-center rounded-md px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-wider ${
                    ep.method === "POST"
                      ? "bg-lime-400/10 text-lime-400"
                      : "bg-violet-400/10 text-violet-400"
                  }`}
                >
                  {ep.method}
                </span>
                <code className="font-mono text-sm text-white">{ep.path}</code>
                <span className="text-sm text-gray-500 sm:ml-auto">
                  {ep.description}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* qck start */}
        <section className="mb-24">
          <div className="mb-8 flex items-baseline gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-lime-400">
              02 / Quick start
            </span>
            <h2 className="text-2xl font-semibold tracking-tight">
              Encode in one request
            </h2>
          </div>

          <pre className="overflow-x-auto rounded-2xl border border-white/6 bg-black/40 p-6 font-mono text-sm leading-relaxed text-gray-300">
            <code>{CODE_EXAMPLE}</code>
          </pre>

          <p className="mt-4 text-sm text-gray-500">
            Patterns compose — try{" "}
            <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-lime-400">
              ?|
            </code>{" "}
            to chain Enigma + Vigenère.
          </p>
        </section>

        {/* footer */}
        <footer className="border-t border-white/10 pt-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 font-mono text-xs text-gray-500">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime-400" />
              <span>by</span>
              <a
                href="https://zyther.dev"
                className="text-white underline decoration-dotted underline-offset-4 hover:text-lime-400"
              >
                Zyther Dev
              </a>
            </div>
            <div className="flex gap-4 font-mono text-xs text-gray-500">
              <a href="/docs" className="hover:text-lime-400">
                /docs
              </a>
              <a href="/api/openapi.json" className="hover:text-lime-400">
                /spec
              </a>
              <a
                href="https://github.com/zytherdev/scode"
                className="hover:text-lime-400"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}