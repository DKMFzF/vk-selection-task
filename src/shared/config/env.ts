const DEFAULT_API_URL = "/api/kinopoisk";

export const env = {
	// Keep browser requests behind local dev proxy to avoid CORS issues.
	apiUrl: DEFAULT_API_URL,
	apiKey: __KINOPOISK_API_KEY__ || "",
};
