import {
	FormEvent,
	InputHTMLAttributes,
	SyntheticEvent,
	forwardRef,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { BiSearch } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import useIsMobile from "@utils/useIsMobile";

import { CSSTransition } from "react-transition-group";
import { Response, useSearch } from "@utils/useSearch";
import { useCursorPostion, useKeyHandle } from "../../pages/fourth";

export const Search = () => {
	const [show, setShow] = useState(false);

	const [isMobile] = useIsMobile(true);
	const [searchString, setSearchString] = useState("");
	const {
		data,
		isLoading: loading,
		isError: error,
	} = useSearch(searchString);

	const handleShow = useCallback(() => {
		setShow((v) => !v);
	}, []);
	const handleChange = useCallback((e: FormEvent<HTMLInputElement>) => {
		setSearchString(e.currentTarget.value);
	}, []);
	const clear = useCallback(() => {
		setSearchString("");
	}, []);
	const handleSubmit = useCallback(
		(e: SyntheticEvent) => e.preventDefault(),
		[]
	);
	return (
		<>
			{isMobile ? null : (
				<div
					className={`bg-slate-500 hover:bg-red-700 rounded-[3px] ${
						show && "rounded-l-none"
					} transition-all duration-300 group relative`}
				>
					<SearchIcon cb={handleShow} />
					<SearchBox
						isVisible={show}
						name='search'
						onChange={handleChange}
						onClear={clear}
						onSubmit={handleSubmit}
						value={searchString}
						ref={(input) => input && input.focus()}
					/>
					{searchString && (
						<div className='absolute top-full right-full w-[700px] border border-t-0 group bg-white p-1'>
							{loading ? (
								<Skeleton count={10} height={40} />
							) : error ? (
								<div>error on you way hold on</div>
							) : (
								<DisplayResult list={data} />
							)}
						</div>
					)}
				</div>
			)}
		</>
	);
};

const SearchIcon = ({ cb }: { cb: () => void }) => {
	return (
		<button
			className='block p-3 group-hover:text-white transition-all duration-300 text-xl'
			onClick={cb}
		>
			<BiSearch strokeWidth={"1px"} />
		</button>
	);
};

export const DisplayResult = ({ list }: { list: Response[] }) => {
	const pos = useCursorPostion(list.length);
	const Enter = useKeyHandle("Enter");
	useEffect(() => {
		Enter &&
			console.log(
				"Enter key was pressed it seems changed it status",
				list[pos]
			);
	}, [Enter]);
	return (
		<ul>
			{list.length > 0 ? (
				list.map((item, index) => (
					<li
						key={index.toString()}
						className={`p-2 border-b text-white bg-[#ff6500] last:border-b-0 transition-all duration-300 ease-in-out ${
							pos == index
								? "grayscale-0 "
								: "grayscale  bg-[#222]"
						}`}
					>
						{item.value}
					</li>
				))
			) : (
				<div>you search reveled no result</div>
			)}
		</ul>
	);
};

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	onSubmit: (e: SyntheticEvent) => void;
	onClear: (e: SyntheticEvent) => void;
	onChange: (e: FormEvent<HTMLInputElement>) => void;
	isVisible: boolean;
	name: string;
	value: string;
}

export const SearchBox = forwardRef<HTMLInputElement, SearchProps>(
	({ onSubmit, onClear, value, isVisible, ...rest }, ref) => {
		const nodref = useRef(null);

		return (
			<CSSTransition
				in={isVisible}
				nodeRef={nodref}
				mountOnEnter
				unmountOnExit
				timeout={{ enter: 0, exit: 500 }}
				classNames='my-search'
			>
				<form
					className='bg-white overflow-hidden  absolute w-[700px] inset-0 left-auto right-full h-full border-r-0 border'
					noValidate
					role='search'
					ref={nodref}
					onSubmit={onSubmit}
				>
					<input
						id='search'
						className='text-heading outline-none indent-2 w-full h-full placeholder-gray-400 text-sm lg:text-base'
						// className='absolute inset-0 indent-2 left-auto right-full w-[700px] h-full border-r-0 border'
						placeholder='Search here...'
						aria-label='Search'
						autoComplete='off'
						ref={ref}
						value={value}
						onKeyDown={(e) =>
							(e.key == "ArrowUp" || e.key == "ArrowDown") &&
							e.preventDefault()
						}
						onKeyUp={(e) =>
							(e.key == "ArrowUp" || e.key == "ArrowDown") &&
							e.preventDefault()
						}
						{...rest}
					/>
					{value && (
						<button
							className='absolute inset-0.5 left-auto px-2 bg-[#f4f4f4]  font-bold text-md'
							onClick={onClear}
						>
							X
						</button>
					)}
				</form>
			</CSSTransition>
		);
	}
);
