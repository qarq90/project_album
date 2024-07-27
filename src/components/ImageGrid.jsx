"use client";

import {useEffect, useState} from "react";
import {Button} from "@/components/ui/Button";
import {Skeleton} from "@/components/Skeleton";
import Link from "next/link";
import s from "@/styles/home/home.module.css";

export const ImageGrid = (props) => {
	const [images, setImages] = useState([]);
	const [page, setPage] = useState(props.page);
	const [loading, setLoading] = useState(true);

	const fetchImages = async () => {
		const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
		const url = `${props.url}&page=${page}`;

		const options = {
			method: 'GET',
			headers: {
				'Authorization': apiKey
			}
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			setImages(data.photos);

			setTimeout(() => {
				setLoading(false);
			}, 2000);
		} catch (error) {
			console.error('Error fetching the images:', error);
		}
	};

	useEffect(() => {
		fetchImages();
	}, []);

	const getCellType = (width, height) => {
		const aspectRatio = width / height;
		if (aspectRatio > 1.5) return 'panorama';
		if (aspectRatio > 1.2) return 'landscape';
		if (aspectRatio < 0.8) return 'portrait';
		return 'square';
	};

	const loadMore = async () => {
		const newPage = Math.floor(Math.random() * 256) + 1;
		setPage(newPage);

		const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
		const url = `${props.url}&page=${newPage}`;

		const options = {
			method: 'GET',
			headers: {
				'Authorization': apiKey
			}
		};

		try {
			const response = await fetch(url, options);
			const data = await response.json();
			setImages(prevImages => [...prevImages, ...data.photos]);
		} catch (error) {
			console.error('Error fetching the images:', error);
		}
	};

	return (
		<>
			{loading ? (
				<Skeleton/>
			) : (
				<div className={s.imgGrid}>
					{images.map((image, index) => {
						const cellType = getCellType(image.width, image.height);
						return (
							<div key={index} className={`${s.cell} ${s[cellType]} ${s.vidCell}`}>
								<img
									className={s.img}
									src={image.src.original}
									alt={image.alt}
								/>
								<Link className={s.vidLink} href={`/image/${image.id}`}>
									View Image
								</Link>
							</div>
						);
					})}
				</div>
			)}
			<Button onClick={loadMore} text="Load More"/>
		</>
	);
};
