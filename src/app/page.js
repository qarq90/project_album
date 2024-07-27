"use client"

import s from "@/styles/globals.module.css"
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {ImageGrid} from "@/components/ImageGrid";
import {VideoGrid} from "@/components/VideoGrid";
import {EmptySpace} from "@/components/ui/EmptySpace";
import {Skeleton} from "@/components/Skeleton";
import {useFetchUser} from "@/hooks/fetchUser";
import {useFetchPage} from "@/hooks/fetchPage";

export default function Page() {

	const router = useRouter();

	const fetchUser = useFetchUser(router);

	const {loading, page} = useFetchPage();

	useEffect(() => {
		fetchUser()
	}, []);

	return (
		<>
			<div className={s.wrapper}>
				{
					loading ? <>
						<span className={s.type}>IMAGES</span>
						<EmptySpace/>
						<ImageGrid page={page} url={`https://api.pexels.com/v1/curated?per_page=10`}/>
						<EmptySpace/>
						<span className={s.type}>VIDEOS</span>
						<EmptySpace/>
						<VideoGrid page={page} url={`https://api.pexels.com/videos/popular?per_page=10`}/>
					</> : <>
						<span className={s.type}>IMAGES</span>
						<EmptySpace/>
						<Skeleton/>
						<span className={s.type}>VIDEOS</span>
						<EmptySpace/>
						<Skeleton/>
					</>
				}
			</div>
		</>
	);
};
