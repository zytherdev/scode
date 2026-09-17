import pc from "picocolors"

const useColor = process.stdout.isTTY && !process.env.NO_COLOR

function wrap(fn: (s: string) => string) {
  return useColor ? fn : (s: string) => s
}

export const color = {
  brand: wrap(pc.green),
  success: wrap(pc.green),
  error: wrap(pc.red),
  warning: wrap(pc.yellow),
  dim: wrap(pc.dim),
  bold: wrap(pc.bold),
  muted: wrap(pc.gray),
}