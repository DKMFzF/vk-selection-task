import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
	plugins: [pluginReact()],
	source: {
		define: {
			__KINOPOISK_API_URL__: JSON.stringify(process.env.KINOPOISK_API_URL ?? ""),
			__KINOPOISK_API_KEY__: JSON.stringify(process.env.KINOPOISK_API_KEY ?? ""),
		},
	},
	resolve: {
		alias: {
			"@": "./src",
		},
	},
	server: {
		port: process.env.PORT ? Number(process.env.PORT) : 3000,
		proxy: {
			"/api/kinopoisk": {
				target: "https://api.kinopoisk.dev",
				changeOrigin: true,
				pathRewrite: {
					"^/api/kinopoisk": "/v1.4",
				},
			},
		},
	},
});
