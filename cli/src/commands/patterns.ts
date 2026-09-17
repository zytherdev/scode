import { Command } from "commander"
import { color } from "../ui/colors"

const EXAMPLES = [
  { pattern: "¬",     description: "Morse only" },
  { pattern: "?",     description: "Enigma only" },
  { pattern: "?|",    description: "Enigma, then Vigenère" },
  { pattern: "&§",    description: "Mutation.reciprocity, then Frama" },
  { pattern: "°|#",   description: "Order.random, then Vigenère, then Polybius" },
  { pattern: "?|~₢",  description: "Enigma → Vigenère → Mutation.decalation → Bacon" },
]

export const patternsCommand = new Command("patterns")
  .description("Show example cipher patterns and how they compose.")
  .option("--json", "Output as JSON.", false)
  .action((options) => {
    if (options.json) {
      console.log(JSON.stringify({ examples: EXAMPLES }, null, 2))
      return
    }

    console.log(color.bold("Pattern composition\n"))
    console.log(
      "  A pattern is a string of cipher symbols applied in sequence."
    )
    console.log(
      "  Patterns are applied right-to-left (last symbol = innermost encoding).\n"
    )

    for (const ex of EXAMPLES) {
      console.log(
        `  ${color.brand(ex.pattern.padEnd(6))}  ${color.dim(ex.description)}`
      )
    }

    console.log()
    console.log(
      color.dim("Run 'scd ciphers' to see every available symbol.")
    )
  })