import { defineConfig, type UserConfig } from "tsdown";

const config: UserConfig = defineConfig({
	entry: ["src/index.ts"],
	format: "esm",
	platform: "neutral",
	dts: true,
	sourcemap: true,
	exports: true,
});

export default config;
