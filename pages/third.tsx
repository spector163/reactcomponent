import { useState } from "react";

const Yash = () => {
	const [formData, setFormData] = useState({
		first: "",
		second: "",
	});
	const SetFirstValue = (input: string) => {
		setFormData((v) => ({ ...v, first: input }));
	};

	const setSecondValue = (input: string) => {
		setFormData((v) => ({ ...v, second: input }));
	};
	return (
		<div className='grid min-h-screen place-items-center'>
			<form
				className='w-[min(90%,400px)] bg-white border p-2 rounded shadow-2xl flex flex-col gap-5'
				onSubmit={(e) => e.preventDefault()}
			>
				<Input
					name='first'
					value={formData.first}
					setValue={SetFirstValue}
				/>
				<Input
					name='second'
					value={formData.second}
					setValue={setSecondValue}
				/>
				<button>Submit</button>
			</form>
			<pre className='min-w-0'>
				<code>{JSON.stringify(formData)}</code>
			</pre>
		</div>
	);
};

export default Yash;

const Input = ({
	setValue,
	value,
	name,
}: {
	setValue: (input: string) => void;
	value: string;
	name: string;
}) => {
	return (
		<input
			value={value}
			onChange={(e) => setValue(e.target.value)}
			name={name}
		/>
	);
};
