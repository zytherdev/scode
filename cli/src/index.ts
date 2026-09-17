import { Command } from "commander"
import { encodeCommand } from "./commands/encode"
import { decodeCommand } from "./commands/decode"
import { ciphersCommand } from "./commands/ciphers"
import { patternsCommand } from "./commands/patterns"
import { startRepl } from "./repl"
import { color } from "./ui/colors"

const program = new Command()

program
  .name("scd")
  .description(
    "Encode and decode messages with classic ciphers. Run without a command to enter interactive mode."
  )
  .version("0.1.0", "-v, --version", "Show version.")

program.addCommand(encodeCommand)
program.addCommand(decodeCommand)
program.addCommand(ciphersCommand)
program.addCommand(patternsCommand)

// s/ cmd → REPL interativo :: se stdin é TTY
if (process.argv.length <= 2) {
  if (process.stdin.isTTY) {
    startRepl().catch((e) => {
      console.error(color.error(`error: ${(e as Error).message}`))
      process.exit(1)
    })
  } else {
    program.help()
  }
} else {
  program.parse()
}