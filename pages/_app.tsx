import React from "react";
import "../src/index.css";
import "../src/custom.css";

export default function App({ Component, pageProps }) {
	return <Component className='App' {...pageProps} />;
}
