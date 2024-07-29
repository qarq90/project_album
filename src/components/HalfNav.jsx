"use client"

import Link from "next/link";
import s from '@/styles/components/nav.module.css';
import {ModelIcon} from "../../public/icons/ModelIcon";

export const HalfNav = () => {

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
