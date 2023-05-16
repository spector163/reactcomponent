import Image from "next/image";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { DisplayResult } from "./Search";
import Skeleton from "react-loading-skeleton";
import { useSearch } from "@utils/useSearch";
import useIsMobile from "@utils/useIsMobile";

const Hero = ({
	children,
}: {
	children: (position: number) => JSX.Element;
}) => {
	const [slide, setSlide] = useState(0);
	return (
		<div className='h-[253px] md:h-screen relative'>
			<Image
				src={
					"http://172.27.160.1:80/collegebatch-next/slider/slide2.jpg"
				}
				alt='college'
				width={1200}
				height={700}
				priority
				className='w-full h-full object-cover'
			/>
			{children(slide)}
		</div>
	);
};

export default Hero;

export const MainSearch = () => {
	const [searchString, setSearchString] = useState("");
	const { data, isLoading: loading } = useSearch(searchString);
	return (
		<form
			className={`bg-white w-[min(90%,700px)] z-10 absolute inset-0 m-auto h-max transition-all duration-300 ease-in-out outline outline-[10px] md:outline-[50px] outline-[#333]/50 md:translate-y-[50px]`}
		>
			<label
				htmlFor='search'
				className='flex border focus-within:border-[#006599] border-[#ff6500] transition-all duration-300 ease-in group focus-within:shadow-[0_0_15px_2px] focus-within:shadow-[#006599]'
			>
				<input
					id='search'
					className='flex-1 focus-visible:outline-none indent-2 uppercase text-xl font-medium text-[#333]/80'
					autoComplete='off'
					value={searchString}
					onChange={(e) => setSearchString(e.currentTarget.value)}
				/>
				<span className='self-center p-3 pl-3.5 group-focus-within:bg-[#006599] bg-[#ff6500] hover:bg-[#ff6500]/80 transition-all duration-300 cursor-pointer ease-out'>
					<BiSearch size={24} fill='#fff' />
				</span>
				{searchString && (
					<div className='absolute  top-full inset-0 bottom-auto border border-t-0 group bg-white p-1'>
						{loading ? (
							<Skeleton count={10} height={40} />
						) : (
							<DisplayResult list={data} />
						)}
					</div>
				)}
			</label>
		</form>
	);
};
