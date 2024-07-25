import {NextResponse} from "next/server"
import connect from "@/lib/connection.js"
import Users from "@/models/User.js"

export const POST = async (request) => {
	try {
		const {email, pass} = await request.json()

		await connect()

		let result = await Users.findOne({
			email: email,
			pass: pass
		})

		if (result) {
			return NextResponse.json({
				message: 'Login Successful',
				status: true,
				result: result
			})
		} else {
			return NextResponse.json({
				message: 'Login Failed',
				status: false,
				result: result
			})
		}

	} catch (error) {
		console.log(error)
		return NextResponse.json({message: 'Error connecting to Database: ' + error, result: false})
	}
}
