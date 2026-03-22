import axios from "axios";

import { env } from "@/shared/config/env";

let apiRequestCount = 0;

export const apiClient = axios.create({
	baseURL: env.apiUrl,
	headers: {
		"X-API-KEY": env.apiKey,
	},
});

apiClient.interceptors.request.use((config) => {
	apiRequestCount += 1;
	const method = (config.method || "GET").toUpperCase();
	const url = `${config.baseURL || ""}${config.url || ""}`;
	console.info(`[api] request #${apiRequestCount}: ${method} ${url}`);
	return config;
});
