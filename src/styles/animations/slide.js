export const slideIn = {
	initial: {
		y: '100vh'
	},
	animate: {
		y: 0
	},
	exit: {
		y: '100vh'
	},
	transition: {type: 'spring', stiffness: 100}
};

export const slideOut = {
	initial: {
		y: 0
	},
	animate: {
		y: '100vh'
	},
	exit: {
		y: '100vh'
	},
	transition: {type: 'spring', stiffness: 100}
};
