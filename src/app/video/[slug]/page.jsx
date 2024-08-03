"use client";

import {useEffect, useState} from "react";
import s from "@/styles/pages/slug/slug.module.css";
import g from "@/styles/globals.module.css";
import {Button} from "@/components/ui/Button";
import {handleDownload, removeNumbersAndTrailingChars} from "@/lib/helperFunctions";
import {useFetchUser} from "@/hooks/useFetchUser";
import {useRouter} from "next/navigation";
import {AddToTape} from "@/components/AddToTape";
import {SkeletonDelta} from "@/components/SkeletonDelta";

export default function Page({params}) {

	const slug = params.slug;

	const [video, setVideo] = useState(null);
	const [resolution, setResolution] = useState("Original");
	const [openTape, setOpenTape] = useState(false);

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
				console.log(data)
			} catch (error) {
				console.error('Error fetching the video:', error);
			}
		};

		fetchVideo().then(() => null);

	}, [slug]);

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
		setOpenTape(true);
	}

	const hdFile = video?.video_files.find(file => file.quality === 'hd');

	return (
		<>
			<div className={g.wrapper}>
				{video ? (
					<>
						<video
							className={s.video}
							src={hdFile.link}
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
									<option className={s.option} key={quality} value={quality}>
										{quality.toUpperCase()}
									</option>
								))}
							</select>
							<Button text="Download" onClick={downloadHandler}/>
							<Button text="Add to Tape" onClick={albumHandler}/>
						</div>
					</>
				) : (
					<SkeletonDelta />
				)}
			</div>
			{openTape ? <AddToTape video={video} openTape={openTape} setOpenTape={setOpenTape}/> : null}
		</>
	);
}
