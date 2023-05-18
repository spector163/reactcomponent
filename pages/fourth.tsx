import { Search } from "@components/Search";
import { ReactNode, useEffect, useState } from "react";

const Yash = () => {
	return (
		<div className='w-[min(300px,90%)] mx-auto border my-[200px]'>
			<Exmaple>
				<Search />
			</Exmaple>
		</div>
	);
};

const Exmaple = ({ children }: { children: ReactNode }) => {
	const [show, setShow] = useState(false);
	const pos = useCursorPostion(20);
	console.table(pos);
	return (
		<div>
			<button onClick={() => setShow(!show)}>
				click me to toggle the child
			</button>
			{show && children}
		</div>
	);
};

export const useCursorPostion = (length: number, starting?: number) => {
	const [cursor, setCursor] = useState(starting ?? 0);
	const pressed = useKeyHandle("ArrowDown");
	const Arrowpressed = useKeyHandle("ArrowUp");

	useEffect(() => {
		pressed && setCursor((v) => (v < length - 1 ? cursor + 1 : v));
	}, [pressed]);
	useEffect(() => {
		Arrowpressed && setCursor((v) => (v > 0 ? cursor - 1 : v));
	}, [Arrowpressed]);

	return cursor;
};

export default Yash;
const ListOptions = [
	{
		label: "First",
		value: "first Item",
	},

	{
		label: "Second ",
		value: "second Item",
	},

	{
		label: "Third ",
		value: "third Item",
	},

	{
		label: "Fourth Item",
		value: "fourth Item",
	},

	{
		label: "Fifth Item",
		value: "fifth Item",
	},
];

// 	activeIndex,
// 	list,
// }: {
// 	activeIndex: number;
// 	list: typeof ListOptions;
// }) => {
// 	const focuesdref = useRef<number>(0);
// 	const [value, setValue] = useState("");

// 	useEffect(() => {
// 		console.log("triggred", value);
// 		setList(
// 			ListOptions.filter((item, _) => item.value.includes(value.trim()))
// 		);
// 	}, [value]);

// 	return (
// 		<ul className='w-[min(300px,90%)] mx-auto border p-5 rounded'>
// 			<input
// 				type='text'
// 				name='search'
// 				value={value}
// 				onChange={(e) => setValue(e.target.value)}
// 			/>
// 			{list.map((item, index) => (
// 				<li
// 					key={item.value}
// 					className={`p-2 border-b last:border-b-0 ${
// 						focuesdref.current == index && "bg-[#ff6500] text-white"
// 					}`}
// 				>
// 					{item.label}
// 				</li>
// 			))}
// 		</ul>
// 	);
// };
//handle keyup and keydown for both up and down with enter having special meaning

export const useKeyHandle = (targetKey: string) => {
	const [pressed, setPressed] = useState(false);
	useEffect(() => {
		const handlekeyPressdown = (e: KeyboardEvent) => {
			setPressed(targetKey == e.key && true);
			e.stopPropagation();
		};
		const handlekeyPressup = (e: KeyboardEvent) => {
			setPressed(targetKey == e.key && false);
			e.stopPropagation();
		};
		window.addEventListener("keyup", handlekeyPressup);
		window.addEventListener("keydown", handlekeyPressdown);
		return () => {
			window.removeEventListener("keyup", handlekeyPressup);
			window.removeEventListener("keydown", handlekeyPressdown);
		};
	}, []);
	return pressed;
};
