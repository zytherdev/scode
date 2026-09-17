import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node18",
  platform: "node",
  banner: {
    // shebang prvd no t/p do bundle
    js: "#!/usr/bin/env node",
  },
  dts: false,
  sourcemap: true,
  clean: true,
  minify: false,
  splitting: false,
})