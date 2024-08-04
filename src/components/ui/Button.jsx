import s from "@/styles/components/ui/button.module.css"

export const Button = (props) => {
	return (
		<>
			<button className={s.button} onClick={props.onClick}>{props.icon}{props.text}</button>
		</>
	)
}
