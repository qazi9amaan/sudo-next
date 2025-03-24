import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import tsPlugin from "@rollup/plugin-typescript";

export default {
  plugins: [babel({ babelHelpers: "bundled" }), terser(), tsPlugin()],
  input: "src/plugins/index.ts",
  output: [
    {
      file: "dist/plugins/cjs/index.js",
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    {
      file: `dist/plugins/index.js`,
      sourcemap: true,
      exports: "named",
      format: "esm",
    },
  ],
  external: ["ioredis", "crypto"],
};
