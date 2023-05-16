import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type Response = {
	value: string;
	label: string;
	typeval: string;
	labelfor: string;
};

const fetchResponse = async (input: string) => {
	const result = await axios.get(
		`http://localhost:80/collegebatch-next/api/searchSuggestion?term=${input}`,
		{
			withCredentials: true,
		}
	);
	return result.data as Response[];
};

export const useSearch = (input: string) => {
	return useQuery(["search", input], () => fetchResponse(input), {
		enabled: !!input,
		keepPreviousData: false,
	});
};
