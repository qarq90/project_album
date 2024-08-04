"use client";

import s from "@/styles/components/search.module.css";
import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {SearchIcon} from "../../public/icons/SearchIcon";
import {RefreshIcon} from "../../public/icons/RefreshIcon";
import {motion} from "framer-motion";
import {itemVariants} from "@/styles/animations/scale";
import {ClearIcon} from "../../public/icons/ClearIcon";
import ImageStore from "@/stores/ImageStore";
import VideoStore from "@/stores/VideoStore";

export const Searchbar = () => {

	const router = useRouter();

	const [search, setSearch] = useState("");
	const [searchHover, setSearchHover] = useState(false);
	const [refreshHover, setRefreshHover] = useState(false);
	const [clearHover, setClearHover] = useState(false);

	const { setImageFetcher } = ImageStore();
	const { setVideoFetcher } = VideoStore();

	const searchHandler = (e) => {
		if (e.type === "keydown" && e.key === "Enter") {
			e.preventDefault();
			router.push(`/search/${search}`);
		} else if (e.type === "click") {
			router.push(`/search/${search}`);
		}
	};

	const refreshHandler = async (e) => {
		e.preventDefault();
		setImageFetcher(true);
		setVideoFetcher(true);
		router.refresh();
	};

	const clearHandler = (e) => {
		e.preventDefault();
		setSearch("");
	};

	const icons = [
		{
			component: SearchIcon,
			hover: searchHover,
			setHover: setSearchHover,
			onClick: searchHandler,
		},
		{
			component: ClearIcon,
			hover: clearHover,
			setHover: setClearHover,
			onClick: clearHandler,
		},
		{
			component: RefreshIcon,
			hover: refreshHover,
			setHover: setRefreshHover,
			onClick: refreshHandler,
		},
	];

	return (
		<>
			<motion.div
				className={s.container}
				variants={itemVariants}
				initial="hidden"
				animate="visible"
				transition={{type: "spring", stiffness: 300}}
			>
				<input
					className={s.search}
					type="text"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onKeyDown={searchHandler}
					placeholder="Search for stunning free images and videos to inspire your projects..."
				/>
				{
					icons.map((icon, index) => {
						const IconComponent = icon.component;
						return (
							<IconComponent
								key={index}
								onMouseLeave={() => icon.setHover(false)}
								onMouseEnter={() => icon.setHover(true)}
								fill={
									icon.hover
										? "var(--primary-dark-color)"
										: "var(--primary-theme-color)"
								}
								className={s.icon}
								onClick={icon.onClick}
							/>
						);
					})
				}
			</motion.div>
		</>
	);
};
