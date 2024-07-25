"use client"

import {useState} from "react";
import {useRouter} from "next/navigation";
import {Title} from "@/components/ui/Title";
import {Label} from "@/components/ui/Label";
import {Input} from "@/components/ui/Input";
import {Hint} from "@/components/ui/Hint";
import {Button} from "@/components/ui/Button";
import s from "@/styles/globals.module.css"
import Link from "next/link";
import UserStore from "@/stores/UserStore";
import Cookies from "js-cookie"

export default function Page() {

	const router = useRouter();

	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	const {
		setUserId,
		setUserEmail,
		setUserPass,
		setUserName,
		setUserPhone,
		setUserPFP
	} = UserStore()

	async function loginHandler() {

		if (email === "" || pass === "") {
			alert("Input fields cannot be empty");
			return
		}

		const request = {
			email: email,
			pass: pass,
		}

		try {
			const response = await fetch("/api/post/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(request),
			})

			const data = await response.json();

			if (data.status) {

				setUserId(data.result._id)
				setUserEmail(data.result.email)
				setUserPass(data.result.pass)
				setUserName(data.result.name)
				setUserPhone(data.result.phone)
				setUserPFP(data.result.pfp)

				const userId = data.result._id
				Cookies.set("storageUserID", userId, {expires: 7})

				router.push("/profile");
			} else {
				alert(data.message);
			}
		} catch (e) {
			console.log(e)
		}

	}

	return (
		<>
			<div className={s.container}>
				<Title text="Login"/>
				<Label text="Email"/>
				<Input placeholder="deepthorat06@gmail.com"
				       type="text"
				       value={email}
				       onChange={(e) => setEmail(e.target.value)}
				/>
				<Label text="Password"/>
				<Input placeholder="************"
				       value={pass}
				       type="password"
				       onChange={(e) => setPass(e.target.value)}
				/>
				<Button text="Login" onClick={loginHandler}/>
				<Link href="/auth/signup">
					<Hint text="Don&apos;t have an account? Register Now."/>
				</Link>
			</div>
		</>
	)
}
