import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import tsPlugin from "@rollup/plugin-typescript";

export default {
  plugins: [babel({ babelHelpers: "bundled" }), terser(), tsPlugin()],
  input: "src/app/client/index.ts",
  output: [
    {
      file: "dist/client/index.js",
      format: "esm",
      sourcemap: true,
      exports: "named",
    },
    {
      file: "dist/client/cjs/index.js",
      format: "cjs",
      sourcemap: true,
      exports: "named",
    },
  ],
  external: ["react", "react-dom"],
};
