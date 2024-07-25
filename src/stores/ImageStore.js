import create from 'zustand';

const ImageStore = create((set) => ({
	imageId: 0,
	setImageId: (imageId) => set(() => ({imageId})),
	imageData: null,
	setImageData: (imageData) => set(() => ({imageData})),
}));

export default ImageStore;
