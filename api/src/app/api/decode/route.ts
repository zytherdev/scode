import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { decode } from "@zyther/scode-core"

const DecodeSchema = z.object({
  encrypted: z.string().min(1, "Encrypted message cannot be empty"),
  pattern: z.string().min(1, "Pattern cannot be empty"),
  config: z.string().optional(),
})

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    )
  }

  const result = DecodeSchema.safeParse(body)
  if (!result.success) {
    const { fieldErrors, formErrors } = result.error.flatten()
    return NextResponse.json(
      { error: "Validation failed", fieldErrors, formErrors },
      { status: 422 }
    )
  }

  try {
    const decoded = decode({
      encrypted: result.data.encrypted,
      pattern: result.data.pattern,
      config: result.data.config,
    })
    return NextResponse.json(decoded, { status: 200 })
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Decoding failed" },
      { status: 400 }
    )
  }
}