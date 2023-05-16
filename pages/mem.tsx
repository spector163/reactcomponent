import Image from "next/image";
import { useEffect, useState } from "react";

const Memory = () => {
	return (
		<>
			<ExpensiveComponent />
			<ImageContainer />
			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit.
				Dolorem quae, adipisci, odio voluptate quas voluptatem, repellat
				laboriosam animi omnis fuga consequatur dignissimos laudantium
				debitis tenetur doloribus! Non at molestias id deserunt eaque
				officia iste ipsam distinctio ut esse veniam voluptas corporis
				facere accusantium aperiam laboriosam perspiciatis unde quos
				eum, saepe laudantium recusandae? Exercitationem debitis ab
				cumque consequuntur mollitia fugiat a vitae sequi perferendis
				neque ullam omnis adipisci maxime dolorem nisi consectetur
				architecto ipsa, hic sit. Ab alias perferendis provident
				recusandae eligendi nulla sed obcaecati accusantium quod error
				praesentium libero sequi officia, similique sit assumenda
				quaerat placeat voluptas asperiores repellendus sapiente.
			</p>
		</>
	);
};

export default Memory;

const ExpensiveComponent = () => {
	const [count, setCount] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => setCount((v) => v + 1), 1000);
		return () => clearInterval(interval);
	});
	return <div>{count}</div>;
};

const ImageContainer = () => {
	return (
		<div className='w-1/2 mx-auto'>
			<Image
				src='http://web.app.com/collegebatch-next/static/clg-gallery/aar-mahaveer-engineering-college-hyderabad-142913.jpg'
				alt='collegeimage'
				width={500}
				height={400}
				className='w-full h-full object-cover'
			/>
		</div>
	);
};
