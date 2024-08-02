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
		fetchUser().then(() => null)
	}, [fetchUser]);

	return (
		<>
			<div className={s.wrapper}>
				<EmptySpace/>
				<GridImage isHome={true} search={false} url={`https://api.pexels.com/v1/curated?per_page=6`}/>
				<EmptySpace/>
				<EmptySpace/>
				<EmptySpace/>
				<GridVideo isHome={true} search={false} url={`https://api.pexels.com/videos/popular?per_page=6`}/>
				<EmptySpace/>
				<EmptySpace/>
			</div>
		</>
	);
};
