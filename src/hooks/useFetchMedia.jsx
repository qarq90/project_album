import ImageStore from "@/stores/ImageStore"
import VideoStore from "@/stores/VideoStore"
import {useCallback, useEffect, useState} from 'react'

export const useFetchMedia = () => {

	const [page, setPage] = useState(Math.floor(Math.random() * 254) + 1)
	const [loading, setLoading] = useState(true)
	const [fetchedImages, setFetchedImages] = useState([])
	const [fetchedVideos, setFetchedVideos] = useState([])

	const {imageStore, setImageStore} = ImageStore()
	const {videoStore, setVideoStore} = VideoStore()

	const fetchData = useCallback(async (url, mediaType) => {
		const apiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY

		const options = {
			method: 'GET',
			headers: {
				'Authorization': apiKey,
			},
		}

		try {
			const response = await fetch(url, options)
			const result = await response.json()

			if (mediaType === "video") {
				const videos = Array.isArray(result.videos) ? result.videos : []
				setFetchedVideos(videos)
			} else {
				const photos = Array.isArray(result.photos) ? result.photos : []
				setFetchedImages(photos)
			}

			setLoading(false)
		} catch (error) {
			console.error(`Error fetching the ${mediaType}:`, error)
			setLoading(false)
		}
	}, [])

	const refreshData = useCallback(async (currentPage) => {

		const urlImage = `https://api.pexels.com/v1/curated?per_page=4&page=${page}`
		const urlVideo = `https://api.pexels.com/videos/popular?per_page=4&page=${page}`

		switch (currentPage) {
			case 'images':
				setFetchedVideos([])
				setFetchedVideos([])
				await fetchData(urlImage, 'image')
				break
			case 'videos':
				setFetchedVideos([])
				await fetchData(urlVideo, 'video')
				break
			case 'home':
				setFetchedImages([])
				setFetchedVideos([])
				await fetchData(urlImage, 'image')
				await fetchData(urlVideo, 'video')
				break
			default:
				console.error('Invalid currentPage value')
		}
	}, [page, fetchData])

	useEffect(() => {
		const fetchInitialData = async () => {
			setImageStore([])
			setVideoStore([])
			const urlImage = `https://api.pexels.com/v1/curated?per_page=4&page=${page}`
			await fetchData(urlImage, 'image')
			const urlVideo = `https://api.pexels.com/videos/popular?per_page=4&page=${page}`
			await fetchData(urlVideo, 'video')
		}

		fetchInitialData().then(() => null)
	}, [fetchData, page, setImageStore, setVideoStore])

	useEffect(() => {
		const existingPhotoIds = new Set(imageStore.map(photo => photo.id))
		const uniquePhotos = fetchedImages.filter(photo => !existingPhotoIds.has(photo.id))
		if (uniquePhotos.length > 0) {
			setImageStore(uniquePhotos)
		}
	}, [fetchedImages, imageStore, setImageStore])

	useEffect(() => {
		const existingVideoIds = new Set(videoStore.map(video => video.id))
		const uniqueVideos = fetchedVideos.filter(video => !existingVideoIds.has(video.id))
		if (uniqueVideos.length > 0) {
			setVideoStore(uniqueVideos)
		}
	}, [fetchedVideos, videoStore, setVideoStore])

	return {loading, setPage, fetchData, refreshData}
}
