import create from 'zustand';

const CollectionsStore = create((set) => ({
	albumsStore: null,
	setAlbumsStore: (albumsStore) => set(() => ({albumsStore})),
	tapesStore: null,
	setTapesStore: (tapesStore) => set(() => ({tapesStore})),
}));

export default CollectionsStore;
