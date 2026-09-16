import { NextResponse } from "next/server"
import { listCiphers } from "@zyther/scode-core"

export async function GET() {
  const ciphers = listCiphers()
  return NextResponse.json({ ciphers }, { status: 200 })
}