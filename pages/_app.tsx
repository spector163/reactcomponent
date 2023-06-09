import "../src/index.css";
import "../src/custom.css";
import "react-loading-skeleton/dist/skeleton.css";
import Layout from "../src/UI/Layout";
import { AppProps } from "next/app";
import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fastContext } from "@utils/useNavigation";

export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Hydrate>
		</QueryClientProvider>
	);
}
