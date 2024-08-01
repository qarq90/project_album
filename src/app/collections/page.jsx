"use client";

import g from "@/styles/globals.module.css";
import {useEffect} from "react";
import {useFetchUser} from "@/hooks/useFetchUser";
import {useRouter} from "next/navigation";
import UserStore from "@/stores/UserStore";
import CollectionsStore from "@/stores/CollectionsStore";
import Link from "next/link";
import {SkeletonCharlie} from "@/components/SkeletonCharlie";

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

	useEffect(() => {
		fetchUser().then(() => null)

		async function fetchUserAlbums() {
			const request = {
				userId: userId,
			};

			try {
				const response = await fetch("/api/post/collections/albums", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(request),
				});

				const data = await response.json();

				if (data.status) {
					console.log("Fetched albums:", data.result.albums);
					setAlbumsStore(data.result.albums);
				} else {
					console.log(data.message);
					return null;
				}
			} catch (e) {
				console.log(e);
				return null;
			}
		}

		async function fetchUserTapes() {
			const request = {
				userId: userId,
			};

			try {
				const response = await fetch("/api/post/collections/tapes", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(request),
				});

				const data = await response.json();

				if (data.status) {
					console.log("Fetched tapes:", data.result.tapes);
					setTapesStore(data.result.tapes);
				} else {
					console.log(data.message);
					return null;
				}
			} catch (e) {
				console.log(e);
				return null;
			}
		}

		setTimeout(() => {
			if (albumsStore === null && tapesStore === null) {
				fetchUserAlbums().then(() => console.log("Fetching albums..."));
				fetchUserTapes().then(() => console.log("Fetching tapes..."));
			} else {
				console.log("Store is not null");
			}
		}, 2000);
	}, [albumsStore, fetchUser, setAlbumsStore, setTapesStore, tapesStore, userId]);

	return (
		<>
			<div className={g.wrapper}>
				<span className={g.type}>ALBUMS</span>
				<div className={g.collectionGrid}>
					{
						albumsStore ? (
							<>
								{albumsStore.map((album, index) => (
									<>
										<Link
											key={index}
											href={`/album/${album.albumId}`}
											style={{
												backgroundImage: `url(${album.albumData[0].base64})`,
												backgroundSize: "cover",
												backgroundPosition: "center",
											}}
											className={g.collectionItem}
										>
											<p className={g.collectionName}>{album.albumTitle}</p>
										</Link>
									</>
								))}
							</>
						) : <SkeletonCharlie/>
					}
				</div>
				<span className={g.type}>TAPES</span>
				<div className={g.collectionGrid}>
					{
						tapesStore ? (
							<>
								{tapesStore.map((tape, index) => (
									<>
										<Link
											key={index}
											href={`/tape/${tape.tapeId}`}
											style={{
												backgroundImage: `url(${tape.tapeData[0].base64})`,
												backgroundSize: "cover",
												backgroundPosition: "center",
											}}
											className={g.collectionItem}
										>
											<p className={g.collectionName}>{tape.tapeTitle}</p>
										</Link>
									</>
								))}
							</>
						) : <SkeletonCharlie/>
					}
				</div>
			</div>
		</>
	);
}
