import s from "@/styles/globals.module.css";
import {EmptySpace} from "@/components/ui/EmptySpace";
import {VideoGrid} from "@/components/VideoGrid";

export default function Page() {
	return (
		<>
			<div className={s.wrapper}>
				<VideoGrid url={`https://api.pexels.com/videos/popular?per_page=20`}/>
				<EmptySpace/>
			</div>
		</>
	)
}
