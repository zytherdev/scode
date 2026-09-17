import { Command } from "commander"
import { decode } from "@zyther/scode-core"
import { readInput } from "../io/read"
import { writeOutput } from "../io/write"
import { color } from "../ui/colors"
import { fatal } from "../ui/errors"

export const decodeCommand = new Command("decode")
  .description("Decode an encrypted message using a cipher pattern.")
  .argument("[encrypted]", "Encrypted message (reads from stdin or --file if omitted).")
  .requiredOption("-p, --pattern <pattern>", "Cipher pattern (must match the one used to encode).")
  .option("-c, --config <config>", "Configuration string emitted by 'encode'.")
  .option("-f, --file <path>", "Read encrypted message from a file.")
  .option("--config-file <path>", "Read the config from a file.")
  .option("-o, --out <path>", "Write decrypted output to a file.")
  .option("--json", "Output the full result as JSON.", false)
  .action(async (encrypted: string | undefined, options) => {
    try {
      const input = (await readInput(encrypted, options.file)).trim()
      if (!input) fatal("encrypted message cannot be empty.")

      let config = options.config as string | undefined
      if (options.configFile) {
        config = (await readInput(undefined, options.configFile)).trim()
      }

      const result = decode({
        encrypted: input,
        pattern: options.pattern,
        config,
      })

      if (options.json) {
        console.log(JSON.stringify(result, null, 2))
        return
      }

      await writeOutput(result.status === "success" ? result.message : result.status, options.out)

      if (options.out) {
        console.error(color.success(`✓ Decoded → ${options.out}`))
      }
    } catch (e) {
      fatal(e instanceof Error ? e.message : "unknown error")
    }
  })