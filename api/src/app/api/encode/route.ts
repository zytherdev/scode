import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { encode, format_str } from "@zyther/scode-core"

const EncodeSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  pattern: z.string().min(1, "Pattern cannot be empty"),
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

  const result = EncodeSchema.safeParse(body)
  if (!result.success) {
    const { fieldErrors, formErrors } = result.error.flatten()
    return NextResponse.json(
      { error: "Validation failed", fieldErrors, formErrors },
      { status: 422 }
    )
  }

  try {
    const encoded = encode({
      message: format_str(result.data.message),
      pattern: result.data.pattern,
    })
    return NextResponse.json(encoded, { status: 200 })
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Encoding failed" },
      { status: 400 }
    )
  }
}