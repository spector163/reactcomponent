// type GalleryProps = {
// 	items: string[];
// };

import useIsMobile from "../utils/useIsMobile";

const Gallery = () => {
	const [isMobile] = useIsMobile();
	return <div>{isMobile ? "this is Mobile" : "this is desktop"}</div>;
};

export default Gallery;
