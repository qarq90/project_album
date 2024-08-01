"use client";

import ImageStore from "@/stores/ImageStore";
import Link from "next/link";
import s from "@/styles/home/home.module.css";
import {useEffect} from "react";
import {Button} from "@/components/ui/Button";
import {SkeletonAlpha} from "@/components/SkeletonAlpha";
import {useFetchMedia} from "@/hooks/useFetchMedia";
import {getCellType} from "@/lib/helperFunctions";
import {AnimatePresence, motion} from "framer-motion";
import {containerVariants, itemVariants} from "@/styles/animations/scale";

export const GridImage = (props) => {
	const {loading, setPage, fetchData} = useFetchMedia(props.url, 'image');
	const {imageStore} = ImageStore();

	const loadMore = async () => {
		const newPage = Math.floor(Math.random() * 256) + 1;
		setPage(newPage);
		await fetchData(newPage, 'image');
	};

	useEffect(() => {
		if (imageStore.length === 0) {
			const newPage = Math.floor(Math.random() * 256) + 1;
			fetchData(newPage, 'image').then(() => null);
		}
	}, [fetchData, imageStore.length]);

	return (
		<>
			{
				loading ? (
					<SkeletonAlpha/>
				) : (
					<motion.div
						className={s.imgGrid}
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						{
							Array.isArray(imageStore) && imageStore.length > 0 ? (
								<AnimatePresence>
									{imageStore.map((image, index) => {
										const cellType = getCellType(image.width, image.height);
										return (
											<motion.div
												key={index}
												className={`${s.cell} ${s[cellType]} ${s.vidCell}`}
												variants={itemVariants}
												whileHover={{scale: 1.05}}
												transition={{type: 'spring', stiffness: 300}}
											>
												<img
													className={s.img}
													src={image.src.original}
													alt={image.alt}
												/>
												<Link className={s.vidLink} href={`/image/${image.id}`}>
													View Image
												</Link>
											</motion.div>
										);
									})}
								</AnimatePresence>
							) : (
								<></>
							)
						}
					</motion.div>
				)
			}
			<Button onClick={loadMore} text="Load More"/>
		</>
	);
};
