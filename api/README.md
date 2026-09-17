# SCode API

Public HTTP API for classic ciphers — Enigma, Morse, Polybius, Vigenère, and more.

Built on top of [`@zyther/scode-core`](../npm). Stateless, no authentication, no
data stored between requests.

- **Live API:** [api.scode.zyther.dev](https://api.scode.zyther.dev)
- **Interactive docs:** [api.scode.zyther.dev/docs](https://api.scode.zyther.dev/scalar)
- **OpenAPI spec:** [api.scode.zyther.dev/api/openapi.json](https://api.scode.zyther.dev/api/openapi.json)

## Stack

- **Next.js 15** (App Router, Route Handlers)
- **TypeScript**
- **Zod** for input validation
- **zod-openapi** for spec generation
- **Scalar** for interactive documentation

## Endpoints

| Method | Path              | Description                             |
| ------ | ----------------- | --------------------------------------- |
| `POST` | `/api/encode`     | Encode a plain message using a pattern. |
| `POST` | `/api/decode`     | Decode an encrypted message.            |
| `GET`  | `/api/ciphers`    | List every cipher available.            |
| `GET`  | `/api/health`     | Health check.                           |
| `GET`  | `/api/openapi.json` | OpenAPI 3.0 spec.                     |

## Quick start

### Encode

```bash
curl -X POST https://api.scode.zyther.dev/api/encode \
  -H "Content-Type: application/json" \
  -d '{
    "message": "hello world",
    "pattern": "¬"
  }'
```

**Response:**

```json
{
  "encrypted": "-.-. .... . .-.. .-.. ---",
  "config": "",
  "pattern": "¬",
  "message": "HELLOWORLD"
}
```

### Decode

```bash
curl -X POST https://api.scode.zyther.dev/api/decode \
  -H "Content-Type: application/json" \
  -d '{
    "encrypted": "-.-. .... . .-.. .-.. ---",
    "pattern": "¬",
    "config": ""
  }'
```

**Response:**

```json
{
  "message": "HELLOWORLD"
}
```

### Chained patterns

Patterns compose — chain multiple ciphers in one request. Here, Enigma then
Vigenère:

```bash
curl -X POST https://api.scode.zyther.dev/api/encode \
  -H "Content-Type: application/json" \
  -d '{
    "message": "meet me at dawn",
    "pattern": "?|"
  }'
```

The response includes a `config` string — pass it back verbatim when decoding.

## API reference

### `POST /api/encode`

| Field     | Type     | Required | Description                          |
| --------- | -------- | :------: | ------------------------------------ |
| `message` | `string` |    ✓     | The plain text to encode.            |
| `pattern` | `string` |    ✓     | The cipher pattern (e.g. `¬`, `?`).  |

**200** — `{ encrypted, config, pattern }`
**422** — validation failed (missing/empty fields)
**400** — encoding failed (invalid pattern, unknown symbol)

### `POST /api/decode`

| Field       | Type     | Required | Description                                      |
| ----------- | -------- | :------: | ------------------------------------------------ |
| `encrypted` | `string` |    ✓     | The encoded message.                             |
| `pattern`   | `string` |    ✓     | The pattern used during encoding.                |
| `config`    | `string` |          | Configuration emitted by `encode` (if any).      |

**200** — `{ message }`
**422** — validation failed
**400** — decoding failed (invalid pattern or config)

### `GET /api/ciphers`

Returns metadata for every cipher available.

```json
{
  "ciphers": [
    { "name": "Morse",  "symbol": "¬", "description": "Morse code." },
    { "name": "Enigma", "symbol": "?", "description": "WWII Enigma machine." }
  ]
}
```

### `GET /api/health`

```json
{ "status": "ok", "timestamp": "2026-01-01T00:00:00.000Z" }
```

## Ciphers

| Symbol | Cipher                    | Needs config |
| ------ | ------------------------- | :----------: |
| `$`    | SCSimply — `key` level    |      no      |
| `¢`    | SCSimply — `key_m` level  |      no      |
| `@`    | SCSimply — `a_num` level  |      no      |
| `¬`    | Morse                     |      no      |
| `£`    | Binary                    |      no      |
| `#`    | Polybius square           |     yes      |
| `*`    | Navajo                    |      no      |
| `?`    | Enigma machine            |     yes      |
| `\|`    | Vigenère                  |     yes      |
| `§`    | Frama                     |     yes      |
| `₢`    | Bacon                     |      no      |
| `&`    | Mutation — reciprocity    |      no      |
| `~`    | Mutation — decalation     |     yes      |
| `:`    | Order — reverse           |      no      |
| `°`    | Order — random            |     yes      |

Symbols `#`, `*`, `@` are **restricted** — they can only appear at the end of a
pattern.

## CORS

The API is **public and open** — `Access-Control-Allow-Origin: *` for all
origins, all methods. No authentication, no API keys, no cookies.

If you're calling from a browser, no preflight configuration is needed.

## Errors

All error responses share the same shape:

```json
{
  "error": "Validation failed",
  "fieldErrors": {
    "message": ["Message cannot be empty"]
  },
  "formErrors": []
}
```

| Status | Meaning                                                         |
| ------ | --------------------------------------------------------------- |
| `422`  | Validation failed — check `fieldErrors` for which field broke.  |
| `400`  | Core rejected the request — invalid pattern or missing config.  |
| `429`  | Rate limit exceeded (when enabled).                             |
| `500`  | Unexpected server error.                                        |


## Related

- **Core library:** [`@zyther/scode-core`](../npm)
- **Web app:** [scode.zyther.dev](https://scode.zyther.dev)
- **Source:** [github.com/zytherdev/scode](https://github.com/zytherdev/scode)

## License

MIT © [Zyther Dev](https://zyther.dev)
