import { faker } from "@faker-js/faker";
import { useState } from "react";

const Genratelist = () => {
	const [number, setNumber] = useState<string>("");

	return (
		<div>
			<input value={number} onChange={(e) => setNumber(e.target.value)} />
		</div>
	);
};

export default Genratelist;
