import s from "@/styles/components/skeleton.module.css";

export const SkeletonCharlie = () => {
	return (
		<div className={s.skeletonWrapper}>
			<div className={s.skeleton}></div>
			<div className={s.skeleton}></div>
			<div className={s.skeleton}></div>
			<div className={s.skeleton}></div>
			<div className={s.skeleton}></div>
			<div className={s.skeleton}></div>
		</div>
	);
};
