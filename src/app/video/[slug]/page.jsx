"use client";

import {useEffect, useState} from "react";
import s from "@/styles/image/image.module.css";
import g from "@/styles/globals.module.css";
import {Button} from "@/components/ui/Button";
import {blobToBase64, handleDownload, removeNumbersAndTrailingChars} from "@/lib/helperFunctions";
import {useFetchUser} from "@/hooks/useFetchUser";
import {useRouter} from "next/navigation";
import VideoStore from "@/stores/VideoStore";
import {AddToTape} from "@/components/AddToTape";

export default function Page({params}) {

	const slug = params.slug;

	const [video, setVideo] = useState(null);
	const [resolution, setResolution] = useState("Original");
	const [openTape, setOpenTape] = useState(false);

	const {
		setVideoId,
		setVideoStore
	} = VideoStore()

	const router = useRouter();

	const fetchUser = useFetchUser(router);

	useEffect(() => {
		fetchUser().then(() => null)
	}, [fetchUser]);

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
				setVideo(data);
				setVideoId(data.id);
				setVideoStore(data)
			} catch (error) {
				console.error('Error fetching the video:', error);
			}
		};

		fetchVideo().then(() => console.log("Video Fetched Successfully"));

	}, [setVideoId, setVideoStore, slug]);

	const resolutionUrls = video?.video_files.reduce((acc, file) => {
		acc[file.quality] = file.link;
		return acc;
	}, {});

	function downloadHandler() {
		if (video && resolutionUrls[resolution]) {
			let name = video.url ? video.url.split('/').pop() : 'download.mp4';
			name = removeNumbersAndTrailingChars(name);

			handleDownload(resolutionUrls[resolution], name).then(() => console.log("Downloading video"));
		} else {
			console.log('No video available or resolution is not set.');
		}
	}

	async function albumHandler() {
		try {
			const response = await fetch(video.video_files[1].link);
			const blob = await response.blob();
			const base64 = await blobToBase64(blob);
			setOpenTape(true);
			return base64;
		} catch (error) {
			console.error('Error converting video URL to base64:', error);
		}
	}

	return (
		<>
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
							<Button text="Add to Album" onClick={albumHandler}/>
						</div>
					</>
				) : (
					<p>Loading...</p>
				)}
			</div>
			{openTape ? <AddToTape openTape={openTape} setOpenTape={setOpenTape}/> : null}
		</>
	);
}
