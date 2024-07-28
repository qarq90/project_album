import ImageStore from "@/stores/ImageStore";
import {useEffect} from "react";
import {slideIn} from "@/styles/animations/slide";
import a from "@/styles/components/add.module.css";
import {AnimatePresence, motion} from "framer-motion";
import {Button} from "@/components/ui/Button";
import {Title} from "@/components/ui/Title";

export const AddToAlbum = (props) => {

	const {
		imageId, imageData
	} = ImageStore()

	useEffect(() => {
		console.log(imageId)
		console.log(imageData)
	}, [imageId])

	function closeHandler() {
		props.setOpenAlbum(false);
	}

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
						<div className={a.album}>
							Create a new album
						</div>
						<div className={a.album}>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad distinctio eius esse
							expedita
							Aut
						</div>
						<div className={a.album}>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad distinctio eius esse
							expedita
							Aut
						</div>
						<div className={a.album}>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad distinctio eius esse
							expedita
							Aut
						</div>
						<div className={a.album}>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad distinctio eius esse
							expedita
							Aut
						</div>
						<div className={a.album}>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad distinctio eius esse
							expedita
							Aut
						</div>
						<div className={a.album}>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad distinctio eius esse
							expedita
							Aut
						</div>
						<div className={a.album}>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad distinctio eius esse
							expedita
							Aut
						</div>
						<div className={a.album}>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad distinctio eius esse
							expedita
							Aut
						</div>
						<div className={a.album}>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad distinctio eius esse
							expedita
							Aut
						</div>
						<div className={a.album}>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad distinctio eius esse
							expedita
							Aut
						</div>
					</div>
					<div className={a.btnContainer}>
						<Button text="Close" onClick={closeHandler}/>
						<Button text="Add" onClick={closeHandler}/>
					</div>
				</motion.div>
			</AnimatePresence>
		</>
	)
}
