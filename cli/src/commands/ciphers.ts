import { Command } from "commander"
import { listCiphers } from "@zyther/scode-core"
import { color } from "../ui/colors"

export const ciphersCommand = new Command("ciphers")
  .description("List every cipher available in SCode.")
  .option("--json", "Output as JSON.", false)
  .action((options) => {
    const ciphers = listCiphers()

    if (options.json) {
      console.log(JSON.stringify({ ciphers }, null, 2))
      return
    }

    console.log(color.bold("Available ciphers\n"))

    const maxSymbol = Math.max(...ciphers.map((c) => c.symbol.length))
    const maxName = Math.max(...ciphers.map((c) => c.name.length))

    for (const c of ciphers) {
      const symbol = c.symbol.padEnd(maxSymbol)
      const name = c.name.padEnd(maxName)
      console.log(
        `  ${color.brand(symbol)}  ${color.bold(name)}  ${color.dim(c.description)}`
      )
    }

    console.log()
    console.log(color.dim("Compose ciphers: e.g. '?|' chains Enigma + Vigenère."))
  })