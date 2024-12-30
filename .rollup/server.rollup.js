const packageJson = require("./package.json");

import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import tsPlugin from "@rollup/plugin-typescript";

export default {
  plugins: [babel({ babelHelpers: "bundled" }), terser(), tsPlugin()],
  input: "src/app/server/index.ts",
  output: [
    {
      file: packageJson.module,
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
    {
      file: packageJson.main,
      sourcemap: true,
      exports: "named",
      format: "esm",
    },
  ],
  external: ["next/server", "next/headers", "react", "iron-session"],
};
