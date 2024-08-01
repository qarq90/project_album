"use client";

import s from "@/styles/components/search.module.css";
import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {SearchIcon} from "../../public/icons/SearchIcon";
import {RefreshIcon} from "../../public/icons/RefreshIcon";
import {useFetchMedia} from "@/hooks/useFetchMedia";
import ImageStore from "@/stores/ImageStore";
import VideoStore from "@/stores/VideoStore";

export const Searchbar = () => {
	const pathname = usePathname();
	let currentPage = '';

	const {imageStore, setImageStore} = ImageStore();
	const {videoStore, setVideoStore} = VideoStore();

	const {refreshData} = useFetchMedia();

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
		switch (pathname) {
			case '/images':
				currentPage = 'images';
				setImageStore([])
				await refreshData(currentPage).then(() => console.log("Refreshed"));
				console.log(imageStore)
				break;
			case '/videos':
				currentPage = 'videos';
				setVideoStore([])
				await refreshData(currentPage).then(() => console.log("Refreshed"));
				break;
			case '/':
				currentPage = 'home';
				setImageStore([])
				setVideoStore([])
				await refreshData(currentPage).then(() => console.log("Refreshed"));
				break;
			default:
				break
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
			</div>
		</>
	);
};
