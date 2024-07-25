import s from "@/styles/components/ui/title.module.css"

export const Title = (props) => {
	return (
		<>
			<span className={s.span}>{props.text}</span>
		</>
	)
}
