"use client";

import s from "@/styles/globals.module.css";
import Link from "next/link";
import {containerVariants, itemVariants} from "@/styles/animations/scale";
import {AnimatePresence, motion} from "framer-motion";
import {Button} from "@/components/ui/Button";
import {getCellType, handleDownload, removeNameFromURL} from "@/lib/helperFunctions";
import {requestMedia} from "@/hooks/requestMedia";
import {SkeletonAlpha} from "@/components/SkeletonAlpha";
import {useEffect, useState} from "react";
import {FaDownload} from "react-icons/fa";

export const GridVideo = (props) => {

	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(!props.search ? Math.floor(Math.random() * 200) + 1 : 1);

	const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

	const fetchVideos = async () => {
		try {
			const data = await requestMedia(apiKey, `${props.url}&page=${page}`)
			setVideos(data.videos);
			setPage(page + 1)
		} catch (error) {
			console.error('Error fetching the images:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchVideos().then(() => null);
	}, []);

	const loadMore = async () => {
		setPage(page + 1);

		let url = `${props.url}&page=${page}`;

		try {
			const data = await requestMedia(apiKey, url);
			if (props.search) {
				setVideos(prevImages => [...prevImages, ...data.videos]);
			} else {
				setVideos(prevImages => [...prevImages, ...data.videos]);
			}
		} catch (error) {
			console.error('Error fetching images:', error);
		}
	};

	const downloadMedia = (video, type) => {
		let name = removeNameFromURL(video.url);
		let hdFile = video.video_files.find(file => file.quality === 'hd');
		if (hdFile) {
			let url = hdFile.link;
			handleDownload(url, type, name).then(() => null);
		} else {
			console.error('No UHD quality video found.');
		}
	};

	return (
		<>
			{
				loading ? (
					<SkeletonAlpha isHome={props.isHome}/>
				) : (
					<>
						{props.isHome ? <span className={s.type}>VIDEOS</span> : <></>}
						<motion.div
							className={s.videoGrid}
							variants={containerVariants}
							initial="hidden"
							animate="visible"
						>
							<AnimatePresence>
								{
									videos.length > 0 ? (
										videos.map((video, index) => {
											const cellType = getCellType(video.width, video.height);
											return (
												<motion.div
													key={video.id || index}
													className={`${s.cell} ${s[cellType]}`}
													variants={itemVariants}
													transition={{type: 'spring', stiffness: 300}}
												>
													<video
														className={s.cellContent}
														src={video.video_files[1].link}
														controls
														poster={video.image}
														onClick={(e) => e.preventDefault()}
													/>
													<div className={s.cellActions}>
														<div className={s.actionA}>
															<Link className={s.cellLink} href={`/video/${video.id}`}>
																Visit Video
															</Link>
														</div>
														<div className={s.actionB}>
															<span className={s.action}>
																	<FaDownload
																		onClick={() => downloadMedia(video, 'video')}/>
																</span>
														</div>
													</div>
												</motion.div>
											);
										})
									) : (
										<div>No videos available.</div>
									)
								}
							</AnimatePresence>
						</motion.div>
					</>
				)
			}
			<Button onClick={loadMore} text="Load More"/>
		</>
	);
};
