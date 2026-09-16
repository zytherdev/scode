import { z } from "zod"
import { extendZodWithOpenApi, createDocument } from "zod-openapi"

extendZodWithOpenApi(z)

export const EncodeRequest = z.object({
  message: z.string().min(1).openapi({
    description: "The plain text to encode.",
    example: "hello world",
  }),
  pattern: z.string().min(1).openapi({
    description: "The cipher pattern (e.g. ¬, ?, |).",
    example: "¬",
  }),
}).openapi({ description: "The request body for encoding a message." })

export const EncodeResponse = z.object({
  encrypted: z.string().openapi({ example: "-.-. .... . .-.. .-.. ---" }),
  config: z.string().openapi({ example: "" }),
  pattern: z.string().openapi({ example: "¬" }),
  message: z.string().openapi({ example: "HELLOWORLD" }),
}).openapi({ description: "The response body for encoding a message." })

export const DecodeRequest = z.object({
  encrypted: z.string().min(1),
  pattern: z.string().min(1),
  config: z.string().optional(),
}).openapi({ description: "The request body for decoding a message." })

export const DecodeResponse = z.object({
  message: z.string().openapi({ example: "HELLOWORLD" }),
}).openapi({ description: "The response body for decoding a message." })

export const ErrorResponse = z.object({
  error: z.string(),
  fieldErrors: z.record(z.array(z.string())).optional(),
  formErrors: z.array(z.string()).optional(),
}).openapi({ description: "The response body for an error." })


export function generateOpenApiSpec() {
  return createDocument({
    openapi: "3.0.3",
    info: {
      title: "SCode API",
      version: "0.1.0",
      description:
        "Public HTTP API for encoding and decoding messages using classic ciphers.\n\n" +
        "Built on top of `@zyther/scode-core`. All ciphers run statelessly — " +
        "no data is stored between requests.",
      contact: {
        name: "Zyther Dev",
        url: "https://zyther.dev",
        email: "hello@zyther.dev",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "https://api.scode.zyther.dev",
        description: "Production",
      },
      {
        url: "http://localhost:3000",
        description: "Local development",
      },
    ],
    paths: {
      "/api/encode": {
        post: {
          tags: ["Encode"],
          summary: "Encode a message",
          description:
            "Encodes a plain message using the given cipher pattern. " +
            "Returns the encrypted text and the configuration needed to decode it.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: EncodeRequest,
              },
            },
          },
          responses: {
            "200": {
              description: "Encoded successfully",
              content: {
                "application/json": {
                  schema: EncodeResponse,
                },
              },
            },
            "422": {
              description: "Validation failed",
              content: {
                "application/json": {
                  schema: ErrorResponse,
                },
              },
            },
            "400": {
              description: "Encoding failed",
              content: {
                "application/json": {
                  schema: ErrorResponse,
                },
              },
            },
          },
        },
      },
      "/api/decode": {
        post: {
          tags: ["Decode"],
          summary: "Decode a message",
          description:
            "Decodes an encrypted message back to plain text. " +
            "Requires the same pattern used during encoding, plus the emitted config (if any).",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: DecodeRequest,
              },
            },
          },
          responses: {
            "200": {
              description: "Decoded successfully",
              content: {
                "application/json": {
                  schema: DecodeResponse,
                },
              },
            },
            "422": {
              description: "Validation failed",
              content: {
                "application/json": {
                  schema: ErrorResponse,
                },
              },
            },
            "400": {
              description: "Decoding failed",
              content: {
                "application/json": {
                  schema: ErrorResponse,
                },
              },
            },
          },
        },
      },
      "/api/ciphers": {
        get: {
          tags: ["Meta"],
          summary: "List available ciphers",
          description: "Returns metadata for every cipher available in the API.",
          responses: {
            "200": {
              description: "List of ciphers",
              content: {
                "application/json": {
                  schema: z.object({
                    ciphers: z.array(
                      z.object({
                        name: z.string(),
                        symbol: z.string(),
                        description: z.string(),
                      })
                    ),
                  }),
                },
              },
            },
          },
        },
      },
      "/api/health": {
        get: {
          tags: ["Meta"],
          summary: "Health check",
          responses: {
            "200": {
              description: "Service is healthy",
              content: {
                "application/json": {
                  schema: z.object({
                    status: z.string(),
                    timestamp: z.string(),
                  }),
                },
              },
            },
          },
        },
      },
    },
  })
}