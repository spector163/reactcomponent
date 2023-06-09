import { Search } from "@components/Search";
import useScroll from "@utils/useScroll";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const Layout = ({ children }: { children: ReactNode }) => {
	const [show, setShow] = useState(false);
	const router = useRouter();

	return (
		<>
			<Header>
				<HamBurgarMenuButton
					toggleMenu={() => setShow((prev) => !prev)}
				/>
				<Logo />
				<NavMenu />
				{show && <MobileMenu closeMenu={() => setShow(false)} />}
				<AuthMenu
					dropdown={(show) => (show ? <DropDownMenuauth /> : null)}
				/>
				<Search />
			</Header>
			<main className='gap-2 '>{children}</main>
			<Footer />
		</>
	);
};

export default Layout;
const AuthMenu = ({ dropdown }: { dropdown: (show: boolean) => ReactNode }) => {
	const [show, setShow] = useState(false);
	return (
		<button className='relative' onClick={() => setShow(!show)}>
			<Image
				src='/vite.svg'
				alt='profile Pic'
				width={20}
				height={20}
				className='rounded-full bg-red-600'
			/>
			{dropdown(show)}
		</button>
	);
};

const DropDownMenuauth = () => {
	return (
		<div className='absolute   !top-full -left-1/2  border flex flex-col gap-3 justify-center bg-white w-max '>
			<span className='p-2 border-b'>profile</span>
			<span className='p-2 border-b'>logout</span>
		</div>
	);
};

type NavItem = {
	title: string;
	url?: string;
	children?: NavItem["title"][];
};
const NavList: NavItem[] = [
	{ title: "First", url: "/first" },
	{
		title: "Second",
		children: ["firstchild", "secondChild", "thirdChild"],
		url: "/second",
	},
	{ title: "Third", url: "/third" },
	{ title: "Fourth", url: "/fourth" },
	{
		title: "Fifth",
		url: "/fifth",
		children: ["firstchild", "secondChild", "thirdChild"],
	},
	{ title: "Sixth", url: "/sixth" },
	{ title: "Seventh", url: "/seventh" },
];

const Header = ({ children }: { children: ReactNode }) => {
	const scrolled = useScroll();
	return (
		<header
			className={`${
				scrolled ? "md:h-16" : "md:h-24"
			} h-[55px] flex items-center px-[max(10px,2.5vw)] lg:px-[max(20px,5vw)] border-b md:z-20 md:fixed md:top-0 w-full bg-white  transition-[height] duration-300 ease-in`}
		>
			{children}
		</header>
	);
};

const HamBurgarMenuButton = ({ toggleMenu }: { toggleMenu: () => void }) => {
	return (
		<div
			className='flex flex-col w-8 gap-1 mr-3 md:hidden cursor-pointer'
			onClick={toggleMenu}
		>
			<span className='bg-black h-1'></span>
			<span className='bg-black h-1'></span>
			<span className='bg-black h-1'></span>
		</div>
	);
};

const MobileMenu = ({ closeMenu }: { closeMenu: () => void }) => {
	return (
		<div className='grid grid-cols-[1fr,2fr] fixed top-0 inset-0 z-30'>
			<div className='bg-white'>
				<ul className='flex flex-col text-center gap-2 p-3 h-full'>
					<li>Lorem.</li>
					<li>Corporis</li>
					<li className='my-auto'>Illo</li>
					<li>Illo</li>
					<li className='mt-atuo'>Illo</li>
				</ul>
			</div>
			<div className='p-2 bg-[#000]/20 backdrop-blur-sm'>
				<button
					onClick={closeMenu}
					className='bg-green-600  block p-2 ml-auto text-white font-bold active:scale-95 transition-all duration-200'
				>
					<RxCross2 strokeWidth={"2"} />
				</button>
			</div>
		</div>
	);
};

const Logo = () => (
	<Link href={"/"}>
		<span className='font-extrabold text-3xl'>Logo</span>
	</Link>
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
		<Link
			className='flex items-center  gap-0.5 group relative'
			href={item.url ?? "#"}
		>
			<span className='leading-none cursor-pointer'>{item.title}</span>
			{icon || <CustomIcon />}
			{item.children && <DropDownMenu child={item.children} />}
		</Link>
	);
};
const Footer = () => {
	return (
		<footer className='grid place-items-center min-h-[300px] border'>
			<span>footer </span>
		</footer>
	);
};
