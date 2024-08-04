"use client"

import g from "@/styles/globals.module.css"
import a from "@/styles/pages/auth/auth.module.css"
import Link from "next/link";
import Cookies from "js-cookie";
import {emailRegex, phoneRegex} from "@/lib/helperAuth";
import {Hint} from "@/components/ui/Hint";
import {Title} from "@/components/ui/Title";
import {Label} from "@/components/ui/Label";
import {Input} from "@/components/ui/Input";
import {Button} from "@/components/ui/Button";
import {useRouter} from "next/navigation";
import {UploadIcon} from "../../../../public/icons/UploadIcon";
import {useEffect, useRef, useState} from "react";

export default function Page() {

	const router = useRouter();

	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [pfp, setPfp] = useState("");

	const fileInputRef = useRef(null);

	const handleFileButtonClick = () => {
		fileInputRef.current.click();
	};

	const handleImgUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			const fileType = file.type;
			const allowedTypes = ["image/jpeg", "image/png"];

			if (!allowedTypes.includes(fileType)) {
				alert("Unsupported file type. Please upload a JPG or PNG image.");
				return;
			}

			const reader = new FileReader();
			reader.onloadend = () => {
				setPfp(reader.result);
			};

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

				const userId = data.result._id
				Cookies.set("storageUserID", userId, {expires: 7})

				router.push("/");
			} else {
				alert(data.message);
			}
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		Cookies.remove("storageUserID")
	}, [])

	return (
		<>
			<div className={g.container}>
				<Title text="Signup"/>
				<Label text="Email"/>
				<Input placeholder="alicesmith98@gmail.com"
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
				<Input placeholder="Alice Smith"
				       type="text"
				       value={name}
				       onChange={(e) => setName(e.target.value)}
				/>

				<Label text="Phone"/>
				<Input placeholder="24856*****"
				       type="text"
				       value={phone}
				       onChange={(e) => setPhone(e.target.value)}
				/>

				<div>
					<Label text="Profile Picture"/>
					<div className={a.pfp}>
						<Button
							text={<><UploadIcon/> Upload Image</>}
							onClick={handleFileButtonClick}
						/>
						<Hint text="Supported formats: JPG, PNG"/>
					</div>
					<input
						type="file"
						id="img"
						className={a.image}
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
