export default function Page({params}) {

	const slug = params.slug

	return (
		<>
			<h1>{slug}</h1>
		</>
	)
}
