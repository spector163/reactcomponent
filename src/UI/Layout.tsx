import { Search } from "@components/Search";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<Header />
			<main className='mt-3 gap-2 px-[max(10px,2.5vw)] lg:px-[max(20px,5vw)]'>
				{children}
			</main>
			<Footer />
		</>
	);
};

export default Layout;

type NavItem = {
	title: string;
	children?: NavItem["title"][];
};
const NavList: NavItem[] = [
	{ title: "First" },
	{ title: "Second", children: ["firstchild", "secondChild", "thirdChild"] },
	{ title: "Third" },
	{ title: "Fourth" },
	{ title: "Fifth", children: ["firstchild", "secondChild", "thirdChild"] },
	{ title: "Sixth" },
	{ title: "Seventh" },
];

const Header = () => {
	return (
		<header className='h-24 flex items-center px-[max(10px,2.5vw)] lg:px-[max(20px,5vw)]'>
			<HamBurgarMenu />
			<Logo />
			<NavMenu />
			<Search />
		</header>
	);
};

const HamBurgarMenu = () => {
	return (
		<div className='flex flex-col w-8 gap-1 mr-3 md:hidden'>
			<span className='bg-black h-1'></span>
			<span className='bg-black h-1'></span>
			<span className='bg-black h-1'></span>
		</div>
	);
};

const Logo = () => (
	<div>
		<span className='font-extrabold text-3xl'>Logo</span>
	</div>
);
const NavMenu = () => {
	return (
		<nav className='ml-auto md:block hidden'>
			<ul className='flex items-center gap-4 uppercase '>
				{NavList.map((item, index) => (
					<NavItem item={item} key={index.toString()} />
				))}
			</ul>
		</nav>
	);
};

const CustomIcon = () => {
	return (
		<span className='group-hover:rotate-180 mt-0.5 cursor-pointer  origin-center transition-all duration-200 ease-out'>
			<svg width='20px' height='20px' viewBox='0 0 24 24'>
				<circle r='10' cx='50%' cy='50%' fill='#f4f4f4'></circle>
				<line
					x1='8'
					y1='16'
					x2='12'
					y2='8'
					stroke='black'
					strokeWidth='2px'
				></line>
				<line
					x2='16'
					y2='16'
					x1='12'
					y1='8'
					stroke='black'
					strokeWidth='2px'
				></line>
			</svg>
		</span>
	);
};
const DropDownMenu = ({ child }: { child: string[] }) => {
	return (
		<div className='absolute hidden group-hover:block right-0 top-full w-80  border'>
			<ul className='p-2 flex gap-1 flex-col bg-slate-400/70 text-[#ff6500]'>
				{child.map((child, index) => (
					<li
						key={index.toString()}
						className='p-1 border-b bg-white/90'
					>
						{child}
					</li>
				))}
			</ul>
		</div>
	);
};
const NavItem = ({ icon, item }: { icon?: ReactNode; item: NavItem }) => {
	return (
		<li className='flex items-center  gap-0.5 group relative'>
			<span className='leading-none cursor-pointer'>{item.title}</span>
			{icon || <CustomIcon />}
			{item.children && <DropDownMenu child={item.children} />}
		</li>
	);
};
const Footer = () => {
	return (
		<footer className='grid place-items-center min-h-[300px] border'>
			<span>footer </span>
		</footer>
	);
};
