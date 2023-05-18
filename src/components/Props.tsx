import { ComponentPropsWithRef } from "react";

interface buttonProps extends ComponentPropsWithRef<"button"> {
	isOpen: boolean;
	classname: string;
}

const CustomButton = (props: buttonProps) => {
	const { isOpen, onClick, className } = props;
};

const Props = () => {
	return <div>Props</div>;
};

export default Props;
