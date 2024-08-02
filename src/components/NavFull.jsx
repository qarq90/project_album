"use client"

import s from '@/styles/components/nav.module.css';
import Link from "next/link";
import UserStore from "@/stores/UserStore";
import {NavLeft, NavRight} from "@/lib/objNav";
import {ModelIcon} from "../../public/icons/ModelIcon";
import {UserIcon} from "../../public/icons/UserIcon";
import {itemVariants} from "@/styles/animations/scale";
import {motion} from "framer-motion";

export const NavFull = () => {

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
				<Beta/>
			</motion.div>
		</>
	);
};

const Alpha = () => {
	return (
		<>
			<motion.div
				variants={itemVariants}
				transition={{type: 'spring', stiffness: 300}}
				className={s.alpha}
			>
				<Link href="/">
					<ModelIcon
						fill="var(--primary-theme-color)"
						className={s.icon}
					/>
					<span className={s.span}>SnapShots</span>
				</Link>
				{
					NavLeft.map((link, index) => (
						<div key={index}>
							<Link href={link.href}>
								{link.text}
							</Link>
						</div>
					))
				}
			</motion.div>
		</>
	)
}

const Beta = () => {

	const {
		userPFP
	} = UserStore()

	return (
		<>
			<motion.div
				variants={itemVariants}
				transition={{type: 'spring', stiffness: 300}}
				className={s.beta}
			>
				{
					userPFP.length !== 0 ?
						<>
							<Link href="/profile">
								<img className={s.img} src={userPFP} alt="pfp"/>
							</Link>
						</>
						:
						<>
							<Link href="/profile">
								<UserIcon
									fill="var(--primary-theme-color)"
									className={s.img}
								/>
							</Link>
						</>
				}
				{
					NavRight.map((link, index) => (
						<div key={index}>
							<Link href={link.href}>
								{link.text}
							</Link>
						</div>
					))
				}
			</motion.div>
		</>
	)
}
