import * as p from "@clack/prompts"
import { encode, decode, listCiphers } from "@zyther/scode-core"
import { color } from "./ui/colors"

type Mode = "encode" | "decode" | "ciphers" | "exit"

export async function startRepl(): Promise<void> {
  p.intro(color.brand("scd") + color.dim(" — interactive mode"))

  while (true) {
    const mode = await p.select({
      message: "What do you want to do?",
      options: [
        { value: "encode",  label: "Encode a message" },
        { value: "decode",  label: "Decode a message" },
        { value: "ciphers", label: "List available ciphers" },
        { value: "exit",    label: "Exit" },
      ],
    })

    if (p.isCancel(mode) || mode === "exit") {
      p.outro(color.dim("bye 👋"))
      return
    }

    if (mode === "ciphers") {
      const ciphers = listCiphers()
      for (const c of ciphers) {
        p.log.message(
          `${color.brand(c.symbol)}  ${color.bold(c.name)}  ${color.dim(c.description)}`
        )
      }
      continue
    }

    const pattern = await p.text({
      message: "Pattern",
      placeholder: "e.g. ¬ or ?|",
      validate: (v) => (v.length === 0 ? "Pattern cannot be empty." : undefined),
    })
    if (p.isCancel(pattern)) continue

    const message = await p.text({
      message: mode === "encode" ? "Message" : "Encrypted message",
      validate: (v) => (v.length === 0 ? "Message cannot be empty." : undefined),
    })
    if (p.isCancel(message)) continue

    let config: string | undefined
    if (mode === "decode") {
      const cfg = await p.text({
        message: "Config (optional)",
        placeholder: "leave empty if not needed",
      })
      if (!p.isCancel(cfg)) config = cfg
    }

    const s = p.spinner()
    s.start("Working…")

    try {
      if (mode === "encode") {
        const result = encode({ message: message as string, pattern: pattern as string })
        s.stop(color.success("✓ Done"))
        p.log.message(`${color.dim("encrypted:")} ${result.encrypted}`)
        if (result.config) {
          p.log.message(`${color.dim("config:   ")} ${result.config}`)
        }
      } else {
        const result = decode({
          encrypted: message as string,
          pattern: pattern as string,
          config,
        })
        s.stop(color.success("✓ Done"))
        p.log.message(`${color.dim("message:")} ${result.status === "success" ? result.message : result.status}`)
      }
    } catch (e) {
      s.stop(color.error("✗ Failed"))
      p.log.error(e instanceof Error ? e.message : "unknown error")
    }
  }
}