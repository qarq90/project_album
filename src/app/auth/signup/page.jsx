"use client"

import {useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {Title} from "@/components/ui/Title";
import {Label} from "@/components/ui/Label";
import {Input} from "@/components/ui/Input";
import {Hint} from "@/components/ui/Hint";
import {Button} from "@/components/ui/Button";
import s from "@/styles/globals.module.css"
import i from "@/styles/auth/auth.module.css"
import Link from "next/link";
import {UploadIcon} from "../../../../public/icons/UploadIcon";
import {emailRegex, phoneRegex} from "@/lib/authHelper";
import UserStore from "@/stores/UserStore";

export default function Page() {

	const router = useRouter();

	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [pfp, setPfp] = useState("");

	const fileInputRef = useRef(null);

	const {
		setUserEmail,
		setUserPass,
		setUserName,
		setUserPhone,
		setUserPFP
	} = UserStore()

	const handleFileButtonClick = () => {
		fileInputRef.current.click();
	};

	const handleImgUpload = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onloadend = () => {
			setPfp(reader.result);
		};

		if (file) {
			reader.readAsDataURL(file);
		}
	};

	async function signupHandler() {

		if (email === "" || pass === "" || name === "" || phone === "") {
			alert("Input fields cannot be empty");
			return
		}

		if (email.length < 8 || pass.length < 8) {
			alert("Email and Password must be atleast 8 characters long");
			return
		}

		if (pfp === "") {
			alert("Please add a valid Profile Picture");
			return
		}

		if (!emailRegex.test(email)) {
			alert("Please enter a valid Email address");
			return
		}

		if (!phoneRegex.test(phone)) {
			alert("Please enter a valid Phone number");
		}

		const request = {
			email: email,
			pass: pass,
			name: name,
			phone: phone,
			pfp: pfp
		}

		try {
			const response = await fetch("/api/post/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(request),
			})

			const data = await response.json();

			if (data.status) {

				setUserEmail(email)
				setUserPass(pass)
				setUserName(name)
				setUserPhone(phone)
				setUserPFP(pfp)

				router.push("/auth/login");
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
				<Title text="Signup"/>

				<Label text="Email"/>
				<Input placeholder="deepthorat06@gmail.com"
				       type="text"
				       value={email}
				       onChange={(e) => setEmail(e.target.value)}
				/>

				<Label text="Password"/>
				<Input placeholder="************"
				       type="text"
				       value={pass}
				       onChange={(e) => setPass(e.target.value)}
				/>

				<Label text="Username"/>
				<Input placeholder="Deep Thorat"
				       type="text"
				       value={name}
				       onChange={(e) => setName(e.target.value)}
				/>

				<Label text="Phone"/>
				<Input placeholder="95427*****"
				       type="text"
				       value={phone}
				       onChange={(e) => setPhone(e.target.value)}
				/>

				<div>
					<Label text="Profile Picture"/>
					<div className={i.pfp}>
						<Button
							text={<><UploadIcon/> Upload Image</>}
							onClick={handleFileButtonClick}
						/>
						<Hint text="Supported formats: JPG, PNG"/>
					</div>
					<input
						type="file"
						id="img"
						className={i.img}
						ref={fileInputRef}
						onChange={handleImgUpload}
					/>
				</div>

				<Button text="Sign Up" onClick={signupHandler}/>
				<Link href="/auth/login">
					<Hint text="Already have an account? Login Now."/>
				</Link>
			</div>
		</>
	)
}
