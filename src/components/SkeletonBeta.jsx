import s from "@/styles/components/skeleton.module.css"

export const SkeletonBeta = () => {
	return (
		<>
			<div className={s.albumGrid}>
				<div className={s.x}></div>
				<div className={s.x}></div>
				<div className={s.x}></div>
				<div className={s.x}></div>
				<div className={s.x}></div>
				<div className={s.x}></div>
			</div>
		</>
	)
}
