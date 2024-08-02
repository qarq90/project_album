'use client'

import s from "@/styles/globals.module.css";
import {useEffect, useState} from "react";
import CollectionsStore from "@/stores/CollectionsStore";
import {useRouter} from "next/navigation";
import {GridCollection} from "@/components/GridCollection";
import {SkeletonBeta} from "@/components/SkeletonBeta";

export default function Page({params}) {

	const slug = params.slug;

	const router = useRouter();

	const [currentAlbum, setCurrentAlbum] = useState(null);
	const {albumsStore} = CollectionsStore();

	useEffect(() => {
		if (albumsStore === null) {
			router.push('/collections');
		} else {
			const matchingAlbum = albumsStore.find((album) => album.albumId === slug);
			setCurrentAlbum(matchingAlbum);
		}
	}, [slug, albumsStore, router]);

	return (
		<>
			<div className={s.wrapper}>
				{
					currentAlbum ? <GridCollection medaiType={"album"} currentAlbum={currentAlbum}/> : <SkeletonBeta/>
				}
			</div>
		</>
	)
}
