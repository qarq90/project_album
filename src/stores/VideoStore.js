import create from 'zustand';

const VideoStore = create((set) => ({
	videoId: 0,
	setVideoId: (videoId) => set(() => ({videoId})),
	videoStore: [],
	setVideoStore: (videos) => set((state) => ({
		videoStore: [...state.videoStore, ...videos]
	})),
	videoFetcher: true,
	setVideoFetcher: (videoFetcher) => set((state) => ({videoFetcher}))
}));

export default VideoStore;
