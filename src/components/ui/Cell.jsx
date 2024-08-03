import s from "@/styles/globals.module.css";
import {itemVariants} from "@/styles/animations/scale";
import Link from "next/link";
import {FaDownload} from "react-icons/fa";
import {motion} from "framer-motion";
import {getCellType, handleDownload} from "@/lib/helperFunctions";

export const Image = (props) => {

	const cellType = getCellType(props.image.width, props.image.height);
	const downloadMedia = async (url, type, name) => {
		name.length === 0 ? name = "snapshots_download.png" : name;
		await handleDownload(url, type, name).then(() => null)
	}

	return (
		<>
			<motion.div
				key={props.index}
				className={`${s.cell} ${s[cellType]}`}
				variants={itemVariants}
				transition={{type: 'spring', stiffness: 300}}
			>
				<Link
					href={`/image/${props.image.id}`}>
					<img
						className={s.cellContent}
						src={props.image.src.original}
						alt={props.image.alt}
					/>
				</Link>
				<div className={s.cellActions}>
					<div className={s.actionA}>
						<Link className={s.cellLink}
						      href={`/image/${props.image.id}`}>
							View Image
						</Link>
					</div>
					<div className={s.actionB}>
						<span className={s.action}>
							<FaDownload
								onClick={() => downloadMedia(props.image.src.original, 'image', props.image.alt)}
							/>
						</span>
					</div>
				</div>
			</motion.div>
		</>
	)
}
