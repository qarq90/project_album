"use client"

import {useRouter} from "next/navigation";
import s from "@/styles/components/search.module.css";
import {SearchIcon} from "../../public/icons/SearchIcon";
import {useState} from "react";

export const Searchbar = () => {

	const [search, setSearch] = useState("");
	const [hover, setHover] = useState(false);
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
			<div className={s.container}>
				<input
					className={s.search}
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onKeyDown={searchHandler}
					placeholder="Search for stunning free images and videos to inspire your projects..."
				/>
				<SearchIcon
					onMouseLeave={() => setHover(false)}
					onMouseEnter={() => setHover(true)}
					fill={hover ? "var(--primary-dark-color)" : "var(--primary-theme-color)"}
					className={s.icon}
					onClick={searchHandler}
				/>
			</div>
		</>
	);
};
