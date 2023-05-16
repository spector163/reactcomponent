import Gallery from "@components/Gallery";
import Accordian from "@components/Accordian";

import { ContentLoader } from "@UI/Loaders";
import Hero, { MainSearch } from "@components/Hero";
import { useSearch } from "@utils/useSearch";
let render = 0;

const Home = () => {
	console.log(render++, "rendercount");
	return (
		<>
			<Hero children={() => <MainSearch />} />
			<Accordian></Accordian>
			<Gallery />
			<GenerateAndDisplayData />
			<ContentLoader count={5} containerClassName='mb-4' />
			<div className='background'></div>
		</>
	);
};

export default Home;

const GenerateAndDisplayData = () => {
	const { data } = useSearch("nit");
	return (
		<div className='flex flex-col gap-2 '>
			<button className='text-center font-bold underline active:scale-95 transition-all duration-300 ease-in-out border-[#333] capitalize'>
				Generate me Dady!
			</button>
			{data && (
				<pre className='bg-[#333] text-white p-4 overflow-auto '>
					<code className='w-full block'>
						{JSON.stringify(data, null, 2)}
					</code>
				</pre>
			)}
		</div>
	);
};
