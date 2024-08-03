import s from "@/styles/globals.module.css";
import {getCellType, handleDownload} from "@/lib/helperFunctions";
import {containerVariants, itemVariants} from "@/styles/animations/scale";
import {AnimatePresence, motion} from "framer-motion";
import Link from "next/link";
import {FaTrashCan} from "react-icons/fa6";
import {FaDownload} from "react-icons/fa";
import {SkeletonAlpha} from "@/components/SkeletonAlpha";

export const CollectionsGrid = (props) => {
	const downloadMedia = (url, type, name) => {
		name.length === 0 ? name = "snapshots_download" : name;
		if (type === "video") {
			handleDownload(url, type, name).then(() => null)
		} else {
			handleDownload(url, type, name).then(() => null)
		}
	}
	return (
		<>
			{

				props.medaiType === "album" ?
					<>
						<h1 className={s.type}>{props.currentAlbum.albumTitle}</h1>
						<motion.div
							className={s.imageGrid}
							variants={containerVariants}
							initial="hidden"
							animate="visible"
						>
							{
								props.currentAlbum && props.currentAlbum.albumData && props.currentAlbum.albumData.length > 0 ? (
									<AnimatePresence>
										{
											props.currentAlbum.albumData.map((image, index) => {
												const cellType = getCellType(image.width, image.height);
												return (
													<motion.div
														key={index}
														className={`${s.cell} ${s[cellType]}`}
														variants={itemVariants}
														transition={{type: 'spring', stiffness: 300}}
													>
														<img
															className={s.cellContent}
															src={image.base64}
															alt={image.description}
														/>
														<div className={s.cellActions}>
															<div className={s.actionA}>
																<Link className={s.cellLink}
																      href={`/image/${image.imageId}`}>
																	View Image
																</Link>
															</div>
															<div className={s.actionB}>
																<span className={s.action}>
																	<FaTrashCan/>
																</span>
																<span className={s.action}>
																	<FaDownload
																		onClick={() => downloadMedia(image.base64, 'image', image.description)}
																	/>
																</span>
															</div>
														</div>
													</motion.div>
												);
											})
										}
									</AnimatePresence>
								) : (<><SkeletonAlpha/></>)}
						</motion.div>
					</> :
					<>
						<h1 className={s.type}>{props.currentTape.tapeTitle}</h1>
						<motion.div
							className={s.videoGrid}
							variants={containerVariants}
							initial="hidden"
							animate="visible"
						>
							{
								props.currentTape && props.currentTape.tapeData && props.currentTape.tapeData.length > 0 ? (
									<AnimatePresence>
										{
											props.currentTape.tapeData.map((video, index) => {
												const cellType = getCellType(video.width, video.height);
												return (
													<motion.div
														key={index}
														className={`${s.cell} ${s[cellType]}`}
														variants={itemVariants}
														transition={{type: 'spring', stiffness: 300}}
													>
														<video
															className={s.cellContent}
															src={video.url}
															controls
														/>
														<div className={s.cellActions}>
															<div className={s.actionA}>
																<Link className={s.cellLink}
																      href={`/video/${video.videoId}`}>
																	Visit Video
																</Link>
															</div>
															<div className={s.actionB}>
																<span className={s.action}>
																	<FaTrashCan/>
																</span>
																<span className={s.action}>
																	<FaDownload
																		onClick={() => downloadMedia(video.url, 'video', video.description)}
																	/>
																</span>
															</div>
														</div>
													</motion.div>
												);
											})
										}
									</AnimatePresence>
								) : (<><SkeletonAlpha/></>)}
						</motion.div>
					</>
			}
		</>
	);
};
