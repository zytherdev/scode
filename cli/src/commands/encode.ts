import { Command } from "commander"
import { encode, format_str } from "@zyther/scode-core"
import { readInput } from "../io/read"
import { writeOutput } from "../io/write"
import { color } from "../ui/colors"
import { fatal } from "../ui/errors"

export const encodeCommand = new Command("encode")
  .description("Encode a message using a cipher pattern.")
  .argument("[message]", "Message to encode (reads from stdin or --file if omitted).")
  .requiredOption("-p, --pattern <pattern>", "Cipher pattern (e.g. ¬ or ?|).")
  .option("-f, --file <path>", "Read message from a file.")
  .option("-o, --out <path>", "Write encrypted output to a file.")
  .option("--config-out <path>", "Write the decode config to a file.")
  .option("--json", "Output the full result as JSON.", false)
  .action(async (message: string | undefined, options) => {
    try {
      const input = (await readInput(message, options.file)).trim()
      if (!input) fatal("message cannot be empty.")

      const result = encode({
        message: format_str(input),
        pattern: options.pattern,
      })

      if (options.json) {
        console.log(JSON.stringify(result, null, 2))
        return
      }

      await writeOutput(result.encrypted, options.out)

      if (options.configOut && result.config) {
        await writeOutput(result.config, options.configOut)
      }

      // msgs d/ yess só no stderr
      if (options.out || options.configOut) {
        const parts: string[] = []
        if (options.out) parts.push(`→ ${options.out}`)
        if (options.configOut) parts.push(`config → ${options.configOut}`)
        console.error(color.success(`✓ Encoded ${parts.join(" · ")}`))
      }
    } catch (e) {
      fatal(e instanceof Error ? e.message : "unknown error")
    }
  })