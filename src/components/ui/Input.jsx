import s from "@/styles/components/ui/input.module.css"

export const Input = (props) => {
	return (
		<>
			<input
				className={s.input}
				type={props.type}
				placeholder={props.placeholder}
				value={props.value}
				onChange={props.onChange}
			/>
		</>
	)
}
