"use client";

import s from "@/styles/globals.module.css";
import {AnimatePresence, motion} from "framer-motion";
import {containerVariants} from "@/styles/animations/scale";
import {Button} from "@/components/ui/Button";
import {requestMedia} from "@/hooks/requestMedia";
import {SkeletonAlpha} from "@/components/SkeletonAlpha";
import {useEffect, useState} from "react";
import {Cell} from "@/components/ui/Cell";
import {EmptySpace} from "@/components/ui/EmptySpace";
import ImageStore from "@/stores/ImageStore";

export const GridImage = (props) => {

	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(!props.isSearch ? Math.floor(Math.random() * 200) + 1 : 1);

	const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY

	const {imageFetcher, setImageFetcher} = ImageStore();

	const fetchImages = async () => {
		setLoading(true);
		try {
			const data = await requestMedia(apiKey, `${props.url}&page=${page}`)
			setImages(data.photos);
			setPage(page + 1)
			setImageFetcher(false)
		} catch (error) {
			console.error('Error fetching the images:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchImages().then(() => null);
	}, [imageFetcher]);

	const loadMore = async () => {
		setPage(page + 1);
		try {
			const data = await requestMedia(apiKey, `${props.url}&page=${page}`);
			setImages(prevImages => [...prevImages, ...data.photos]);
		} catch (error) {
			console.error('Error fetching images:', error);
		}
	};

	return (
		<>
			{
				loading && !imageFetcher ? (
					<SkeletonAlpha isType={props.isType}/>
				) : (
					<>
						{
							props.isType ?
								<>
									<span className={s.type}>IMAGES</span>
									<EmptySpace height={"24px"}/>
								</>
								: <></>
						}
						<motion.div
							className={s.imageGrid}
							variants={containerVariants}
							initial="hidden"
							animate="visible"
						>
							<AnimatePresence>
								<div className={s.gridColumns}>
									{
										images.length > 0 ? (
											images.map((image, index) => {
												{
													return index % 3 === 2 ?
														(
															<Cell key={index} data={image} type={"image"}/>
														)
														:
														<></>
												}
											})
										) : (
											<div>Could not find any images.</div>
										)
									}
								</div>
								<div className={s.gridColumns}>
									{
										images.length > 0 ? (
											images.map((image, index) => {
												{
													return index % 3 === 1 ?
														(
															<Cell key={index} data={image} type={"image"}/>
														)
														:
														<></>
												}
											})
										) : (
											<div>Could not find any images.</div>
										)
									}
								</div>
								<div className={s.gridColumns}>
									{
										images.length > 0 ? (
											images.map((image, index) => {
												{
													return index % 3 === 0 ?
														(
															<Cell key={index} data={image} type={"image"}/>
														)
														:
														<></>
												}
											})
										) : (
											<div>Could not find any images.</div>
										)
									}
								</div>
							</AnimatePresence>
						</motion.div>
					</>
				)
			}
			<Button onClick={loadMore} text="Load More"/>
		</>
	);
};
