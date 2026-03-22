import axios from "axios";

import { env } from "@/shared/config/env";

export const apiClient = axios.create({
	baseURL: env.apiUrl,
	headers: {
		"X-API-KEY": env.apiKey,
	},
});
