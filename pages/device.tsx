import { useDeviceType } from "@utils/useIsMobile";
import React, { useEffect, useRef, useState } from "react";

const Device = () => {
	const device = useDeviceType();
	return (
		<div className='p-[max(1rem,2vw)] mt-[150px] border '>
			<h1 className='mb-3 text-center '>Current Device: {device}</h1>
			<Grid />
			<hr />
			<CustomGrid />
		</div>
	);
};

export default Device;

const Grid = () => {
	return (
		<div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-1  sm:gap-2 md:gap-3 lg:gap-4 '>
			<Container />
			<Container />
			<Container />
			<Container />
		</div>
	);
};
const Container = () => {
	const [width, setWidth] = useState<null | number>(null);
	const nodeRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const custom = () => {
			nodeRef.current && setWidth(nodeRef.current.offsetWidth);
		};
		custom();
		window.addEventListener("resize", custom);
		return () => window.removeEventListener("resize", custom);
	}, []);
	return (
		<span
			className='h-[200px] border flex justify-center items-center'
			ref={nodeRef}
		>
			{width}
		</span>
	);
};

const CustomGrid = () => {
	const device = useDeviceType("TABLET");
	return (
		<div>
			<h2>{device}</h2>
			<div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-1  sm:gap-2 md:gap-3 lg:gap-4 '>
				<Container />
				<Container />
				<Container />
				<Container />
			</div>
		</div>
	);
};
