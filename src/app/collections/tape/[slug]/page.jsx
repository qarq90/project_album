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

	const [currentTape, setCurrentTape] = useState(null);
	const {tapesStore} = CollectionsStore();

	useEffect(() => {
		if (tapesStore === null) {
			router.push('/collections');
		} else {
			const matchingTape = tapesStore.find((tape) => tape.tapeId === slug);
			setCurrentTape(matchingTape);
		}
	}, [slug, tapesStore, router]);

	return (
		<>
			<div className={s.wrapper}>
				{
					currentTape ? <GridCollection medaiType={"tape"} currentTape={currentTape}/> : <SkeletonBeta/>
				}
			</div>
		</>
	)
}
