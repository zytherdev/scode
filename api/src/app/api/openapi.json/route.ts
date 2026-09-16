import { NextResponse } from "next/server"
import { generateOpenApiSpec } from "@/lib/openapi"

export async function GET() {
  return NextResponse.json(generateOpenApiSpec(), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}