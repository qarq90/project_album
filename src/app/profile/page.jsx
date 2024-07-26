"use client"

import UserStore from "@/stores/UserStore";
import p from "@/styles/profile/profile.module.css"
import {Button} from "@/components/ui/Button";
import {useState} from "react";
import {Edit} from "@/components/Edit";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {AnimatePresence} from "framer-motion";

export default function Page() {

	const router = useRouter();

	const storageUserID = Cookies.get("storageUserID") || ""

	if (storageUserID === "") {

		router.push("/auth/login")

	}

	const {
		userId,
		userEmail,
		userPass,
		userName,
		userPhone,
		userPFP,
		setUserId,
		setUserEmail,
		setUserPass,
		setUserName,
		setUserPhone,
		setUserPFP
	} = UserStore()

	const pfp = userPFP

	const [editing, setEditing] = useState(false)

	function editHandler() {
		setEditing(!editing)
	}

	function logoutHandler() {
		router.push("/auth/login")
		setUserId("")
		setUserEmail("")
		setUserPass("")
		setUserName("")
		setUserPhone("")
		setUserPFP("")
	}

	return (
		<>
			<div className={p.profile + " " + (editing ? p.passive : "")}>
				<div className={p.pfpContainer}>
					<img className={p.pfp} src={pfp} alt=""/>
					<h1>{userName}</h1>
				</div>
				<div className={p.editContainer}>
					<div>
					</div>
					<div className={p.edit}>
						<Button text={editing ? "Cancel" : "Edit"} onClick={editHandler}/>
						<Button text="Log Out" onClick={logoutHandler}/>
					</div>
					<div>
					</div>
				</div>
			</div>
			<AnimatePresence>
				{editing && <Edit setEditing={setEditing} editing={editing}/>}
			</AnimatePresence>
		</>
	)
}
