"use client";

import VideoStore from "@/stores/VideoStore";
import s from "@/styles/home/home.module.css";
import Link from "next/link";
import {useEffect} from "react";
import {Button} from "@/components/ui/Button";
import {SkeletonAlpha} from "@/components/SkeletonAlpha";
import {useFetchMedia} from "@/hooks/useFetchMedia";
import {getCellType} from "@/lib/helperFunctions";

export const GridVideo = (props) => {

	const {loading, setPage, fetchData} = useFetchMedia(props.url, 'video');
	const {videoStore} = VideoStore();

	const loadMore = async () => {
		const newPage = Math.floor(Math.random() * 256) + 1;
		setPage(newPage);
		await fetchData(newPage,'video');
	};

	useEffect(() => {
		if (videoStore.length === 0) {
			const newPage = Math.floor(Math.random() * 256) + 1;
			fetchData(newPage,'video').then(() => console.log("Videos Fetched"));
		}
	}, [fetchData, videoStore.length]);

	return (
		<>
			{
				loading ? (
					<SkeletonAlpha/>
				) : (
					<div className={s.vidGrid}>
						{
							Array.isArray(videoStore) && videoStore.length > 0 ? (
								videoStore.map((video, index) => {
										const cellType = getCellType(video.width, video.height);
										return (
											<div key={index} className={`${s.cell} ${s[cellType]} ${s.vidCell}`}>
												<video
													className={s.img}
													src={video.video_files[0].link}
													controls
													poster={video.image}
													onClick={(e) => e.preventDefault()}
												/>
												<Link className={s.vidLink} href={`/video/${video.id}`}>
													Visit Video
												</Link>
											</div>
										);
									}
								)
							) : (
								<div>No videos available.</div>
							)}
					</div>
				)
			}
			<Button onClick={loadMore} text="Load More"/>
		</>
	);
};
