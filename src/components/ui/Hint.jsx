import s from "@/styles/components/ui/hint.module.css"

export const Hint = (props) => {
	return (
		<>
			<span className={s.span}>{props.text}</span>
		</>
	)
}
