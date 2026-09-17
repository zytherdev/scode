import { color } from "./colors"

export function fatal(message: string): never {
  console.error(color.error(`error: ${message}`))
  process.exit(1)
}

export function usageError(message: string): never {
  console.error(color.error(`error: ${message}`))
  console.error(color.dim(`\nRun 'scd --help' for usage.`))
  process.exit(2)
}