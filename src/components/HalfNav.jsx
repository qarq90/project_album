"use client"

import Link from "next/link";
import s from '@/styles/components/nav.module.css';
import {ModelIcon} from "../../public/icons/ModelIcon";
import {darkenRgb, rgbToComplementary} from "@/lib/imageHelper";

export const HalfNav = () => {

	const r = Math.floor(Math.random() * 100) + 1;
	const g = Math.floor(Math.random() * 100) + 1;
	const b = Math.floor(Math.random() * 100) + 1;

	const rgb = `rgb(${r}, ${g}, ${b})`;
	let complementary = rgbToComplementary(rgb)
	let darkerComplementary = darkenRgb(complementary, 100)

	document.documentElement.style.setProperty('--primary-theme-color', complementary);
	document.documentElement.style.setProperty('--primary-dark-color', darkerComplementary);
	document.documentElement.style.setProperty('--secondary-dark-color', rgb);

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
