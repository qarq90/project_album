"use client"

import s from "@/styles/globals.module.css"
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {EmptySpace} from "@/components/ui/EmptySpace";
import {useFetchUser} from "@/hooks/useFetchUser";
import {GridImage} from "@/components/GridImage";
import {GridVideo} from "@/components/GridVideo";

export default function Page() {

	const router = useRouter();

	const fetchUser = useFetchUser(router);

	useEffect(() => {
		fetchUser()
	}, [fetchUser]);

	return (
		<>
			<div className={s.wrapper}>
				<span className={s.type}>IMAGES</span>
				<EmptySpace/>
				<GridImage url={`https://api.pexels.com/v1/curated?per_page=4`}/>
				<EmptySpace/>
				<EmptySpace/>
				<span className={s.type}>VIDEOS</span>
				<EmptySpace/>
				<GridVideo url={`https://api.pexels.com/videos/popular?per_page=4`}/>
				<EmptySpace/>
				<EmptySpace/>
			</div>
		</>
	);
};
