import {NextResponse} from "next/server"
import connect from "@/lib/connection.js"
import Users from "@/models/User.js"

export const POST = async (request) => {
	try {
		const {email, pass, phone, name, pfp} = await request.json()

		await connect()

		let result = await Users.findOne({
			email: email,
			pass: pass,
			name: name,
			phone: phone,
			pfp: pfp
		})

		if (result) {
			return NextResponse.json({
				message: 'Account Already Exists',
				status: false,
				result: result
			})
		} else {
			await Users.create({
				email: email,
				pass: pass,
				name: name,
				phone: phone,
				pfp: pfp
			})
			return NextResponse.json({
				message: 'Signup Successful',
				status: true,
				result: result
			})
		}

	} catch (error) {
		console.log(error)
		return NextResponse.json({message: 'Error connecting to Database: ' + error, result: false})
	}
}
