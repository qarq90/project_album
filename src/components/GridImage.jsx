"use client";

import s from "@/styles/globals.module.css";
import Link from "next/link";
import {AnimatePresence, motion} from "framer-motion";
import {containerVariants, itemVariants} from "@/styles/animations/scale";
import {Button} from "@/components/ui/Button";
import {getCellType, handleDownload} from "@/lib/helperFunctions";
import {requestMedia} from "@/hooks/requestMedia";
import {SkeletonAlpha} from "@/components/SkeletonAlpha";
import {useEffect, useState} from "react";
import {FaDownload} from "react-icons/fa";

export const GridImage = (props) => {

	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(!props.search ? Math.floor(Math.random() * 200) + 1 : 1);

	const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY
	const fetchImages = async () => {
		try {
			const data = await requestMedia(apiKey, `${props.url}&page=${page}`)
			setImages(data.photos);
			setPage(page + 1)
		} catch (error) {
			console.error('Error fetching the images:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchImages().then(() => null);
	}, []);

	const loadMore = async () => {
		setPage(page + 1);

		let url = `${props.url}&page=${page}`;

		try {
			const data = await requestMedia(apiKey, url);
			if (props.search) {
				setImages(prevImages => [...prevImages, ...data.photos]);
			} else {
				setImages(prevImages => [...prevImages, ...data.photos]);
			}
		} catch (error) {
			console.error('Error fetching images:', error);
		}
	};

	const downloadMedia = async (url, type, name) => {
		name.length === 0 ? name = "snapshots_download.png" : name;
		await handleDownload(url, type, name).then(() => null)
	}

	return (
		<>
			{
				loading ? (
					<SkeletonAlpha isHome={props.isHome}/>
				) : (
					<>
						{props.isHome ? <span className={s.type}>IMAGES</span> : <></>}
						<motion.div
							className={s.imageGrid}
							variants={containerVariants}
							initial="hidden"
							animate="visible"
						>
							<AnimatePresence>
								{
									images.length > 0 ? (
										images.map((image, index) => {
											const cellType = getCellType(image.width, image.height);
											return (
												<motion.div
													key={index}
													className={`${s.cell} ${s[cellType]}`}
													variants={itemVariants}
													transition={{type: 'spring', stiffness: 300}}
												>
													<Link
														href={`/image/${image.id}`}>
														<img
															className={s.cellContent}
															src={image.src.original}
															alt={image.alt}
														/>
													</Link>
													<div className={s.cellActions}>
														<div className={s.actionA}>
															<Link className={s.cellLink}
															      href={`/image/${image.id}`}>
																View Image
															</Link>
														</div>
														<div className={s.actionB}>
															<span className={s.action}>
																	<FaDownload
																		onClick={() => downloadMedia(image.src.original, 'image', image.alt)}/>
																</span>
														</div>
													</div>
												</motion.div>
											);
										})
									) : (
										<div>No images available.</div>
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
