import Cookies from "js-cookie";
import UserStore from "@/stores/UserStore";
import {useCallback} from "react";

export const useFetchUser = (router) => {

	const {
		setUserId,
		setUserEmail,
		setUserPass,
		setUserName,
		setUserPhone,
		setUserPFP,
	} = UserStore();

	const fetchUser = useCallback(async () => {
		const storageUserID = Cookies.get("storageUserID") || "";

		if (storageUserID === "") {
			router.push("/auth/login");
		} else {
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

				setUserId(data.result._id);
				setUserEmail(data.result.email);
				setUserPass(data.result.pass);
				setUserName(data.result.name);
				setUserPhone(data.result.phone);
				setUserPFP(data.result.pfp);

				return data.result

			} catch (e) {
				console.log(e);
			}
		}
	}, [router, setUserId, setUserEmail, setUserPass, setUserName, setUserPhone, setUserPFP]);

	return fetchUser;
};
