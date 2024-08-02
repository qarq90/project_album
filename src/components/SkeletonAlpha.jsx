import s from "@/styles/components/skeleton.module.css";
import {motion} from "framer-motion";
import {itemVariants} from "@/styles/animations/scale";

const shuffleArray = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

export const SkeletonAlpha = (props) => {
	const gridTypes = ['square', 'panorama', 'portrait', 'landscape'];
	let gridItems = [...gridTypes, ...gridTypes, ...gridTypes];
	gridItems = shuffleArray(gridItems);

	return (
		<>
			{
				props.isHome ?
					<>
						<motion.div
							className={s.skeletonTitle}
							variants={itemVariants}
							initial="hidden"
							animate="visible"
							transition={{type: 'spring', stiffness: 300, duration: 1.5}}
						></motion.div>
					</> :
					<></>
			}
			<div className={s.container}>
				{
					gridItems.map((type, index) => (
						<motion.div
							key={index}
							className={s[type]}
							variants={itemVariants}
							initial="hidden"
							animate="visible"
							transition={{type: 'spring', stiffness: 300, duration: 1.5}}
						/>
					))
				}
			</div>
		</>
	);
};
