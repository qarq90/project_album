"use client";

import s from "@/styles/globals.module.css";
import {containerVariants} from "@/styles/animations/scale";
import {AnimatePresence, motion} from "framer-motion";
import {Button} from "@/components/ui/Button";
import {requestMedia} from "@/hooks/requestMedia";
import {SkeletonAlpha} from "@/components/SkeletonAlpha";
import {useEffect, useState} from "react";
import {Cell} from "@/components/ui/Cell";
import {EmptySpace} from "@/components/ui/EmptySpace";

export const GridVideo = (props) => {

	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(!props.isSearch ? Math.floor(Math.random() * 200) + 1 : 1);

	const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

	const fetchVideos = async () => {
		try {
			const data = await requestMedia(apiKey, `${props.url}&page=${page}`)
			setVideos(data.videos);
			setPage(page + 1)
		} catch (error) {
			console.error('Error fetching the videos:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchVideos().then(() => null);
	}, []);

	const loadMore = async () => {
		setPage(page + 1);
		try {
			const data = await requestMedia(apiKey, `${props.url}&page=${page}`);
			setVideos(prevVideos => [...prevVideos, ...data.videos]);
		} catch (error) {
			console.error('Error fetching videos:', error);
		}
	};

	return (
		<>
			{
				loading ? (
					<SkeletonAlpha isType={props.isType}/>
				) : (
					<>
						{props.isType ? <><span className={s.type}>VIDEOS</span><EmptySpace height={"24px"}/></> : <></>}
						<motion.div
							className={s.videoGrid}
							variants={containerVariants}
							initial="hidden"
							animate="visible"
						>
							<AnimatePresence>
								<div className={s.gridColumns}>
									{
										videos.length > 0 ? (
											videos.map((video, index) => {
												{
													return index % 3 === 2 ?
														(
															<Cell key={index} data={video} type={"video"}/>
														)
														:
														<></>
												}
											})
										) : (
											<div>Could not find any videos.</div>
										)
									}
								</div>
								<div className={s.gridColumns}>
									{
										videos.length > 0 ? (
											videos.map((video, index) => {
												{
													return index % 3 === 1 ?
														(
															<Cell key={index} data={video} type={"video"}/>
														)
														:
														<></>
												}
											})
										) : (
											<div>Could not find any videos.</div>
										)
									}
								</div>
								<div className={s.gridColumns}>
									{
										videos.length > 0 ? (
											videos.map((video, index) => {
												{
													return index % 3 === 0 ?
														(
															<Cell key={index} data={video} type={"video"}/>
														)
														:
														<></>
												}
											})
										) : (
											<div>Could not find any videos.</div>
										)
									}
								</div>
							</AnimatePresence>
						</motion.div>
					</>
				)
			}
			<Button onClick={loadMore} text="Load More"/>
		</>
	);
};
