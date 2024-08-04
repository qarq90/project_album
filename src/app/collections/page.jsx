"use client";

import g from "@/styles/globals.module.css";
import {useEffect, useState} from "react";
import {useFetchUser} from "@/hooks/useFetchUser";
import {useRouter} from "next/navigation";
import UserStore from "@/stores/UserStore";
import {useCollectionsFetcher} from "@/hooks/useCollectionsFetcher";
import {CollectionsGrid} from "@/components/CollectionsGrid";
import {SkeletonAlpha} from "@/components/SkeletonAlpha";
import CollectionsStore from "@/stores/CollectionsStore";
import ImageStore from "@/stores/ImageStore";
import VideoStore from "@/stores/VideoStore";
import {EmptySpace} from "@/components/ui/EmptySpace";
import {FaImages, FaVideo} from "react-icons/fa";
import {motion} from "framer-motion"
import {containerVariants} from "@/styles/animations/scale";

export default function Page() {

	const router = useRouter();

	const {userId} = UserStore();

	const fetchUser = useFetchUser(router);

	const {fetchUserAlbums, fetchUserTapes} = useCollectionsFetcher();

	const [loading, setLoading] = useState(true);

	const {albumsStore} = CollectionsStore();
	const {imageFetcher, setImageFetcher} = ImageStore();
	const {tapesStore} = CollectionsStore();
	const {videoFetcher, setVideoFetcher} = VideoStore();

	useEffect(() => {
		const fetchData = async () => {
			await fetchUser();
			if (imageFetcher) {
				await fetchUserAlbums(userId);
				setImageFetcher(false);
			}
			if (videoFetcher) {
				await fetchUserTapes(userId);
				setVideoFetcher(false);
			}
			setLoading(false);
		};

		fetchData().then(() => null);

		const timer = setTimeout(() => {
			setLoading(false);
		}, 1750);

		return () => clearTimeout(timer);
	}, [fetchUser, fetchUserAlbums, fetchUserTapes, imageFetcher, videoFetcher, userId, setImageFetcher, setVideoFetcher]);

	return (
		<div className={g.wrapper}>
			{
				loading ? (
					<SkeletonAlpha/>
				) : (
					<>
						{
							albumsStore.length !== 0 ? (
								<CollectionsGrid
									title="YOUR ALBUMS"
									collectionStore={
										albumsStore.map(album => (
											{
												id: album.albumId,
												data: album.albumData,
												title: album.albumTitle,
											}
										))
									}
									isFetching={imageFetcher}
									type="album"
								/>
							) : (
								<motion.div
									variants={containerVariants}
									initial="hidden"
									animate="visible"
								>
									<span className={g.type}>YOUR ALBUMS</span>
									<EmptySpace height={"24px"}/>
									<div className={g.nothing}><FaImages/> No albums found. Save some now to view them
										later!
									</div>
									<EmptySpace height={"48px"}/>
								</motion.div>
							)
						}
						{
							tapesStore.length !== 0 ? (
								<CollectionsGrid
									title="YOUR TAPES"
									collectionStore={
										tapesStore.map(tape => (
											{
												id: tape.tapeId,
												data: tape.tapeData,
												title: tape.tapeTitle,
											}
										))
									}
									isFetching={videoFetcher}
									type="tape"
								/>
							) : (
								<motion.div
									variants={containerVariants}
									initial="hidden"
									animate="visible"
								>
									<span className={g.type}>YOUR TAPES</span>
									<EmptySpace height={"24px"}/>
									<div className={g.nothing}><FaVideo/> No tapes found. Save some now to view them
										later!
									</div>
									<EmptySpace height={"48px"}/>
								</motion.div>
							)
						}
					</>
				)
			}
		</div>
	);
}
