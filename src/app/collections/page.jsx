"use client";

import g from "@/styles/globals.module.css";
import {useEffect} from "react";
import {useFetchUser} from "@/hooks/useFetchUser";
import {useRouter} from "next/navigation";
import UserStore from "@/stores/UserStore";
import {useCollectionsFetcher} from "@/hooks/useCollectionsFetcher";
import {CollectionsGrid} from "@/components/CollectionsGrid";
import {SkeletonAlpha} from "@/components/SkeletonAlpha";
import CollectionsStore from "@/stores/CollectionsStore";
import ImageStore from "@/stores/ImageStore";
import VideoStore from "@/stores/VideoStore";

export default function Page() {

	const router = useRouter();

	const {userId} = UserStore();

	const fetchUser = useFetchUser(router);

	const {fetchUserAlbums, fetchUserTapes} = useCollectionsFetcher();

	const {albumsStore} = CollectionsStore();
	const {imageFetcher} = ImageStore();
	const {tapesStore} = CollectionsStore();
	const {videoFetcher} = VideoStore();

	useEffect(() => {
		fetchUser().then(() => {
			if (imageFetcher) {
				fetchUserAlbums(userId).then(() => null);
			}

			if (videoFetcher) {
				fetchUserTapes(userId).then(() => null);
			}
		});
	}, [fetchUser, fetchUserAlbums, fetchUserTapes, imageFetcher, videoFetcher, userId]);

	return (
		<div className={g.wrapper}>
			{albumsStore.length !== 0 && tapesStore.length !== 0 ? (
				<>
					<CollectionsGrid
						title="YOUR ALBUMS"
						collectionStore={albumsStore.map(album => ({
							id: album.albumId,
							data: album.albumData,
							title: album.albumTitle,
						}))}
						isFetching={imageFetcher}
						type="album"
					/>

					<CollectionsGrid
						title="YOUR TAPES"
						collectionStore={tapesStore.map(tape => ({
							id: tape.tapeId,
							data: tape.tapeData,
							title: tape.tapeTitle,
						}))}
						isFetching={videoFetcher}
						type="tape"
					/>
				</>
			) : (
				<SkeletonAlpha/>
			)}
		</div>
	);
}
