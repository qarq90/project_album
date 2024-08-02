"use client"

import s from "@/styles/globals.module.css";
import {EmptySpace} from "@/components/ui/EmptySpace";
import {GridImage} from "@/components/GridImage";
import {useRouter} from "next/navigation";
import {useFetchUser} from "@/hooks/useFetchUser";
import {useEffect} from "react";

export default function Page() {

	const router = useRouter();

	const fetchUser = useFetchUser(router);

	useEffect(() => {
		fetchUser().then(() => null)
	}, [fetchUser]);

	return (
		<>
			<div className={s.wrapper}>
				<GridImage isHome={false} url={`https://api.pexels.com/v1/curated?per_page=8`}/>
				<EmptySpace/>
			</div>
		</>
	)
}
