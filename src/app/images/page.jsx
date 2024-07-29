"use client"

import s from "@/styles/globals.module.css";
import {EmptySpace} from "@/components/ui/EmptySpace";
import {ImageGrid} from "@/components/ImageGrid";
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
						<ImageGrid page={page} url={`https://api.pexels.com/v1/curated?per_page=10`}/>
						<EmptySpace/>
					</> : <SkeletonAlpha/>
				}
			</div>
		</>
	)
}
