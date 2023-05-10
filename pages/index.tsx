
import { faker } from "@faker-js/faker";
import Accordian from "../src/components/Accordian";
import Gallery from "../src/components/Gallery";
import { useState } from "react";


const Home = () => {
	return (
		<>
			<Accordian></Accordian>
			<Gallery />

			<GenerateAndDisplayData />

		</>
	);
};

export default Home;
type Data = {
	name: string;
	pet: string;
	age: string;
};

const GenerateAndDisplayData = () => {
	const [data, setData] = useState<Data[]>();
	const handleClick = () => {
		const result: Data[] = [];
		for (let i = 0; i < 10; i++) {
			result.push({
				name: faker.name.firstName(),
				pet: faker.animal.dog(),
				age: faker.random.numeric(2),
			});
		}
		setData(result);
	};
	return (
		<div className='flex flex-col gap-2'>
			<button
				className='text-center font-bold underline active:scale-95 transition-all duration-300 ease-in-out border-[#333] capitalize'
				onClick={handleClick}
			>
				Generate me Dady!
			</button>
			{data && (
				<pre className='bg-[#333] text-white p-4'>
					<code>{JSON.stringify(data, null, 2)}</code>
				</pre>
			)}
		</div>
	);
};
