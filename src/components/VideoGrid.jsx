"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/Button";
import {Skeleton} from "@/components/Skeleton";
import s from "@/styles/home/home.module.css";
import Link from "next/link";

export const VideoGrid = (props) => {
	const [videos, setVideos] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	const fetchVideos = async () => {
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
			console.log(data);
			setVideos(data.videos);

			setTimeout(() => {
				setLoading(false);
			}, 2000);
		} catch (error) {
			console.error('Error fetching the video:', error);
		}
	};

	useEffect(() => {
		fetchVideos();
	}, []);

	const getCellType = (width, height) => {
		const aspectRatio = width / height;
		if (aspectRatio > 1.5) return 'panorama';
		if (aspectRatio > 1.2) return 'landscape';
		if (aspectRatio < 0.8) return 'portrait';
		return 'square';
	};

	const loadMore = async () => {
		const newPage = page + 1;
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
			setVideos(prevVideos => [...prevVideos, ...data.videos]);
		} catch (error) {
			console.error('Error fetching the video:', error);
		}
	};

	return (
		<>
			{loading ? (
				<Skeleton/>
			) : (
				<div className={s.vidGrid}>
					{videos.map((video, index) => {
						const cellType = getCellType(video.width, video.height);
						return (
							<div key={index} className={`${s.cell} ${s[cellType]} ${s.vidCell}`}>
								<video
									className={s.img}
									src={video.video_files[0].link}
									controls
									poster={video.image}
									onClick={(e) => e.preventDefault()} // Prevent video from playing
								/>
								<Link className={s.vidLink} href={`/video/${video.id}`}>
									Visit Video
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
