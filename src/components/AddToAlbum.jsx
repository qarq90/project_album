import ImageStore from "@/stores/ImageStore";
import {useEffect, useState} from "react";
import {slideIn} from "@/styles/animations/slide";
import a from "@/styles/components/add.module.css";
import {AnimatePresence, motion} from "framer-motion";
import {Button} from "@/components/ui/Button";
import {Title} from "@/components/ui/Title";
import {Input} from "@/components/ui/Input";
import UserStore from "@/stores/UserStore";
import {urlToBase64} from "@/lib/imageHelper";

export const AddToAlbum = (props) => {

	const [create, setCreate] = useState(false);
	const [name, setName] = useState("");
	const [albums, setAlbums] = useState(null);

	const {
		imageData
	} = ImageStore()

	const {
		userId
	} = UserStore()

	function closeHandler() {
		props.setOpenAlbum(false);
	}

	function openCreateHandler() {
		setCreate(true)
	}

	function cancelHandler() {
		setCreate(false)
	}

	async function createHandler() {

		if (name === "") {
			alert("Please enter name");
			return;
		}

		const base64Url = await urlToBase64(imageData.src.original);

		const request = {
			userId: userId,
			albums: [
				{
					albumId: new Date().getTime().toString(),
					albumTitle: name,
					albumData: [
						{
							url: base64Url,
							description: imageData.alt || '',
							createdAt: new Date().toISOString()
						}
					]
				}
			]
		};

		try {
			const response = await fetch('/api/post/album/create', {
				method: 'POST', headers: {
					'Content-Type': 'application/json',
				}, body: JSON.stringify(request),
			});

			const data = await response.json();

			if (data.status) {
				props.setOpenAlbum(false)
			} else {
				alert(data.message)
			}
		} catch (e) {
			console.log(e)
		}
	}

	async function addToCurrentAlbum(albumId, index) {
		try {
			const imageUrl = imageData.src.original;
			const imageAlt = imageData.alt || '';

			const response = await fetch(imageUrl);
			const blob = await response.blob();
			const base64Image = await urlToBase64(blob);

			const request = {
				userId: userId,
				albumId: albumId,
				index: index,
				image: {
					url: base64Image,
					description: imageAlt,
					createdAt: new Date().toISOString()
				}
			};

			const res = await fetch('/api/post/album/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(request)
			});

			const data = await res.json();

			if (data.status) {
				props.setOpenAlbum(false)
			} else {
				alert('Failed to add image to album');
			}
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		const fetchAlbums = async () => {
			const request = {
				userId: userId,
			};

			if (albums === null) {
				try {
					const response = await fetch('/api/post/album/fetch', {
						method: 'POST', headers: {
							'Content-Type': 'application/json',
						}, body: JSON.stringify(request),
					});

					const data = await response.json();

					if (data.status) {
						setAlbums(data.result.albums)
					}
				} catch (e) {
					console.log(e)
				}
			}
		}
		fetchAlbums()
	}, [albums, userId])

	return (
		<>
			<AnimatePresence>
				<motion.div
					initial="initial"
					animate="animate"
					exit="exit"
					variants={slideIn}
					className={a.add}
				>
					<Title text="Add To Album"/>
					<div className={a.albumGrid}>
						{
							albums !== null
								?
								<>
									<div className={a.album} onClick={openCreateHandler}>
										Create a new album
									</div>
									{albums.map((album, index) => (
										<div
											className={a.album}
											key={album.index}
											style={{
												backgroundImage: `url(${albums[index].albumData[0].url})`,
												backgroundSize: 'cover',
												backgroundPosition: 'center',
											}}
											onClick={() => addToCurrentAlbum(albums[index].albumId, index)}
										>
											<p className={a.albumName}>{album.albumTitle}</p>
										</div>
									))}
								</> : <div className={a.album} onClick={openCreateHandler}>
									Create a new album
								</div>
						}
					</div>
					<div className={a.btnContainer}>
						<Button text="Close" onClick={closeHandler}/>
					</div>
				</motion.div>
				{create ? <>
					<motion.div
						initial="initial"
						animate="animate"
						exit="exit"
						variants={slideIn}
						className={a.name}
					>
						<Title text="New Album"/>
						<Input placeholder="Enter album name..." onChange={(e) => setName(e.target.value)}/>
						<div className={a.btnContainer}>
							<Button text="Cancel" onClick={cancelHandler}/>
							<Button text="Create" onClick={createHandler}/>
						</div>
					</motion.div>
				</> : null}
			</AnimatePresence>
		</>
	)
}
