import { QueryClientConfig } from "@tanstack/react-query";

export const queryClientConfig: QueryClientConfig = {
	defaultOptions: {
		queries: {
			// refetchOnMount: false,
			refetchOnWindowFocus: false,
		},
	},
};
