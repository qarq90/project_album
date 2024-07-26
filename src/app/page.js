"use client"

import s from "@/styles/globals.module.css"
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import UserStore from "@/stores/UserStore";
import {ImageGrid} from "@/components/ImageGrid";
import {VideoGrid} from "@/components/VideoGrid";
import {EmptySpace} from "@/components/ui/EmptySpace";

export default function Page() {

	const router = useRouter();

	const {
		setUserId,
		setUserEmail,
		setUserPass,
		setUserName,
		setUserPhone,
		setUserPFP
	} = UserStore()

	useEffect(() => {
		const fetchUser = async () => {
			const storageUserID = Cookies.get("storageUserID") || ""

			if (storageUserID === "") {

				router.push("/auth/login")

			} else {
				const request = {
					_id: storageUserID,
				}
				try {
					const response = await fetch(`/api/post/auth/fetch`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(request),
					})

					const data = await response.json()

					setUserId(data.result._id)
					setUserEmail(data.result.email)
					setUserPass(data.result.pass)
					setUserName(data.result.name)
					setUserPhone(data.result.phone)
					setUserPFP(data.result.pfp)

				} catch (e) {
					console.log(e)
				}
			}
		}
		fetchUser()
	}, []);

	return (
		<>
			<div className={s.wrapper}>
				<span className={s.type}>IMAGES</span>
				<EmptySpace/>
				<ImageGrid url={`https://api.pexels.com/v1/curated?per_page=10`}/>
				<EmptySpace/>
				<span className={s.type}>VIDEOS</span>
				<EmptySpace/>
				<VideoGrid url={`https://api.pexels.com/videos/popular?per_page=10`}/>
			</div>
		</>
	);
};
