"use client";

import g from "@/styles/globals.module.css";
import {useEffect} from "react";
import {useFetchUser} from "@/hooks/useFetchUser";
import {useRouter} from "next/navigation";
import UserStore from "@/stores/UserStore";
import CollectionsStore from "@/stores/CollectionsStore";
import Link from "next/link";
import {SkeletonBeta} from "@/components/SkeletonBeta";
import ImageStore from "@/stores/ImageStore";
import VideoStore from "@/stores/VideoStore";

export default function Page() {

	const router = useRouter();
	const fetchUser = useFetchUser(router);
	const {userId} = UserStore();

	const {
		albumsStore,
		setAlbumsStore,
		tapesStore,
		setTapesStore,
	} = CollectionsStore();

	const {
		imageFetcher,
		setImageFetcher
	} = ImageStore();

	const {
		videoFetcher,
		setVideoFetcher
	} = VideoStore();

	async function fetchUserAlbums() {
		const request = {userId: userId};

		try {
			const response = await fetch("/api/post/collections/albums", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(request),
			});

			const data = await response.json();

			if (data.status) {
				setAlbumsStore(data.result.albums);
				setImageFetcher(false)
			} else {
				console.log(data.message);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function fetchUserTapes() {
		const request = {userId: userId};

		try {
			const response = await fetch("/api/post/collections/tapes", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(request),
			});

			const data = await response.json();

			if (data.status) {
				setTapesStore(data.result.tapes);
				setVideoFetcher(false)
			} else {
				console.log(data.message);
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		fetchUser().then(() => null);

		if (imageFetcher) {
			fetchUserAlbums().then(() => null);
		}

		if (videoFetcher) {
			fetchUserTapes().then(() => null);
		}
	}, [albumsStore, fetchUser, fetchUserAlbums, fetchUserTapes, imageFetcher, setAlbumsStore, setImageFetcher, setTapesStore, setVideoFetcher, tapesStore, userId, videoFetcher]);

	return (
		<div className={g.wrapper}>
			{
				albumsStore.length > 0 && !imageFetcher ? (
					<>
						<span className={g.type}>ALBUMS</span>
						<div className={g.collectionGrid}>
							{
								albumsStore.map((album) => (
									<Link
										key={album.albumId}
										href={`/collections/album/${album.albumId}`}
										style={{
											backgroundImage: `url(${album.albumData[0].base64})`,
											backgroundSize: "cover",
											backgroundPosition: "center",
										}}
										className={g.collectionItem}
									>
										<p className={g.collectionName}>{album.albumTitle}</p>
									</Link>
								))
							}
						</div>
					</>
				) : (
					<SkeletonBeta/>
				)
			}
			{
				tapesStore.length > 0 && !videoFetcher ? (
					<>
						<span className={g.type}>TAPES</span>
						<div className={g.collectionGrid}>
							{
								tapesStore.map((tape) => (
									<Link
										key={tape.tapeId}
										href={`/collections/tape/${tape.tapeId}`}
										style={{
											backgroundImage: `url(${tape.tapeData[0].base64})`,
											backgroundSize: "cover",
											backgroundPosition: "center",
										}}
										className={g.collectionItem}
									>
										<p className={g.collectionName}>{tape.tapeTitle}</p>
									</Link>
								))
							}
						</div>
					</>
				) : (
					<SkeletonBeta/>
				)
			}
		</div>
	);
}
