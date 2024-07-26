import {Input} from "@/components/ui/Input";
import UserStore from "@/stores/UserStore";
import {Label} from "@/components/ui/Label";
import {Button} from "@/components/ui/Button";
import {useEffect, useRef, useState} from "react";
import p from "@/styles/profile/profile.module.css";
import i from "@/styles/auth/auth.module.css";
import {UploadIcon} from "../../public/icons/UploadIcon";
import {Hint} from "@/components/ui/Hint";
import {AnimatePresence, motion} from 'framer-motion';
import {slideIn} from "@/styles/animations/slide";

export const Edit = (props) => {

	const fileInputRef = useRef(null);

	const {
		userId, userEmail, userPass, userName, userPhone, userPFP
	} = UserStore();

	const [newEmail, setEmail] = useState("");
	const [newPassword, setPassword] = useState("");
	const [newName, setName] = useState("");
	const [newPhone, setPhone] = useState("");
	const [newPFP, setPFP] = useState("");

	useEffect(() => {
		setEmail(userEmail);
		setPassword(userPass);
		setName(userName);
		setPhone(userPhone);
		setPFP(userPFP)
	}, [userEmail, userPass, userName, userPhone]);

	function closeHandler() {
		props.setEditing(false);
	}

	async function editHandler() {
		const request = {
			email: userEmail, pass: newPassword, name: newName, phone: newPhone, pfp: newPFP
		};

		try {
			const response = await fetch(`/api/post/profile/update`, {
				method: "POST", headers: {
					"Content-Type": "application/json",
				}, body: JSON.stringify(request),
			});

			const data = await response.json();

			if (data.status) {
				alert(data.message)
			} else {
				alert(data.message)
			}
		} catch (e) {
			console.log(e)
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
			{props.editing && (
				<motion.div
					initial="initial"
					animate="animate"
					exit="exit"
					variants={slideIn}
					className={p.editComponent}
				>
					<Label text="Email"/>
					<Input
						value={newEmail}
						type="text"
					/>
					<Label text="Password"/>
					<Input
						value={newPassword}
						type="text"
						onChange={(e) => setPassword(e.target.value)}
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
					<Button text="Close" onClick={closeHandler}/>
					<Button text="Update" onClick={editHandler}/>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
