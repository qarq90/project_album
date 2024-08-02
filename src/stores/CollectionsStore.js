import create from 'zustand';

const CollectionsStore = create((set) => ({
	albumsStore: [],
	setAlbumsStore: (albumsStore) => set(() => ({albumsStore})),
	tapesStore: [],
	setTapesStore: (tapesStore) => set(() => ({tapesStore})),
}));

export default CollectionsStore;
