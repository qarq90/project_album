import s from "@/styles/components/skeleton.module.css";

const shuffleArray = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

export const SkeletonAlpha = () => {

	const gridTypes = ['square', 'panorama', 'portrait', 'landscape'];

	let gridItems = [...gridTypes, ...gridTypes, ...gridTypes];

	gridItems = shuffleArray(gridItems);

	return (
		<div className={s.container}>
			{gridItems.map((type, index) => (
				<div key={index} className={s[type]}></div>
			))}
		</div>
	);
};
