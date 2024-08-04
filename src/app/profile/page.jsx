"use client"

import UserStore from "@/stores/UserStore";
import p from "@/styles/pages/profile/profile.module.css"
import {Button} from "@/components/ui/Button";
import {useEffect, useState} from "react";
import {ProfileEdit} from "@/components/ProfileEdit";
import {useRouter} from "next/navigation";
import {AnimatePresence, motion} from "framer-motion";
import {UserIcon} from "../../../public/icons/UserIcon";
import {useFetchUser} from "@/hooks/useFetchUser";
import CollectionsStore from "@/stores/CollectionsStore";
import ImageStore from "@/stores/ImageStore";
import VideoStore from "@/stores/VideoStore";
import {CollectionsGrid} from "@/components/CollectionsGrid";
import g from "@/styles/globals.module.css";
import {useCollectionsFetcher} from "@/hooks/useCollectionsFetcher";
import {SkeletonAlpha} from "@/components/SkeletonAlpha";
import {containerVariants} from "@/styles/animations/scale";
import {EmptySpace} from "@/components/ui/EmptySpace";
import {FaImages, FaVideo} from "react-icons/fa";

export default function Page() {

	const router = useRouter();

	const fetchUser = useFetchUser(router);

	const {fetchUserAlbums, fetchUserTapes} = useCollectionsFetcher();

	const {userId} = UserStore()

	const [loading,setLoading] = useState(true)

	const {
		albumsStore,
		setAlbumsStore,
		tapesStore,
		setTapesStore,
	} = CollectionsStore();

	const {
		imageFetcher,
		setImageFetcher
	} = ImageStore();

	const {
		videoFetcher,
		setVideoFetcher
	} = VideoStore();

	const {
		userName,
		userPFP,
		setUserId,
		setUserEmail,
		setUserPass,
		setUserName,
		setUserPhone,
		setUserPFP
	} = UserStore()

	const [editing, setEditing] = useState(false)

	function editHandler() {
		setEditing(!editing)
	}

	function logoutHandler() {
		setUserId("")
		setUserEmail("")
		setUserPass("")
		setUserName("")
		setUserPhone("")
		setUserPFP("")
		router.push("/auth/login")
	}

	useEffect(() => {
		fetchUser().then(() => {
			if (imageFetcher) {
				fetchUserAlbums(userId).then(() => null);
			}

			if (videoFetcher) {
				fetchUserTapes(userId).then(() => null);
			}
		})

		const timer = setTimeout(() => {
			setLoading(false);
		}, 1750);

		return () => clearTimeout(timer);
	}, [fetchUser, fetchUserAlbums, fetchUserTapes, imageFetcher, userId, videoFetcher]);

	return (
		<>
			<div className={p.profileContainer}>
				<div className={p.pfpContainer}>
					{
						userPFP.length !== 0 ?
							<>
								<img className={p.pfp} src={userPFP} alt=""/>
								<h1>{userName}</h1>
							</> :
							<>
								<UserIcon
									fill="var(--primary-theme-color)"
									className={p.pfp}
								/>
								<h1>........</h1>
							</>
					}
				</div>
				<div className={p.editContainer}>
					<div>
					</div>
					<div className={p.edit}>
						<Button text={editing ? "Cancel" : "Edit"} onClick={editHandler}/>
						<Button text="Log Out" onClick={logoutHandler}/>
					</div>
					<div>
					</div>
				</div>
			</div>
			<AnimatePresence>
				{editing && <ProfileEdit setEditing={setEditing} editing={editing}/>}
			</AnimatePresence>
			<div className={g.wrapper}>
				{
					loading ? (
						<SkeletonAlpha/>
					) : (
						<>
							{
								albumsStore.length !== 0 ? (
									<CollectionsGrid
										title="YOUR ALBUMS"
										collectionStore={
											albumsStore.map(album => (
												{
													id: album.albumId,
													data: album.albumData,
													title: album.albumTitle,
												}
											))
										}
										isFetching={imageFetcher}
										type="album"
									/>
								) : (
									<motion.div
										variants={containerVariants}
										initial="hidden"
										animate="visible"
									>
										<span className={g.type}>YOUR ALBUMS</span>
										<EmptySpace height={"24px"}/>
										<div className={g.nothing}><FaImages/> No albums found. Save some now to view
											them
											later!
										</div>
										<EmptySpace height={"48px"}/>
									</motion.div>
								)
							}
							{
								tapesStore.length !== 0 ? (
									<CollectionsGrid
										title="YOUR TAPES"
										collectionStore={
											tapesStore.map(tape => (
												{
													id: tape.tapeId,
													data: tape.tapeData,
													title: tape.tapeTitle,
												}
											))
										}
										isFetching={videoFetcher}
										type="tape"
									/>
								) : (
									<motion.div
										variants={containerVariants}
										initial="hidden"
										animate="visible"
									>
										<span className={g.type}>YOUR TAPES</span>
										<EmptySpace height={"24px"}/>
										<div className={g.nothing}><FaVideo/> No tapes found. Save some now to view them
											later!
										</div>
										<EmptySpace height={"48px"}/>
									</motion.div>
								)
							}
						</>
					)
				}
			</div>
		</>
	)
}
