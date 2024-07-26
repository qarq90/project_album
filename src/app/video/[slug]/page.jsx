"use client";

import {useEffect, useState} from "react";
import s from "@/styles/image/image.module.css";
import g from "@/styles/globals.module.css";
import {Button} from "@/components/ui/Button";
import {handleDownload, removeNumbersAndTrailingChars} from "@/lib/imageHelper";

export default function Page({params}) {
	const slug = params.slug;
	const [video, setVideo] = useState(null);
	const [resolution, setResolution] = useState("Original");

	useEffect(() => {
		const fetchVideo = async () => {
			const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
			const url = `https://api.pexels.com/videos/videos/${slug}`;

			const options = {
				method: 'GET',
				headers: {
					'Authorization': apiKey
				}
			};

			try {
				const response = await fetch(url, options);
				const data = await response.json();
				console.log(data)
				setVideo(data);
			} catch (error) {
				console.error('Error fetching the video:', error);
			}
		};

		fetchVideo();
	}, [slug]);

	const resolutionUrls = video?.video_files.reduce((acc, file) => {
		acc[file.quality] = file.link;
		return acc;
	}, {});

	function downloadHandler() {
		if (video && resolutionUrls[resolution]) {
			let name = video.url ? video.url.split('/').pop() : 'download.mp4';
			name = removeNumbersAndTrailingChars(name);

			handleDownload(resolutionUrls[resolution], name);
		} else {
			console.log('No video available or resolution is not set.');
		}
	}

	function blobToBase64(blob) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(blob);
		});
	}

	async function albumHandler() {
		try {
			const response = await fetch(video.video_files[1].link);
			const blob = await response.blob();
			const base64 = await blobToBase64(blob);
			console.log(base64);
			return base64;
		} catch (error) {
			console.error('Error converting video URL to base64:', error);
		}
	}

	return (
		<div className={g.wrapper}>
			{video ? (
				<>
					<video
						className={s.video}
						src={video.video_files[1].link}
						controls
						poster={video.image}
						width={video.width}
						height={video.height}
						style={{objectFit: 'cover'}}
					/>
					<h2 className={s.name}>Videographer: {video.user.name}</h2>
					<div className={s.bottomContainer}>
						<select
							className={s.select}
							value={resolution}
							onChange={(e) => setResolution(e.target.value)}
						>
							{Object.keys(resolutionUrls).map((quality) => (
								<option key={quality} value={quality}>
									{quality.toUpperCase()}
								</option>
							))}
						</select>
						<Button text="Download" onClick={downloadHandler}/>
						{/*<Button text="Add to Album" onClick={albumHandler}/>*/}
					</div>
				</>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
}
