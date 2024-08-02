import p from "@/styles/pages/profile/profile.module.css";
import i from "@/styles/pages/auth/auth.module.css";
import UserStore from "@/stores/UserStore";
import {slideIn} from "@/styles/animations/slide";
import {emailRegex, phoneRegex} from "@/lib/helperAuth";
import {AnimatePresence, motion} from 'framer-motion';
import {useEffect, useRef, useState} from "react";
import {Input} from "@/components/ui/Input";
import {Label} from "@/components/ui/Label";
import {Button} from "@/components/ui/Button";
import {UploadIcon} from "../../public/icons/UploadIcon";
import {Hint} from "@/components/ui/Hint";
import {useRouter} from "next/navigation";
import {useFetchUser} from "@/hooks/useFetchUser";

export const ProfileEdit = (props) => {

	const router = useRouter();

	const fetchUser = useFetchUser(router);

	const fileInputRef = useRef(null);

	const {
		userEmail,
		userPass,
		userName,
		userPhone,
		userPFP,
	} = UserStore();

	const [newEmail, setEmail] = useState("");
	const [newPassword, setPassword] = useState("");
	const [newName, setName] = useState("");
	const [newPhone, setPhone] = useState("");
	const [newPFP, setPFP] = useState("");

	const [pass,setPass] = useState(false)

	useEffect(() => {
		setEmail(userEmail);
		setPassword(userPass);
		setName(userName);
		setPhone(userPhone);
		setPFP(userPFP);
	}, []);

	function closeHandler() {
		props.setEditing(false);
	}

	async function editHandler() {

		if (newEmail === "" || newPassword === "" || newName === "" || newPhone === "") {
			alert("Input fields cannot be empty");
			return
		}

		if (newPFP === "") {
			alert("Please add a valid Profile Picture");
			return
		}

		if (!emailRegex.test(newEmail)) {
			alert("Please enter a valid Email address");
			return
		}

		if (!phoneRegex.test(newPhone)) {
			alert("Please enter a valid Phone number");
			return
		}

		const request = {
			email: userEmail,
			pass: newPassword,
			name: newName,
			phone: newPhone,
			pfp: newPFP,
		};

		try {
			const response = await fetch(`/api/post/profile/update`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(request),
			});

			const data = await response.json();

			if (data.status) {
				props.setEditing(false);
				await fetchUser();
			} else {
				alert(data.message);
			}
		} catch (e) {
			console.log(e);
		}
	}

	const handleFileButtonClick = () => {
		fileInputRef.current.click();
	};

	const handleImgUpload = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onloadend = () => {
			setPFP(reader.result);
		};

		if (file) {
			reader.readAsDataURL(file);
		}
	};

	return (
		<AnimatePresence>
			{
				props.editing && (
					<motion.div
						initial="initial"
						animate="animate"
						exit="exit"
						variants={slideIn}
						className={p.editComponent}
					>
						<Label text="Email"/>
						<Input value={newEmail} type="text"/>
						<Label text="Password"/>
						<Input
							value={pass ? newPassword : "************"}
							type="text"
							onChange={(e) => setPassword(e.target.value)}
							onFocus={()=>setPass(true)}
							onBlur={()=>setPass(false)}
						/>
						<Label text="Username"/>
						<Input
							value={newName}
							type="text"
							onChange={(e) => setName(e.target.value)}
						/>
						<Label text="Phone"/>
						<Input
							value={newPhone}
							type="text"
							onChange={(e) => setPhone(e.target.value)}
						/>
						<div>
							<Label text="Profile Picture"/>
							<div className={i.pfp}>
								<Button
									text={
										<>
											<UploadIcon/> Upload Image
										</>
									}
									onClick={handleFileButtonClick}
								/>
								<Hint text="Supported formats: JPG, PNG"/>
							</div>
							<input
								type="file"
								id="img"
								className={i.image}
								ref={fileInputRef}
								onChange={handleImgUpload}
							/>
						</div>
						<Button text="Close" onClick={closeHandler}/>
						<Button text="Update" onClick={editHandler}/>
					</motion.div>
				)
			}
		</AnimatePresence>
	);
};
