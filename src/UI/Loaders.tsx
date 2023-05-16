import classNames from "classnames";

type Props = {
	count?: number;
	containerClassName?: string;
	elemClassName?: string;
	animate?: boolean;
};

export const ContentLoader: React.FC<Props> = (props) => {
	const {
		count = 1,
		containerClassName,
		elemClassName,
		animate = true,
	} = props;
	return (
		<div
			className={classNames(
				containerClassName,
				"flex w-full flex-col gap-2"
			)}
		>
			{Array.from({ length: count }).map((i, j) => (
				<span
					key={j.toString()}
					className={classNames(
						elemClassName,
						`flex flex-col gap-2 h-12  bg-gradient-to-r from-indigo-500 from-10% via-fuchsia-300 via-50% to-indigo-500 to-80% bg-[length:200%]  ${
							animate && "animate-[wiggle_1.5s_linear_infinite]"
						}`
					)}
				></span>
			))}
		</div>
	);
};
