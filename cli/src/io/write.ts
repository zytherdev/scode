import { writeFile } from "node:fs/promises"

/**
 * Write output to stdout (raw, no decoration) or to a file.
 * stdout é o canal de dados; mensagens vão pra stderr.
 */
export async function writeOutput(
  content: string,
  filePath?: string
): Promise<void> {
  if (filePath) {
    await writeFile(filePath, content, "utf8")
  } else {
    process.stdout.write(content + "\n")
  }
}