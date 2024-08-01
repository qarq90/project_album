import {useEffect, useState} from "react";
import {slideIn} from "@/styles/animations/slide";
import a from "@/styles/components/add.module.css";
import {AnimatePresence, motion} from "framer-motion";
import {Button} from "@/components/ui/Button";
import {Title} from "@/components/ui/Title";
import {Input} from "@/components/ui/Input";
import UserStore from "@/stores/UserStore";
import VideoStore from "@/stores/VideoStore";
import {removeNameFromURL, urlToBase64} from "@/lib/helperFunctions";

export const AddToTape = (props) => {

	const [create, setCreate] = useState(false);
	const [name, setName] = useState("");
	const [tapes, setTapes] = useState(null);

	const {
		videoStore
	} = VideoStore();

	const {
		userId
	} = UserStore();

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

		const base64 = await urlToBase64(videoStore.image)
		const videoAlt = removeNameFromURL(videoStore.url);

		const request = {
			userId: userId,
			tapes: [
				{
					tapeId: new Date().getTime().toString(),
					tapeTitle: name,
					tapeData: [
						{
							base64: base64,
							videoId: videoStore.id,
							description: videoAlt,
							createdAt: new Date().toISOString()
						}
					]
				}
			]
		};

		try {
			const response = await fetch('/api/post/tape/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(request),
			});

			const data = await response.json();

			if (data.status) {
				props.setOpenTape(false);
			} else {
				alert(data.message);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async function addToCurrentTape(tapeId, index) {
		try {
			const base64 = await urlToBase64(videoStore.image);
			const videoAlt = removeNameFromURL(videoStore.url);

			const request = {
				userId: userId,
				tapeId: tapeId,
				video: {
					base64: base64,
					videoId: videoStore.id,
					description: videoAlt,
					createdAt: new Date().toISOString()
				}
			};

			const res = await fetch('/api/post/tape/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(request)
			});

			const data = await res.json();

			if (data.status) {
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
					const response = await fetch('/api/post/tape/fetch', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(request),
					});

					const data = await response.json();

					if (data.status) {
						setTapes(data.result.tapes);
					}
				} catch (e) {
					console.log(e);
				}
			}
		};
		fetchTapes();
	}, [tapes, userId]);

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
					<Title text="Add To Tape"/>
					<div className={a.albumGrid}>
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
													backgroundImage: `url(${tape.tapeData[0].base64})`,
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
