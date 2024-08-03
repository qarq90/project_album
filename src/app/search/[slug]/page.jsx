"use client";

import g from "@/styles/globals.module.css";
import s from "@/styles/globals.module.css";
import {GridVideo} from "@/components/GridVideo";
import {GridImage} from "@/components/GridImage";
import {EmptySpace} from "@/components/ui/EmptySpace";
import {useRouter} from "next/navigation";
import {useFetchUser} from "@/hooks/useFetchUser";
import {useEffect} from "react";

export default function Page({params}) {

	const slug = params.slug;

	const router = useRouter();

	const fetchUser = useFetchUser(router);

	useEffect(() => {
		fetchUser().then(() => null)
	}, [fetchUser]);

	return (
		<div className={g.wrapper}>
			<GridImage isType={true} isSearch={true} url={`https://api.pexels.com/v1/search?query=${slug}&per_page=10`}/>
			<EmptySpace height={"48px"}/>
			<GridVideo isType={true} isSearch={true} url={`https://api.pexels.com/videos/search?query=${slug}&per_page=10`}/>
			<EmptySpace height={"48px"}/>
		</div>
	);
}
