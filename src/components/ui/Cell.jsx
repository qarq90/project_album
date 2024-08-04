import s from "@/styles/globals.module.css"
import {itemVariants} from "@/styles/animations/scale"
import Link from "next/link"
import {FaArrowLeft, FaDownload, FaExternalLinkAlt, FaExternalLinkSquareAlt, FaLink} from "react-icons/fa"
import {motion} from "framer-motion"
import {getCellType, handleDownload, removeNameFromURL} from "@/lib/helperFunctions"
import {FaArrowUpFromBracket, FaTentArrowDownToLine} from "react-icons/fa6";

export const Cell = (props) => {

	const cellType = getCellType(props.data.width, props.data.height)
	const downloadMedia = async () => {
		if (mediaType) {
			let name = props.data.alt || "snapshots_download.png"
			await handleDownload(props.data.src.original, 'image', name)
		} else {
			let name = removeNameFromURL(props.data.url)
			let hdFile = props.data.video_files.find(file => file.quality === 'hd')
			if (hdFile) {
				await handleDownload(hdFile.link, 'video', name)
			} else {
				console.error('No HD quality video found.')
			}
		}
	}

	const mediaType = props.type === 'image'

	return (
		<>
			<motion.div
				key={props.index}
				className={`${s.cell} ${s[cellType]}`}
				variants={itemVariants}
				transition={{type: 'spring', stiffness: 300}}
			>
				<Link
					href={mediaType ? `/image/${props.data.id}` : `/video/${props.data.id}`}
				>
					<img
						className={s.cellContent}
						src={mediaType ? props.data.src.original : props.data.image}
						alt={props.data.alt}
					/>
				</Link>
				<div className={s.cellActions}>
					<div className={s.actionA}>
						<Link
							className={s.cellLink}
							href={mediaType ? `/image/${props.data.id}` : `/video/${props.data.id}`}
						>
							<FaExternalLinkAlt /> {mediaType ? " View Image" : " Visit Video"}
						</Link>
					</div>
					<div className={s.actionB}>
						<span className={s.action}>
							<FaDownload
								onClick={() => downloadMedia(
									mediaType ? props.data.src.original : 'video',
									mediaType ? 'image' : 'video', props.data.alt
								)}
							/>
						</span>
					</div>
				</div>
			</motion.div>
		</>
	)
}
