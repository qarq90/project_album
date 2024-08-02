"use client";

import s from "@/styles/components/search.module.css";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {SearchIcon} from "../../public/icons/SearchIcon";
import {RefreshIcon} from "../../public/icons/RefreshIcon";
import {motion} from "framer-motion";
import {itemVariants} from "@/styles/animations/scale";

export const Searchbar = () => {

	const router = useRouter();

	const [search, setSearch] = useState("");
	const [searchHover, setSearchHover] = useState(false);
	const [refreshHover, setRefreshHover] = useState(false);

	const searchHandler = (e) => {
		if (e.type === 'keydown' && e.key === 'Enter') {
			e.preventDefault();
			router.push(`/search/${search}`);
		} else if (e.type === 'click') {
			router.push(`/search/${search}`);
		}
	};

	const refreshHandler = async (e) => {
		e.preventDefault();
	};

	return (
		<>
			<motion.div
				className={s.container}
				variants={itemVariants}
				initial="hidden"
				animate="visible"
				transition={{type: 'spring', stiffness: 300}}
			>
				<input
					className={s.search}
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onKeyDown={searchHandler}
					placeholder="Search for stunning free images and videos to inspire your projects..."
				/>
				<SearchIcon
					onMouseLeave={() => setSearchHover(false)}
					onMouseEnter={() => setSearchHover(true)}
					fill={searchHover ? "var(--primary-dark-color)" : "var(--primary-theme-color)"}
					className={s.icon}
					onClick={searchHandler}
				/>
				<RefreshIcon
					onMouseLeave={() => setRefreshHover(false)}
					onMouseEnter={() => setRefreshHover(true)}
					fill={refreshHover ? "var(--primary-dark-color)" : "var(--primary-theme-color)"}
					className={s.icon}
					onClick={refreshHandler}
				/>
			</motion.div>
		</>
	);
};
