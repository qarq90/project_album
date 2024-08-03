import CollectionsStore from "@/stores/CollectionsStore";
import ImageStore from "@/stores/ImageStore";
import VideoStore from "@/stores/VideoStore";
import {useCallback} from "react";
import CurrentStore from "@/stores/CurrentStore";

export const useCollectionsFetcher = () => {
	const {setAlbumsStore, setTapesStore} = CollectionsStore();
	const {setImageFetcher} = ImageStore();
	const {setVideoFetcher} = VideoStore();
	const {setCurrentStore} = CurrentStore();

	const fetchUserAlbums = useCallback(async (userId) => {
		const request = {userId: userId};

		try {
			const response = await fetch("/api/post/collections/albums/fetch", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(request),
			});

			const data = await response.json();

			if (data.status) {
				setAlbumsStore(data.result.albums);
				setCurrentStore(data.result.albums);
				setImageFetcher(false);
			} else {
				console.error(data.message);
			}
		} catch (e) {
			console.error("Fetch user albums failed: ", e);
		}
	}, [setAlbumsStore, setCurrentStore, setImageFetcher]);

	const fetchUserTapes = useCallback(async (userId) => {
		const request = {userId: userId};

		try {
			const response = await fetch("/api/post/collections/tapes/fetch", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(request),
			});

			const data = await response.json();

			if (data.status) {
				setTapesStore(data.result.tapes);
				setCurrentStore(data.result.tapes);
				setVideoFetcher(false);
			} else {
				console.error(data.message);
			}
		} catch (e) {
			console.error("Fetch user tapes failed: ", e);
		}
	}, [setCurrentStore, setTapesStore, setVideoFetcher]);

	return {fetchUserAlbums, fetchUserTapes};
};
