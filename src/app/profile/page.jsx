"use client"

import UserStore from "@/stores/UserStore";
import p from "@/styles/profile/profile.module.css"
import {Button} from "@/components/ui/Button";
import {useEffect, useState} from "react";
import {ProfileEdit} from "@/components/ProfileEdit";
import {useRouter} from "next/navigation";
import {AnimatePresence} from "framer-motion";
import {UserIcon} from "../../../public/icons/UserIcon";
import {useFetchUser} from "@/hooks/useFetchUser";

export default function Page() {

	const router = useRouter();

	const fetchUser = useFetchUser(router);

	const {
		userName,
		userPFP,
		setUserId,
		setUserEmail,
		setUserPass,
		setUserName,
		setUserPhone,
		setUserPFP
	} = UserStore()

	const [editing, setEditing] = useState(false)

	function editHandler() {
		setEditing(!editing)
	}

	function logoutHandler() {
		setUserId("")
		setUserEmail("")
		setUserPass("")
		setUserName("")
		setUserPhone("")
		setUserPFP("")
		router.push("/auth/login")
	}

	useEffect(() => {
		fetchUser().then(() => null)
	}, [fetchUser]);

	return (
		<>
			<div className={p.profile + " " + (editing ? p.passive : "")}>
				<div className={p.pfpContainer}>
					{
						userPFP.length !== 0 ?
							<>
								<img className={p.pfp} src={userPFP} alt=""/>
								<h1>{userName}</h1>
							</> :
							<>
								<UserIcon
									fill="var(--primary-theme-color)"
									className={p.pfp}
								/>
								<h1>........</h1>
							</>
					}
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
				{editing && <ProfileEdit setEditing={setEditing} editing={editing}/>}
			</AnimatePresence>
		</>
	)
}
