import s from "@/styles/globals.module.css";
import {getCellType, handleDownload} from "@/lib/helperFunctions";
import {containerVariants, itemVariants} from "@/styles/animations/scale";
import {AnimatePresence, motion} from "framer-motion";
import Link from "next/link";
import {FaTrashCan} from "react-icons/fa6";
import {FaDownload} from "react-icons/fa";
import {SkeletonAlpha} from "@/components/SkeletonAlpha";
import {EmptySpace} from "@/components/ui/EmptySpace";
import UserStore from "@/stores/UserStore";
import CurrentStore from "@/stores/CurrentStore";
import {useEffect} from "react";
import {useCollectionsFetcher} from "@/hooks/useCollectionsFetcher";
import {Button} from "@/components/ui/Button";
import {useRouter} from "next/navigation";
import ImageStore from "@/stores/ImageStore";
import VideoStore from "@/stores/VideoStore";

export const CollectionsContent = (props) => {

	const router = useRouter();

	const {fetchUserAlbums, fetchUserTapes} = useCollectionsFetcher();

	const {currentStore} = CurrentStore();
	const {userId} = UserStore();
	const {imageFetcher, setImageFetcher} = ImageStore();
	const {videoFetcher, setVideoFetcher} = VideoStore();

	const downloadMedia = (url, type, name) => {
		name.length === 0 ? (name = "snapshots_download") : name;
		handleDownload(url, type, name).then(() => null);
	};

	const deleteCollection = async (type, collectionId, _id) => {

		let request
		let response

		if (type === "album") {
			request = {
				userId: userId,
				albumId: props.collectionId,
			};

			response = await fetch("/api/post/collections/albums/delete", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(request),
			});
		} else {
			request = {
				userId: userId,
				tapeId: props.collectionId,
			};

			response = await fetch("/api/post/collections/tapes/delete", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(request),
			});
		}

		try {

			const data = await response.json();
			if (data.status) {
				setImageFetcher(true)
				setVideoFetcher(true)
				router.push("/collections")
			} else {
				alert(data.message);
			}
		} catch (e) {
			console.log(e);
		}

	}

	const deleteHandler = async (type, itemId, _id) => {

		let request;
		let response;

		if (type === 'image') {
			request = {
				userId: userId,
				albumId: props.collectionId,
			};

			response = await fetch("/api/post/collections/albums/delete", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(request),
			});
		} else {
			request = {
				userId: userId,
				tapeId: props.collectionId,
			};

			response = await fetch("/api/post/collections/tapes/delete", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(request),
			});
		}

		try {
			const data = await response.json();
			if (data.status) {
				fetchUserAlbums(userId).then(() => null);
				fetchUserTapes(userId).then(() => null);
			} else {
				alert(data.message);
			}
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		console.log("Current Store Updated: ", currentStore);
	}, [currentStore]);

	return (
		<>
			{
				props.mediaType === "album" ?
					<>
						<motion.div
							variants={containerVariants}
							initial="hidden"
							animate="visible"
							className={s.collectionHeader}
						>
							<h1 className={s.type}>{currentStore.albumTitle}</h1>
							<Button icon={<FaTrashCan/>} text={"Delete Album"}
							        onClick={() => deleteCollection('album', props.collectionId, userId)}
							/>
						</motion.div>
						<EmptySpace height={"24px"}/>
						<motion.div
							className={s.imageGrid}
							variants={containerVariants}
							initial="hidden"
							animate="visible"
						>
							{currentStore && currentStore.albumData && currentStore.albumData.length > 0 ? (
								<AnimatePresence>
									{currentStore.albumData.map((image, index) => {
										const cellType = getCellType(image.width, image.height);
										return (
											<motion.div
												key={index}
												className={`${s.cell} ${s[cellType]}`}
												variants={itemVariants}
												transition={{type: "spring", stiffness: 300}}
											>
												<img className={s.cellContent} src={image.url} alt={image.description}/>
												<div className={s.cellActions}>
													<div className={s.actionA}>
														<Link className={s.cellLink} href={`/image/${image.imageId}`}>
															View Image
														</Link>
													</div>
													<div className={s.actionB}>
														<span className={s.action}>
									                        <FaTrashCan
										                        onClick={() => deleteHandler('image', image.imageId, image._id)}
									                        />
														</span>
														<span className={s.action}>
									                        <FaDownload
										                        onClick={() => downloadMedia(image.url, "image", image.description)}
									                        />
														</span>
													</div>
												</div>
											</motion.div>
										);
									})}
								</AnimatePresence>
							) : (
								<SkeletonAlpha/>
							)}
						</motion.div>
					</> :
					<>
						<motion.div
							variants={containerVariants}
							initial="hidden"
							animate="visible"
							className={s.collectionHeader}
						>
							<h1 className={s.type}>{currentStore.tapeTitle}</h1>
							<Button icon={<FaTrashCan/>} text={"Delete Tape"}
							        onClick={() => deleteCollection('tape', currentStore.tapeId, userId)}
							/>
						</motion.div>
						<EmptySpace height={"24px"}/>
						<motion.div
							className={s.videoGrid}
							variants={containerVariants}
							initial="hidden"
							animate="visible"
						>
							{currentStore && currentStore.tapeData && currentStore.tapeData.length > 0 ? (
								<AnimatePresence>
									{currentStore.tapeData.map((video, index) => {
										const cellType = getCellType(video.width, video.height);
										return (
											<motion.div
												key={index}
												className={`${s.cell} ${s[cellType]}`}
												variants={itemVariants}
												transition={{type: "spring", stiffness: 300}}
											>
												<img className={s.cellContent} src={video.url} alt={video.description}/>
												<div className={s.cellActions}>
													<div className={s.actionA}>
														<Link className={s.cellLink} href={`/video/${video.videoId}`}>
															Visit Video
														</Link>
													</div>
													<div className={s.actionB}>
								                      <span className={s.action}>
								                        <FaTrashCan
									                        onClick={() => deleteHandler('video', video.imageId, video._id)}
								                        />
								                      </span>
														<span className={s.action}>
								                        <FaDownload
									                        onClick={() => downloadMedia(video.url, "video", video.description)}
								                        />
								                      </span>
													</div>
												</div>
											</motion.div>
										);
									})}
								</AnimatePresence>
							) : (
								<SkeletonAlpha/>
							)}
						</motion.div>
					</>
			}
		</>
	);
};
