"use client"

import Link from "next/link";
import s from '@/styles/components/nav.module.css';
import {ModelIcon} from "../../public/icons/ModelIcon";
import {NavLeft, NavRight} from "@/lib/navHelper";
import UserStore from "@/stores/UserStore";
import {UserIcon} from "../../public/icons/UserIcon";

export const FullNav = () => {

	return (
		<>
			<div className={s.nav}>
				<Alpha/>
				<Beta/>
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
				{
					NavLeft.map((link, index) => (
						<div key={index}>
							<Link href={link.href}>
								{link.text}
							</Link>
						</div>
					))
				}
			</div>
		</>
	)
}

const Beta = () => {

	const {
		userPFP
	} = UserStore()

	return (
		<>
			<div className={s.beta}>
				{
					userPFP.length !== 0 ?
						<>
							<img className={s.img} src={userPFP} alt="pfp"/>
						</> :
						<>
							<UserIcon
								fill="var(--primary-theme-color)"
								className={s.img}
							/>
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
			</div>
		</>
	)
}
