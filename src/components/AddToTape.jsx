import {useEffect, useState} from "react";
import {slideIn} from "@/styles/animations/slide";
import a from "@/styles/components/collections.module.css";
import {AnimatePresence, motion} from "framer-motion";
import {Button} from "@/components/ui/Button";
import {Title} from "@/components/ui/Title";
import {Input} from "@/components/ui/Input";
import UserStore from "@/stores/UserStore";
import {removeNameFromURL} from "@/lib/helperFunctions";
import VideoStore from "@/stores/VideoStore";
import {SkeletonCharlie} from "@/components/SkeletonCharlie";

export const AddToTape = (props) => {

	const [create, setCreate] = useState(false);
	const [name, setName] = useState("");
	const [tapes, setTapes] = useState(null);
	const [loading, setLoading] = useState(false)

	const {
		userId
	} = UserStore();

	const {
		setVideoFetcher
	} = VideoStore();

	function closeHandler() {
		props.setOpenTape(false);
	}

	function openCreateHandler() {
		setCreate(true);
	}

	function cancelHandler() {
		setCreate(false);
	}

	async function createHandler() {
		if (name === "") {
			alert("Please enter a name");
			return;
		}

		const videoAlt = removeNameFromURL(props.video.url);
		const hdFile = props.video.video_files.find(file => file.quality === 'hd');

		const request = {
			userId: userId,
			tapes: [
				{
					tapeId: new Date().getTime().toString(),
					tapeTitle: name,
					tapeData: [
						{
							url: props.video.image,
							videoId: props.video.id,
							description: videoAlt,
							width: props.video.width,
							height: props.video.height,
							createdAt: new Date().toISOString()
						}
					]
				}
			]
		};

		try {
			const response = await fetch('/api/post/collections/tapes/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(request),
			});

			const data = await response.json();

			if (data.status) {
				setVideoFetcher(true)
				props.setOpenTape(false);
			} else {
				alert(data.message);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function addToCurrentTape(tapeId) {
		try {
			const videoAlt = removeNameFromURL(props.video.url);

			const request = {
				userId: userId,
				tapeId: tapeId,
				video: {
					url: props.video.image,
					videoId: props.video.id,
					description: videoAlt,
					width: props.video.width,
					height: props.video.height,
					createdAt: new Date().toISOString()
				}
			};

			const res = await fetch('/api/post/collections/tapes/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(request)
			});

			const data = await res.json();

			if (data.status) {
				setVideoFetcher(true)
				props.setOpenTape(false);
			} else {
				alert('Failed to add video to tape');
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		const fetchTapes = async () => {
			const request = {
				userId: userId,
			};

			if (tapes === null) {
				try {
					const response = await fetch('/api/post/collections/tapes/fetch', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(request),
					});

					const data = await response.json();

					if (data.status) {
						setVideoFetcher(false)
						setTapes(data.result.tapes);
					}
				} catch (e) {
					console.log(e);
				}
			}
		};
		fetchTapes().then(() => setLoading(true));
	}, [setVideoFetcher, tapes, userId]);

	return (
		<>
			<AnimatePresence>
				<motion.div
					initial="initial"
					animate="animate"
					exit="exit"
					variants={slideIn}
					className={a.addContainer}
				>
					<Title text="Add To Tape"/>
					<div className={a.albumGrid}>
						{
							loading ?
								<>
									{
										tapes !== null ? (
											<>
												<div className={a.album} onClick={openCreateHandler}>
													Create a new tape
												</div>
												{
													tapes.map((tape, index) => (
														<div
															className={a.album}
															key={tape.index}
															style={{
																backgroundImage: `url(${tape.tapeData[0].url})`,
																backgroundSize: 'cover',
																backgroundPosition: 'center',
															}}
															onClick={() => addToCurrentTape(tapes[index].tapeId, index)}
														>
															<p className={a.albumName}>{tape.tapeTitle}</p>
														</div>
													))
												}
											</>
										) : (
											<>
												<div className={a.album} onClick={openCreateHandler}>
													Create a new tape
												</div>
											</>
										)}
								</> :
								<>
									<div className={a.album} onClick={openCreateHandler}>
										Create a new tape
									</div>
									<SkeletonCharlie/>
									<SkeletonCharlie/>
									<SkeletonCharlie/>
									<SkeletonCharlie/>
									<SkeletonCharlie/>
								</>
						}
					</div>
					<div className={a.btnContainer}>
						<Button text="Close" onClick={closeHandler}/>
					</div>
				</motion.div>
				{
					create ? (
						<motion.div
							initial="initial"
							animate="animate"
							exit="exit"
							variants={slideIn}
							className={a.name}
						>
							<Title text="New Tape"/>
							<Input placeholder="Enter tape name..." onChange={(e) => setName(e.target.value)}/>
							<div className={a.btnContainer}>
								<Button text="Cancel" onClick={cancelHandler}/>
								<Button text="Create" onClick={createHandler}/>
							</div>
						</motion.div>
					) : null
				}
			</AnimatePresence>
		</>
	);
};
