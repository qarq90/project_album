export const ClearIcon = (props) => {
	return (
		<>
			<svg
				onMouseEnter={props.onMouseEnter}
				onMouseLeave={props.onMouseLeave}
				className={props.className}
				onClick={props.onClick}
				xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="96" height="96">
				<path
					d="M11.59375 7L11.28125 7.28125L3.28125 15.28125L2.59375 16L3.28125 16.71875L11.28125 24.71875L11.59375 25L29 25L29 7 Z M 12.4375 9L27 9L27 23L12.4375 23L5.4375 16 Z M 15.15625 11.75L13.75 13.15625L16.59375 16L13.75 18.84375L15.15625 20.25L18 17.40625L20.84375 20.25L22.25 18.84375L19.40625 16L22.25 13.15625L20.84375 11.75L18 14.59375Z"
					fill={props.fill}/>
			</svg>
		</>
	)
}
