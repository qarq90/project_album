import create from 'zustand';

const UserStore = create((set) => ({
	userId: null,
	setUserId: (userId) => set(() => ({userId})),
	userName: null,
	setUserName: (userName) => set(() => ({userName})),
	userEmail: null,
	setUserEmail: (userEmail) => set(() => ({userEmail})),
	userPass: null,
	setUserPass: (userPass) => set(() => ({userPass})),
	userPhone: null,
	setUserPhone: (userPhone) => set(() => ({userPhone})),
	userPFP: "",
	setUserPFP: (userPFP) => set(() => ({userPFP}))
}));

export default UserStore;
