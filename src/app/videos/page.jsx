"use client"

import s from "@/styles/globals.module.css";
import {EmptySpace} from "@/components/ui/EmptySpace";
import {VideoGrid} from "@/components/VideoGrid";
import {SkeletonAlpha} from "@/components/SkeletonAlpha";
import {useFetchPage} from "@/hooks/fetchPage";
import {useRouter} from "next/navigation";
import {useFetchUser} from "@/hooks/fetchUser";
import {useEffect} from "react";

export default function Page() {

	const {loading, page} = useFetchPage();

	const router = useRouter();

	const fetchUser = useFetchUser(router);

	useEffect(() => {
		fetchUser()
	}, [fetchUser]);

	return (
		<>
			<div className={s.wrapper}>
				{
					loading ? <>
						<VideoGrid page={page} url={`https://api.pexels.com/videos/popular?per_page=20`}/>
						<EmptySpace/>
					</> : <SkeletonAlpha/>
				}
			</div>
		</>
	)
}
