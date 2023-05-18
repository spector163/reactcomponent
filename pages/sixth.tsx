import Link from "next/link";
import { memo, useCallback, useMemo, useState } from "react";

const Sixth = () => {
	return <DropDown />;
};

export default Sixth;

const Options = [
	{
		href: "/first",
		title: "First",
	},
	{
		href: "/second",
		title: "Second",
	},
	{
		href: "/third",
		title: "Third",
	},
];

const DropDown = () => {
	const [show, setShow] = useState(false);
	const handleCallback = useCallback(() => setShow((v) => !v), []);
	return (
		<div className='relative w-[min(90%,300px)] mx-auto my-[200px]'>
			<DropDownToggle onClick={handleCallback}></DropDownToggle>
			{show && <DropDownList />}
		</div>
	);
};

const DropDownList = () => {
	const listItem = useMemo(
		() =>
			Options.map((item, index) => (
				<DropDownItem
					key={index.toString()}
					href={item.href}
					title={item.title}
				/>
			)),
		[]
	);
	return (
		<ul className='flex flex-col absolute top-[90%] inset-0 bottom-auto bg-white p-2 border border-t-0'>
			{listItem}
		</ul>
	);
};

const DropDownItem = ({ href, title }: { href: string; title: string }) => {
	return (
		<li className='py-2 border-b last:border-b-0'>
			<Link href={href}>{title}</Link>
		</li>
	);
};

const DropDownToggle = memo(
	({ title, onClick }: { title?: string; onClick: () => void }) => {
		return (
			<button
				onClick={onClick}
				className='p-2 bg-[#dd6500] text-white font-semibold text-xl'
			>
				{title ?? "toggle me Daddy"}
			</button>
		);
	}
);
