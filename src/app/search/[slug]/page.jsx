"use client";

import g from "@/styles/globals.module.css";
import s from "@/styles/globals.module.css";
import {VideoGrid} from "@/components/VideoGrid";
import {ImageGrid} from "@/components/ImageGrid";
import {EmptySpace} from "@/components/ui/EmptySpace";

export default function Page({params}) {

	const slug = params.slug;

	return (
		<div className={g.wrapper}>
			<span className={g.type}>IMAGES</span>
			<EmptySpace/>
			<ImageGrid url={`https://api.pexels.com/v1/search?query=${slug}&per_page=10`}/>
			<EmptySpace/>
			<span className={s.type}>VIDEOS</span>
			<EmptySpace/>
			<VideoGrid url={`https://api.pexels.com/videos/search?query=${slug}&per_page=10`}/>
		</div>
	);
}
