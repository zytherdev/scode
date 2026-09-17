import { describe, it, expect } from "vitest"
import { readInput } from "../io/read"

describe("readInput", () => {
  it("returns the explicit argument when provided", async () => {
    const result = await readInput("hello", undefined)
    expect(result).toBe("hello")
  })

  it("throws when the file cannot be read", async () => {
    await expect(readInput(undefined, "/nonexistent/file.txt")).rejects.toThrow(
      /Could not read file/
    )
  })
})