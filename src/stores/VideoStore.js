import create from 'zustand';

const VideoStore = create((set) => ({
	videoId: 0,
	setVideoId: (videoId) => set(() => ({videoId})),
	videoData: null,
	setVideoData: (videoData) => set(() => ({videoData})),
}));

export default VideoStore;
