"use client";

import {useEffect, useState} from "react";
import s from "@/styles/pages/slug/slug.module.css";
import g from "@/styles/globals.module.css";
import {Button} from "@/components/ui/Button";
import {handleDownload, removeNumbersAndTrailingChars} from "@/lib/helperFunctions";
import {useRouter} from "next/navigation";
import {useFetchUser} from "@/hooks/useFetchUser";
import {AddToAlbum} from "@/components/AddToAlbum";
import {SkeletonDelta} from "@/components/SkeletonDelta";

export default function Page({params}) {

	const slug = params.slug;

	const [image, setImage] = useState(null);
	const [resolution, setResolution] = useState("Original");
	const [openAlbum, setOpenAlbum] = useState(false);

	const router = useRouter();

	const fetchUser = useFetchUser(router);

	useEffect(() => {
		fetchUser().then(() => null)
	}, [fetchUser]);

	useEffect(() => {
		const fetchImage = async () => {

			const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY;
			const url = `https://api.pexels.com/v1/photos/${slug}`;

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
				setImage(data);
			} catch (error) {
				console.error('Error fetching the images:', error);
			}
		};

		fetchImage().then(() => null);

	}, [slug]);

	const resolutionUrls = image?.src || {};

	function downloadHandler() {
		if (image && resolutionUrls[resolution]) {
			let name = image.url ? image.url.split('/').pop() : 'download.png';
			name = removeNumbersAndTrailingChars(name);

			handleDownload(resolutionUrls[resolution], name).then(() => console.log("Downloading slug"));
		} else {
			console.log('No slug available or resolution is not set.');
		}
	}

	async function albumHandler() {
		setOpenAlbum(true)
	}

	return (
		<>
			<div className={g.wrapper}>
				{image !== null ? (
					<>
						<img
							className={s.image}
							src={image?.src?.original}
							alt={image?.alt || slug}
						/>
						<h2 className={s.name}>Photographer: {image?.photographer}</h2>
						<div className={s.bottomContainer}>
							<select
								className={s.select}
								value={resolution}
								onChange={(e) => setResolution(e.target.value)}
							>
								{Object.keys(resolutionUrls).map((quality) => {
									const capitalizedQuality = quality.charAt(0).toUpperCase() + quality.slice(1).toLowerCase();
									return (
										<option key={quality} value={quality} className={s.option}>
											{capitalizedQuality}
										</option>
									);
								})}
							</select>
							<Button text="Download" onClick={downloadHandler}/>
							<Button text="Add to Album" onClick={albumHandler}/>
						</div>
					</>
				) : (
					<SkeletonDelta />
				)}
			</div>
			{openAlbum ? <AddToAlbum image={image} openAlbum={openAlbum} setOpenAlbum={setOpenAlbum}/> : null}
		</>
	);
}
