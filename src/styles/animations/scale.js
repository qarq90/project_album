export const containerVariants = {
	hidden: {
		opacity: 1
	},
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

export const itemVariants = {
	hidden: {
		opacity: 0,
		scale: 0.8
	},
	visible: {
		opacity: 1,
		scale: 1
	},
};
