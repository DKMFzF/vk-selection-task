const DEFAULT_API_URL = "/api/kinopoisk";

export const env = {
	apiUrl: __KINOPOISK_API_URL__ || DEFAULT_API_URL,
	apiKey: __KINOPOISK_API_KEY__ || "",
};
