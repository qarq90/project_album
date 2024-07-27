import {NextResponse} from "next/server"
import connect from "@/lib/connection.js"
import Users from "@/models/User.js"

export const POST = async (request) => {
	try {
		const {id, email, pass, name, phone, pfp} = await request.json()

		await connect()

		let result = await Users.updateOne(
			{
				email: email,
			}, {
				email: email,
				pass: pass,
				name: name,
				phone: phone,
				pfp: pfp,
			}
		)

		if (result) {
			return NextResponse.json({
				message: 'Account Updated Successfully',
				status: true,
				result: result
			})
		} else {
			return NextResponse.json({
				message: 'Failed to update Account',
				status: false,
				result: result
			})
		}

	} catch
		(error) {
		console.log(error)
		return NextResponse.json({message: 'Error connecting to Database: ' + error, result: false})
	}
}
