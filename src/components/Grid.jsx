"use client"

import {useEffect, useState} from "react";
import s from "@/styles/home/home.module.css";
import Link from "next/link";
import {Button} from "@/components/ui/Button";

export const Grid = (props) => {
	const [images, setImages] = useState([]);
	const [page, setPage] = useState(2);

	const fetchImages = async () => {
		const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
		const url = props.url;

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
		setPage(page + 2)

		const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
		const url = props.url + "&page=" + page;

		console.log(url)

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
	}

	return (
		<>
			<div>
				<div className={s.grid}>
					{images.length > 0 ? (
						images.map((image, index) => {
							const cellType = getCellType(image.width, image.height);
							return (
								<div key={index} className={`${s.cell} ${s[cellType]}`}>
									<Link href={`/image/${image.id}`}>
										<img
											className={s.img}
											src={image.src.original}
											alt={`Image ${index + 1}`}
										/>
									</Link>
								</div>
							);
						})
					) : (
						<p>Loading...</p>
					)}
				</div>
			</div>
			<Button onClick={loadMore} text="Load More"/>
		</>
	)
}
