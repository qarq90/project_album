import create from 'zustand';

const CurrentStore = create((set) => ({
	currentStore: [],
	setCurrentStore: (currentStore) => set(() => ({currentStore})),
}));

export default CurrentStore;
