'use client'

import s from "@/styles/globals.module.css";
import {useEffect} from "react";
import CollectionsStore from "@/stores/CollectionsStore";
import {useRouter} from "next/navigation";
import {CollectionsContent} from "@/components/CollectionsContent";
import {SkeletonBeta} from "@/components/SkeletonBeta";
import {useFetchUser} from "@/hooks/useFetchUser";
import CurrentStore from "@/stores/CurrentStore";
import {useCollectionsFetcher} from "@/hooks/useCollectionsFetcher";
import UserStore from "@/stores/UserStore";

export default function Page({params}) {

	const slug = params.slug;

	const router = useRouter();

	const fetchUser = useFetchUser(router);

	const {userId} = UserStore()

	const {albumsStore, tapesStore} = CollectionsStore();
	const {currentStore, setCurrentStore} = CurrentStore();
	const {fetchUserAlbums, fetchUserTapes} = useCollectionsFetcher();

	useEffect(() => {

		fetchUser().then(() => {

			if (!albumsStore && !tapesStore) {
				fetchUserAlbums(userId).then(() => {
					const matchingAlbum = albumsStore.find((album) => album.albumId === slug);
					setCurrentStore(matchingAlbum);
				});

				fetchUserTapes(userId).then(() => {
					const matchingTape = tapesStore.find((tape) => tape.tapeId === slug);
					setCurrentStore(matchingTape);
				});
			} else {
				const matchingAlbum = albumsStore?.find((album) => album.albumId === slug);
				const matchingTape = tapesStore?.find((tape) => tape.tapeId === slug);

				setCurrentStore(matchingAlbum || matchingTape);
			}
		});
	}, [slug, albumsStore, tapesStore, router, fetchUser, fetchUserAlbums, fetchUserTapes, setCurrentStore, userId]);

	return (
		<div className={s.wrapper}>
			{currentStore ? (
				<CollectionsContent collectionId={slug} mediaType={currentStore.albumId ? "album" : "tape"}/>
			) : (
				<SkeletonBeta/>
			)}
		</div>
	);
}
