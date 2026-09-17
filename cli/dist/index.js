#!/usr/bin/env node

// src/index.ts
import { Command as Command5 } from "commander";

// src/commands/encode.ts
import { Command } from "commander";
import { encode, format_str } from "@zyther/scode-core";

// src/io/read.ts
import { readFile } from "fs/promises";
async function readInput(arg, filePath) {
  if (arg && arg.length > 0) return arg;
  if (filePath) {
    try {
      return await readFile(filePath, "utf8");
    } catch {
      throw new Error(`Could not read file: ${filePath}`);
    }
  }
  if (!process.stdin.isTTY) {
    return await readStdin();
  }
  return "";
}
function readStdin() {
  return new Promise((resolve, reject) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => data += chunk);
    process.stdin.on("end", () => resolve(data));
    process.stdin.on("error", reject);
  });
}

// src/io/write.ts
import { writeFile } from "fs/promises";
async function writeOutput(content, filePath) {
  if (filePath) {
    await writeFile(filePath, content, "utf8");
  } else {
    process.stdout.write(content + "\n");
  }
}

// src/ui/colors.ts
import pc from "picocolors";
var useColor = process.stdout.isTTY && !process.env.NO_COLOR;
function wrap(fn) {
  return useColor ? fn : (s) => s;
}
var color = {
  brand: wrap(pc.green),
  success: wrap(pc.green),
  error: wrap(pc.red),
  warning: wrap(pc.yellow),
  dim: wrap(pc.dim),
  bold: wrap(pc.bold),
  muted: wrap(pc.gray)
};

// src/ui/errors.ts
function fatal(message) {
  console.error(color.error(`error: ${message}`));
  process.exit(1);
}

// src/commands/encode.ts
var encodeCommand = new Command("encode").description("Encode a message using a cipher pattern.").argument("[message]", "Message to encode (reads from stdin or --file if omitted).").requiredOption("-p, --pattern <pattern>", "Cipher pattern (e.g. \xAC or ?|).").option("-f, --file <path>", "Read message from a file.").option("-o, --out <path>", "Write encrypted output to a file.").option("--config-out <path>", "Write the decode config to a file.").option("--json", "Output the full result as JSON.", false).action(async (message, options) => {
  try {
    const input = (await readInput(message, options.file)).trim();
    if (!input) fatal("message cannot be empty.");
    const result = encode({
      message: format_str(input),
      pattern: options.pattern
    });
    if (options.json) {
      console.log(JSON.stringify(result, null, 2));
      return;
    }
    await writeOutput(result.encrypted, options.out);
    if (options.configOut && result.config) {
      await writeOutput(result.config, options.configOut);
    }
    if (options.out || options.configOut) {
      const parts = [];
      if (options.out) parts.push(`\u2192 ${options.out}`);
      if (options.configOut) parts.push(`config \u2192 ${options.configOut}`);
      console.error(color.success(`\u2713 Encoded ${parts.join(" \xB7 ")}`));
    }
  } catch (e) {
    fatal(e instanceof Error ? e.message : "unknown error");
  }
});

// src/commands/decode.ts
import { Command as Command2 } from "commander";
import { decode } from "@zyther/scode-core";
var decodeCommand = new Command2("decode").description("Decode an encrypted message using a cipher pattern.").argument("[encrypted]", "Encrypted message (reads from stdin or --file if omitted).").requiredOption("-p, --pattern <pattern>", "Cipher pattern (must match the one used to encode).").option("-c, --config <config>", "Configuration string emitted by 'encode'.").option("-f, --file <path>", "Read encrypted message from a file.").option("--config-file <path>", "Read the config from a file.").option("-o, --out <path>", "Write decrypted output to a file.").option("--json", "Output the full result as JSON.", false).action(async (encrypted, options) => {
  try {
    const input = (await readInput(encrypted, options.file)).trim();
    if (!input) fatal("encrypted message cannot be empty.");
    let config = options.config;
    if (options.configFile) {
      config = (await readInput(void 0, options.configFile)).trim();
    }
    const result = decode({
      encrypted: input,
      pattern: options.pattern,
      config
    });
    if (options.json) {
      console.log(JSON.stringify(result, null, 2));
      return;
    }
    await writeOutput(result.status === "success" ? result.message : result.status, options.out);
    if (options.out) {
      console.error(color.success(`\u2713 Decoded \u2192 ${options.out}`));
    }
  } catch (e) {
    fatal(e instanceof Error ? e.message : "unknown error");
  }
});

// src/commands/ciphers.ts
import { Command as Command3 } from "commander";
import { listCiphers } from "@zyther/scode-core";
var ciphersCommand = new Command3("ciphers").description("List every cipher available in SCode.").option("--json", "Output as JSON.", false).action((options) => {
  const ciphers = listCiphers();
  if (options.json) {
    console.log(JSON.stringify({ ciphers }, null, 2));
    return;
  }
  console.log(color.bold("Available ciphers\n"));
  const maxSymbol = Math.max(...ciphers.map((c) => c.symbol.length));
  const maxName = Math.max(...ciphers.map((c) => c.name.length));
  for (const c of ciphers) {
    const symbol = c.symbol.padEnd(maxSymbol);
    const name = c.name.padEnd(maxName);
    console.log(
      `  ${color.brand(symbol)}  ${color.bold(name)}  ${color.dim(c.description)}`
    );
  }
  console.log();
  console.log(color.dim("Compose ciphers: e.g. '?|' chains Enigma + Vigen\xE8re."));
});

// src/commands/patterns.ts
import { Command as Command4 } from "commander";
var EXAMPLES = [
  { pattern: "\xAC", description: "Morse only" },
  { pattern: "?", description: "Enigma only" },
  { pattern: "?|", description: "Enigma, then Vigen\xE8re" },
  { pattern: "&\xA7", description: "Mutation.reciprocity, then Frama" },
  { pattern: "\xB0|#", description: "Order.random, then Vigen\xE8re, then Polybius" },
  { pattern: "?|~\u20A2", description: "Enigma \u2192 Vigen\xE8re \u2192 Mutation.decalation \u2192 Bacon" }
];
var patternsCommand = new Command4("patterns").description("Show example cipher patterns and how they compose.").option("--json", "Output as JSON.", false).action((options) => {
  if (options.json) {
    console.log(JSON.stringify({ examples: EXAMPLES }, null, 2));
    return;
  }
  console.log(color.bold("Pattern composition\n"));
  console.log(
    "  A pattern is a string of cipher symbols applied in sequence."
  );
  console.log(
    "  Patterns are applied right-to-left (last symbol = innermost encoding).\n"
  );
  for (const ex of EXAMPLES) {
    console.log(
      `  ${color.brand(ex.pattern.padEnd(6))}  ${color.dim(ex.description)}`
    );
  }
  console.log();
  console.log(
    color.dim("Run 'scd ciphers' to see every available symbol.")
  );
});

// src/repl.ts
import * as p from "@clack/prompts";
import { encode as encode2, decode as decode2, listCiphers as listCiphers2 } from "@zyther/scode-core";
async function startRepl() {
  p.intro(color.brand("scd") + color.dim(" \u2014 interactive mode"));
  while (true) {
    const mode = await p.select({
      message: "What do you want to do?",
      options: [
        { value: "encode", label: "Encode a message" },
        { value: "decode", label: "Decode a message" },
        { value: "ciphers", label: "List available ciphers" },
        { value: "exit", label: "Exit" }
      ]
    });
    if (p.isCancel(mode) || mode === "exit") {
      p.outro(color.dim("bye \u{1F44B}"));
      return;
    }
    if (mode === "ciphers") {
      const ciphers = listCiphers2();
      for (const c of ciphers) {
        p.log.message(
          `${color.brand(c.symbol)}  ${color.bold(c.name)}  ${color.dim(c.description)}`
        );
      }
      continue;
    }
    const pattern = await p.text({
      message: "Pattern",
      placeholder: "e.g. \xAC or ?|",
      validate: (v) => v.length === 0 ? "Pattern cannot be empty." : void 0
    });
    if (p.isCancel(pattern)) continue;
    const message = await p.text({
      message: mode === "encode" ? "Message" : "Encrypted message",
      validate: (v) => v.length === 0 ? "Message cannot be empty." : void 0
    });
    if (p.isCancel(message)) continue;
    let config;
    if (mode === "decode") {
      const cfg = await p.text({
        message: "Config (optional)",
        placeholder: "leave empty if not needed"
      });
      if (!p.isCancel(cfg)) config = cfg;
    }
    const s = p.spinner();
    s.start("Working\u2026");
    try {
      if (mode === "encode") {
        const result = encode2({ message, pattern });
        s.stop(color.success("\u2713 Done"));
        p.log.message(`${color.dim("encrypted:")} ${result.encrypted}`);
        if (result.config) {
          p.log.message(`${color.dim("config:   ")} ${result.config}`);
        }
      } else {
        const result = decode2({
          encrypted: message,
          pattern,
          config
        });
        s.stop(color.success("\u2713 Done"));
        p.log.message(`${color.dim("message:")} ${result.status === "success" ? result.message : result.status}`);
      }
    } catch (e) {
      s.stop(color.error("\u2717 Failed"));
      p.log.error(e instanceof Error ? e.message : "unknown error");
    }
  }
}

// src/index.ts
var program = new Command5();
program.name("scd").description(
  "Encode and decode messages with classic ciphers. Run without a command to enter interactive mode."
).version("0.1.0", "-v, --version", "Show version.");
program.addCommand(encodeCommand);
program.addCommand(decodeCommand);
program.addCommand(ciphersCommand);
program.addCommand(patternsCommand);
if (process.argv.length <= 2) {
  if (process.stdin.isTTY) {
    startRepl().catch((e) => {
      console.error(color.error(`error: ${e.message}`));
      process.exit(1);
    });
  } else {
    program.help();
  }
} else {
  program.parse();
}
//# sourceMappingURL=index.js.map