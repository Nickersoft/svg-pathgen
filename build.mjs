import { Glob } from "bun";

import dts from "bun-plugin-dts";

await Bun.build({
  entrypoints: Array.from(new Glob("./src/*.ts").scanSync()),
  outdir: "./dist",
  plugins: [dts()],
});
