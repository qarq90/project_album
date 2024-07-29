"use client";

import {useEffect, useState} from "react";
import s from "@/styles/image/image.module.css";
import g from "@/styles/globals.module.css";
import {Button} from "@/components/ui/Button";
import {handleDownload, removeNumbersAndTrailingChars} from "@/lib/imageHelper";
import {useRouter} from "next/navigation";
import {useFetchUser} from "@/hooks/fetchUser";
import {AddToAlbum} from "@/components/AddToAlbum";
import ImageStore from "@/stores/ImageStore";

export default function Page({params}) {

	const slug = params.slug;

	const [image, setImage] = useState(null);
	const [resolution, setResolution] = useState("Original");
	const [openAlbum, setOpenAlbum] = useState(false);

	const {
		setImageId,
		setImageData
	} = ImageStore()

	const router = useRouter();

	const fetchUser = useFetchUser(router);

	useEffect(() => {
		fetchUser()
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
				setImageId(data.id)
				setImageData(data)
				setImage(data);
			} catch (error) {
				console.error('Error fetching the images:', error);
			}
		};

		fetchImage();
	}, [slug]);

	const resolutionUrls = {
		Landscape: image?.src.landscape,
		Large: image?.src.large,
		'2X Large': image?.src['2x_large'],
		Medium: image?.src.medium,
		Original: image?.src.original,
		Portrait: image?.src.portrait,
		Small: image?.src.small,
		Tiny: image?.src.tiny,
	};

	function downloadHandler() {
		if (image && resolutionUrls[resolution]) {
			let name = image.url ? image.url.split('/').pop() : 'download.png';
			name = removeNumbersAndTrailingChars(name);

			handleDownload(resolutionUrls[resolution], name);
		} else {
			console.log('No image available or resolution is not set.');
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
			const response = await fetch(image.src.original);
			const blob = await response.blob();
			const base64 = await blobToBase64(blob);
			setOpenAlbum(true)
			return base64;
		} catch (error) {
			console.error('Error converting image URL to base64:', error);
		}
	}

	return (
		<>
			<div className={g.wrapper}>
				{image ? (
					<>
						<img
							className={s.image}
							src={image.src.original}
							alt={image.alt || slug}
						/>
						<h2 className={s.name}>Photographer: {image.photographer}</h2>
						<div className={s.bottomContainer}>
							<select
								className={s.select}
								value={resolution}
								onChange={(e) => setResolution(e.target.value)}
							>
								<option value="Landscape">Landscape</option>
								<option value="Large">Large</option>
								<option value="2X Large">2X Large</option>
								<option value="Medium">Medium</option>
								<option value="Original">Original</option>
								<option value="Portrait">Portrait</option>
								<option value="Small">Small</option>
								<option value="Tiny">Tiny</option>
							</select>
							<Button text="Download" onClick={downloadHandler}/>
							<Button text="Add to Album" onClick={albumHandler}/>
						</div>
					</>
				) : (
					<p>Loading...</p>
				)}
			</div>
			{openAlbum ? <AddToAlbum openAlbum={openAlbum} setOpenAlbum={setOpenAlbum}/> : null}
		</>
	);
}
