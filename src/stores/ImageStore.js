import create from 'zustand';

const ImageStore = create((set) => ({
	imageId: 0,
	setImageId: (imageId) => set(() => ({imageId})),
	imageStore: [],
	setImageStore: (images) => set((state) => ({
		imageStore: [...state.imageStore, ...images]
	})),
	imageFetcher: true,
	setImageFetcher: (imageFetcher) => set((state) => ({imageFetcher}))
}));

export default ImageStore;
