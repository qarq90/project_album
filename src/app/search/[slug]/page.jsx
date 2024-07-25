"use client";

import g from "@/styles/globals.module.css";
import {Grid} from "@/components/Grid";

export default function Page({params}) {

	const slug = params.slug;

	return (
		<div className={g.wrapper}>
			<Grid url={`https://api.pexels.com/v1/search?query=${slug}&per_page=30`}/>
		</div>
	);
}
