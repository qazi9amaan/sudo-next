import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import tsPlugin from "@rollup/plugin-typescript";

export default {
  plugins: [babel({ babelHelpers: "bundled" }), terser(), tsPlugin()],
  input: "src/app/edge/index.ts",
  output: [
    {
      file: "dist/edge/cjs/index.js",
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    {
      file: `dist/edge/index.js`,
      sourcemap: true,
      exports: "named",
      format: "esm",
    },
  ],
  external: ["next/server", "next/headers", "react", "iron-session"],
};
