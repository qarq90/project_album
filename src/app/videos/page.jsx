"use client"

import s from "@/styles/globals.module.css";
import {EmptySpace} from "@/components/ui/EmptySpace";
import {GridVideo} from "@/components/GridVideo";
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
				<GridVideo isType={false} isSearch={false} url={`https://api.pexels.com/videos/popular?per_page=6`}/>
				<EmptySpace height={"24px"}/>
			</div>
		</>
	)
}
