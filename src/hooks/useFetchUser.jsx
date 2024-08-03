import Cookies from "js-cookie";
import UserStore from "@/stores/UserStore";
import {useCallback} from "react";
import CollectionsStore from "@/stores/CollectionsStore";
import VideoStore from "@/stores/VideoStore";
import ImageStore from "@/stores/ImageStore";

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

	const {
		setAlbumsStore,
		setTapesStore,
	} = CollectionsStore();

	const {
		imageFetcher,
		setImageFetcher
	} = ImageStore();

	const {
		videoFetcher,
		setVideoFetcher
	} = VideoStore();

	const fetchUser = useCallback(async () => {
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

				const mediaRequest = {userId: userId};

				try {
					const response = await fetch("/api/post/collections/albums", {
						method: "POST",
						headers: {"Content-Type": "application/json"},
						body: JSON.stringify(mediaRequest),
					});

					const data = await response.json();

					if (data.status) {
						setAlbumsStore(data.result.albums);
						setImageFetcher(false)
					} else {
						console.log(data.message);
					}
				} catch (e) {
					console.log(e);
				}

				try {
					const response = await fetch("/api/post/collections/tapes", {
						method: "POST",
						headers: {"Content-Type": "application/json"},
						body: JSON.stringify(mediaRequest),
					});

					const data = await response.json();

					if (data.status) {
						setTapesStore(data.result.tapes);
						setVideoFetcher(false)
					} else {
						console.log(data.message);
					}
				} catch (e) {
					console.log(e);
				}
			}
		}
	}, [router, userId, setUserId, setUserEmail, setUserPass, setUserName, setUserPhone, setUserPFP, setAlbumsStore, setImageFetcher, setTapesStore, setVideoFetcher]);

	return fetchUser;
};
