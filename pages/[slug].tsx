import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

const Home = ({ url }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return <div>{JSON.stringify(url)}</div>;
};

export default Home;

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [{ params: { slug: "1" } }],
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps<{ url?: ParsedUrlQuery }> = async (
	ctx
) => {
	const { params } = ctx;
	return {
		props: {
			url: params,
		},
	};
};
