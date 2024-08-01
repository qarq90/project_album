"use client"

import s from '@/styles/components/nav.module.css';
import Link from "next/link";
import {ModelIcon} from "../../public/icons/ModelIcon";

export const NavHalf = () => {

	return (
		<>
			<div className={s.nav}>
				<Alpha/>
			</div>
		</>
	);
};

const Alpha = () => {
	return (
		<>
			<div className={s.alpha}>
				<Link href="/">
					<ModelIcon
						fill="var(--primary-theme-color)"
						className={s.icon}
					/>
					<span className={s.span}>SnapShots</span>
				</Link>
			</div>
		</>
	)
}
