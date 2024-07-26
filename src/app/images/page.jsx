import s from "@/styles/globals.module.css";
import {EmptySpace} from "@/components/ui/EmptySpace";
import {ImageGrid} from "@/components/ImageGrid";

export default function Page() {
	return (
		<>
			<div className={s.wrapper}>
				<ImageGrid url={`https://api.pexels.com/v1/curated?per_page=20`}/>
				<EmptySpace/>
			</div>
		</>
	)
}
