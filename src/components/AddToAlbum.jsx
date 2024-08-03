import c from "@/styles/components/collections.module.css";
import UserStore from "@/stores/UserStore";
import {slideIn} from "@/styles/animations/slide";
import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/Button";
import {Title} from "@/components/ui/Title";
import {Input} from "@/components/ui/Input";
import ImageStore from "@/stores/ImageStore";
import {SkeletonCharlie} from "@/components/SkeletonCharlie";

export const AddToAlbum = (props) => {

	const [create, setCreate] = useState(false);
	const [name, setName] = useState("");
	const [albums, setAlbums] = useState(null);
	const [loading, setLoading] = useState(true);

	const {
		userId
	} = UserStore()

	const {
		setImageFetcher
	} = ImageStore();

	function closeHandler() {
		props.setOpenAlbum(false);
	}

	function openCreateHandler() {
		setCreate(true)
	}

	function cancelHandler() {
		setCreate(false)
	}

	async function createHandler(e) {

		if (e.type === "keydown" && e.key === "Enter" || e.type === "click") {
			if (name === "") {
				alert("Please enter an album name...");
				return;
			}

			const request = {
				userId: userId,
				albums: [
					{
						albumId: new Date().getTime().toString(),
						albumTitle: name,
						albumData: [
							{
								url: props.image.src.original,
								imageId: props.image.id,
								description: props.image.alt || '',
								width: props.image.width,
								height: props.image.height,
								createdAt: new Date().toISOString()
							}
						]
					}
				]
			};

			try {
				const response = await fetch('/api/post/collections/albums/create', {
					method: 'POST', headers: {
						'Content-Type': 'application/json',
					}, body: JSON.stringify(request),
				});

				const data = await response.json();

				if (data.status) {
					setImageFetcher(true)
					props.setOpenAlbum(false)
				} else {
					alert(data.message)
				}
			} catch (e) {
				console.log(e)
			}
		}
	}

	async function addToCurrentAlbum(albumId, index) {
		try {

			const request = {
				userId: userId,
				albumId: albumId,
				index: index,
				image: {
					url: props.image.src.original,
					imageId: props.image.id,
					description: props.image.alt || '',
					width: props.image.width,
					height: props.image.height,
					createdAt: new Date().toISOString()
				}
			};

			const res = await fetch('/api/post/collections/albums/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(request)
			});

			const data = await res.json();

			if (data.status) {
				setImageFetcher(true)
				props.setOpenAlbum(false)
			} else {
				alert('Failed to add slug to album');
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
					const response = await fetch('/api/post/collections/albums/fetch', {
						method: 'POST', headers: {
							'Content-Type': 'application/json',
						}, body: JSON.stringify(request),
					});

					const data = await response.json();

					if (data.status) {
						setImageFetcher(false)
						setAlbums(data.result.albums)
					}
				} catch (e) {
					console.log(e)
				}
			}
		}
		fetchAlbums().then(() => null)
		setLoading(false)
	}, [albums, setImageFetcher, userId])

	return (
		<>
			<AnimatePresence>
				<motion.div
					initial="initial"
					animate="animate"
					exit="exit"
					variants={slideIn}
					className={c.addContainer}
				>
					<Title text="Add To Album"/>
					<div className={c.albumGrid}>
						{
							albums !== null
								?
								<>
									<div className={c.album} onClick={openCreateHandler}>
										Create a new tape
									</div>
									{
										albums.map((album, index) => (
											<div
												className={c.album}
												key={album.index}
												style={{
													backgroundImage: `url(${albums[index].albumData[0].url})`,
													backgroundSize: 'cover',
													backgroundPosition: 'center',
												}}
												onClick={() => addToCurrentAlbum(albums[index].albumId, index)}
											>
												<p className={c.albumName}>{album.albumTitle}</p>
											</div>
										))
									}
								</> :
								<>
									<div className={c.album} onClick={openCreateHandler}>
										Create a new tape
									</div>
									{
										!loading ?
											<>
												<SkeletonCharlie/>
												<SkeletonCharlie/>
												<SkeletonCharlie/>
												<SkeletonCharlie/>
												<SkeletonCharlie/>
											</> : <></>
									}
								</>
						}
					</div>
					<div className={c.btnContainer}>
						<Button text="Close" onClick={closeHandler}/>
					</div>
				</motion.div>
				{
					create ?
						<>
							<motion.div
								initial="initial"
								animate="animate"
								exit="exit"
								variants={slideIn}
								className={c.name}
							>
								<Title text="New Album"/>
								<Input placeholder="Enter album name..." onKeyDown={createHandler}
								       onChange={(e) => setName(e.target.value)}/>
								<div className={c.btnContainer}>
									<Button text="Cancel" onClick={cancelHandler}/>
									<Button text="Create" onClick={createHandler}/>
								</div>
							</motion.div>
						</> : null
				}
			</AnimatePresence>
		</>
	)
}
