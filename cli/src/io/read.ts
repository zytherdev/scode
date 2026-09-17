import { readFile } from "node:fs/promises"

/**
 * Resolve input from (in priority order):
 *   1. explicit argument
 *   2. --file option
 *   3. stdin (if not a TTY)
 *   4. null (caller decides what to do)
 */
export async function readInput(
  arg: string | undefined,
  filePath?: string
): Promise<string> {
  if (arg && arg.length > 0) return arg

  if (filePath) {
    try {
      return await readFile(filePath, "utf8")
    } catch {
      throw new Error(`Could not read file: ${filePath}`)
    }
  }

  if (!process.stdin.isTTY) {
    return await readStdin()
  }

  return ""
}

function readStdin(): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = ""
    process.stdin.setEncoding("utf8")
    process.stdin.on("data", (chunk) => (data += chunk))
    process.stdin.on("end", () => resolve(data))
    process.stdin.on("error", reject)
  })
}