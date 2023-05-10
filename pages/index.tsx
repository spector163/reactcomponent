import Gallery from "@components/Gallery";
import Accordian from "@components/Accordian";
import { useSearch } from "@components/Search";

let render = 0;
const Home = () => {
	console.log(render++, "rendercount");
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
	const { data } = useSearch("nit");
	return (
		<div className='flex flex-col gap-2 '>
			<button
				className='text-center font-bold underline active:scale-95 transition-all duration-300 ease-in-out border-[#333] capitalize'
				// onClick={handleClick}
			>
				Generate me Dady!
			</button>
			{data && (
				<pre className='bg-[#333] text-white p-4 overflow-auto '>
					<code className='w-full block'>
						{JSON.stringify(data.data, null, 2)}
					</code>
				</pre>
			)}
		</div>
	);
};
