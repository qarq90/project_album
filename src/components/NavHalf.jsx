"use client"

import s from '@/styles/components/nav.module.css';
import Link from "next/link";
import {ModelIcon} from "../../public/icons/ModelIcon";
import {itemVariants} from "@/styles/animations/scale";
import {motion} from "framer-motion";

export const NavHalf = () => {

	return (
		<>
			<motion.div
				variants={itemVariants}
				initial="hidden"
				animate="visible"
				transition={{type: 'spring', stiffness: 300}}
				className={s.nav}
			>
				<Alpha/>
			</motion.div>
		</>
	);
};

const Alpha = () => {
	return (
		<>
			<motion.div
				className={s.alpha}
				variants={itemVariants}
				initial="hidden"
				animate="visible"
				transition={{type: 'spring', stiffness: 300}}
			>
				<Link href="/">
					<ModelIcon
						fill="var(--primary-theme-color)"
						className={s.icon}
					/>
					<span className={s.span}>SnapShots</span>
				</Link>
			</motion.div>
		</>
	)
}
