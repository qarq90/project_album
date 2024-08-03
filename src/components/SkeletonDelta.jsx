import s from "@/styles/components/skeleton.module.css";
import {SkeletonCharlie} from "@/components/SkeletonCharlie";

export const SkeletonDelta = () => {
	return (
		<>
			<div className={s.skeletonContent}></div>
			<div className={s.skeletonTitle}></div>
			<div className={s.skeletonWrapper}>
				<SkeletonCharlie />
				<SkeletonCharlie />
				<SkeletonCharlie />
			</div>
		</>
	);
};
