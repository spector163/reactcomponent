import { useEffect, useRef, useState } from "react";

const Yash = () => {
	return (
		<div className='grid min-h-screen place-items-center'>
			<Input />
		</div>
	);
};

export default Yash;

const Input = () => {
	const [value, setValue] = useState("");
	const ref = useRef<HTMLInputElement>(null);
	// useEffect(() => {
	// 	const handleKeyDown = (e: KeyboardEvent) => {
	// 		if (e.key == "ArrowUp") {
	// 			console.log("i ran you press ArrowUp");
	// 			e.stopImmediatePropagation();
	// 		}
	// 	};
	// 	ref.current?.addEventListener("keyup", handleKeyDown);
	// 	return () => {
	// 		ref.current?.removeEventListener("keyup", handleKeyDown);
	// 	};
	// }, []);
	return (
		<div>
			<label htmlFor=''></label>
			<input
				className='border border-green-800 indent-3 font-bold text-2xl p-2'
				value={value}
				onChange={(e) => setValue(e.target.value)}
				ref={ref}
				onKeyDown={(e) =>
					(e.key == "ArrowUp" || e.key == "ArrowDown") &&
					e.preventDefault()
				}
				onKeyUp={(e) =>
					(e.key == "ArrowUp" || e.key == "ArrowDown") &&
					e.preventDefault()
				}
			/>
		</div>
	);
};
