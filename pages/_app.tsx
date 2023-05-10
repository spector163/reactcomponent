// import React from "react";
import "../src/index.css";
import "../src/custom.css";
import Layout from "../src/UI/Layout";

export default function App({ Component, pageProps }) {
	return (
		<Layout>
			<Component className='App' {...pageProps} />
		</Layout>
	);
}
