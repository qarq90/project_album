import {NextResponse} from "next/server"
import connect from "@/lib/connection.js"
import Users from "@/models/User.js"

export const POST = async (request) => {
	try {
		const {_id} = await request.json()

		await connect()

		let result = await Users.findOne({
			_id: _id,
		})

		if (result) {
			return NextResponse.json({
				message: 'User found',
				status: true,
				result: result
			})
		} else {
			return NextResponse.json({
				message: 'No user found.',
				status: false,
				result: result
			})
		}

	} catch (error) {
		console.log(error)
		return NextResponse.json({message: 'Error connecting to Database: ' + error, result: false})
	}
}
