import { ReactNode, useReducer, useRef } from "react";
import { CSSTransition } from "react-transition-group";

const Accordian = () => {
	return (
		<div className='w-[min(95%,500px)]'>
			<h1 className='text-center font-bold text-2xl underline'>
				Accordian
			</h1>
			<MyAccordian items={Options} />
		</div>
	);
};
const Options = [
	{
		label: "First",
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem laboriosam obcaecati molestiae reprehenminima pariatur reiciendis doloremque neque nostrum. Similique, quidem vero!",
	},
	{
		label: "Second",
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem laboriosam obcaecati molestiae reprehenderit minus perferendis, doloribus repudiandae vitae nobis cum ipsa possimus sapiente incidunt eveniet mollitiariatur reiciendis doloremque neque nostrum. Similique, quidem vero!",
	},
	{
		label: "Third",
		content:
			"Lorem ipsum dolor sum voluptatem quia maiores, quisquam a soluta tempore dolorum expedita minima pariatur reiciendis doloremque neque nostrum. Similique, quidem vero!",
	},
];

export default Accordian;

type State = number[];
type Item = {
	label: string;
	content: string;
};
type ItemArray = Item[];
type Action = { type: "OpenIndex"; value: number };
type ReducorType = (state: State, action: Action) => number[];

const Reducor = (state: State, action: Action) => {
	switch (action.type) {
		case "OpenIndex": {
			const closing = state.includes(action.value);
			return closing
				? state.filter((v) => v !== action.value)
				: [...state, action.value];
		}
	}
};
const SingleReducor = (state: State, action: Action) => {
	switch (action.type) {
		case "OpenIndex": {
			const closing = state.includes(action.value);
			if (!closing) {
				return [action.value];
			}
		}
	}
};
const PreventlastClose = (state: State, action: Action) => {
	switch (action.type) {
		case "OpenIndex": {
			const closing = state.includes(action.value);
			const isLast = state.length < 2;
			if (closing && isLast) {
				return state;
			}
		}
	}
};

const useAccordian = ({ reducor = Reducor } = {}): [
	state: number[],
	toggleIndex: (index: number) => void
] => {
	const [state, dispatch] = useReducer(reducor, [0]);

	const toggleIndex = (index: number) =>
		dispatch({ type: "OpenIndex", value: index });

	return [state, toggleIndex];
};

const CombineReducor = (...reducors: ReducorType[]) => {
	return (state: State, action: Action) => {
		for (const singleOne of reducors) {
			const result = singleOne(state, action);
			if (result) return result;
		}
	};
};

const MyAccordian = ({ items }: { items: ItemArray }) => {
	const [OpenIndexs, toggleIndex] = useAccordian({
		reducor: CombineReducor(
			SingleReducor as ReducorType,
			PreventlastClose as ReducorType,
			Reducor
		) as ReducorType,
	});
	return (
		<div className='w-[min(90%,500px)]'>
			{items.map((item, index) => (
				<AccordianItem key={index}>
					<AccordianButton onClick={() => toggleIndex(index)}>
						{item.label}
						<span
							className={`transition-transform duration-300 ease-out ${
								OpenIndexs.includes(index) && "rotate-[270deg]"
							}`}
						>
							👈
						</span>
					</AccordianButton>
					<AccordianContent isOpen={OpenIndexs.includes(index)}>
						{item.content}
					</AccordianContent>
				</AccordianItem>
			))}
		</div>
	);
};

const AccordianItem = ({ children }: { children: ReactNode }) => {
	return <div className='flex flex-col gap-1'>{children}</div>;
};
const AccordianButton = ({
	children,
	onClick,
}: {
	children: ReactNode;
	onClick: () => void;
}) => {
	return (
		<button
			className='flex justify-between px-4 bg-[#d43ffe] py-2'
			onClick={onClick}
		>
			{children}
		</button>
	);
};

const AccordianContent = ({
	isOpen,
	children,
}: {
	isOpen: boolean;
	children: ReactNode;
}) => {
	const nodeRef = useRef(null);

	return (
		<CSSTransition
			in={isOpen}
			unmountOnExit
			timeout={{ appear: 0, exit: 200 }}
			ref={nodeRef}
			classNames='my-node'
		>
			<div ref={nodeRef} className='bg-[#eee]/80 grid text-black'>
				<p className={`overflow-hidden px-2 ${isOpen && "py-2"}`}>
					{children}
				</p>
			</div>
		</CSSTransition>
	);
};
