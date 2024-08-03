import Cookies from "js-cookie";
import UserStore from "@/stores/UserStore";
import {useCallback} from "react";

export const useFetchUser = (router) => {

	const {
		userId,
		setUserId,
		setUserEmail,
		setUserPass,
		setUserName,
		setUserPhone,
		setUserPFP,
	} = UserStore();

	return useCallback(async () => {

		const storageUserID = Cookies.get("storageUserID") || "";

		if (storageUserID === "") {
			router.push("/auth/login");
		} else {
			if (userId === null) {

				const request = {
					_id: storageUserID,
				};

				try {
					const response = await fetch(`/api/post/auth/fetch`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(request),
					});

					const data = await response.json();

					if (data.status){
						setUserId(data.result._id);
						setUserEmail(data.result.email);
						setUserPass(data.result.pass);
						setUserName(data.result.name);
						setUserPhone(data.result.phone);
						setUserPFP(data.result.pfp);
					} else {
						console.error(data.message);
					}
					
				} catch (error) {
					console.error(error);
				}
			}
		}
	}, [router, userId, setUserId, setUserEmail, setUserPass, setUserName, setUserPhone, setUserPFP]);
};
