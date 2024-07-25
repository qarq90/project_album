"use client"

import Image from 'next/image';
import s from '@/styles/components/nav.module.css';
import {NavLeft, NavRight} from "@/lib/navHelper";
import Link from "next/link";
import CWZ from "/public/img/clockworkzombieFINAL.png";
import {SearchIcon} from "../../public/icons/SearchIcon";
import {useState} from "react";
import {useRouter} from "next/navigation";

export const Nav = () => {
	return (
		<>
			<div className={s.nav}>
				<Right/>
				<Middle/>
				<Left/>
			</div>
		</>
	);
};

const Right = () => {
	return (
		<>
			<div className={s.right + " " + s.container}>
				<Link href="/">
					<h2>project_album</h2>
				</Link>
				{NavLeft.map((item, index) => (
					<div key={index}>
						<Link href={item.href}>{item.text}</Link>
					</div>
				))}
			</div>
		</>
	);
};

const Left = () => {
	return (
		<>
			<div className={s.left + " " + s.container}>
				<Image className={s.img} src={CWZ} alt="Clockwork Zombie" width={50} height={50}/>
				{NavRight.map((item, index) => (
					<div key={index}>
						<Link href={item.href}>{item.text}</Link>
					</div>
				))}
			</div>
		</>
	);
};

const Middle = () => {

	const [search, setSearch] = useState("");
	const router = useRouter();

	const searchHandler = (e) => {
		if (e.type === 'keydown' && e.key === 'Enter') {
			e.preventDefault();
			router.push(`/search/${search}`);
		} else if (e.type === 'click') {
			router.push(`/search/${search}`);
		}
	};

	return (
		<>
			<div className={s.middle + " " + s.container}>
				<input
					className={s.search}
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onKeyDown={searchHandler}
					placeholder="What is on your mind today?"
				/>
				<SearchIcon onClick={searchHandler}/>
			</div>
		</>
	);
};
