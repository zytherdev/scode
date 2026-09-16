"use client"

import dynamic from "next/dynamic"

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen items-center justify-center">
      <div className="font-mono text-sm text-gray-500">Loading API docs…</div>
    </div>
  ),
})

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <SwaggerUI url="/api/openapi.json" />
    </div>
  )
}