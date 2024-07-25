import s from "@/styles/components/ui/label.module.css"

export const Label = (props) => {
	return (
		<>
			<span className={s.span}>{props.text}</span>
		</>
	)
}
