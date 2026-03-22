import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
	plugins: [pluginReact()],
	server: {
		port: process.env.PORT ? Number(process.env.PORT) : 3000
	},
});
