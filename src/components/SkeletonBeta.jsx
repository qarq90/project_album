import s from "@/styles/components/skeleton.module.css"

export const SkeletonBeta = () => {
	return (
		<>
			<div>
				<div className={s.skeletonTitle}></div>
				<div className={s.skeletonWrapper}>
					<div className={s.skeleton}></div>
					<div className={s.skeleton}></div>
					<div className={s.skeleton}></div>
					<div className={s.skeleton}></div>
					<div className={s.skeleton}></div>
					<div className={s.skeleton}></div>
				</div>
			</div>
		</>
	)
}
