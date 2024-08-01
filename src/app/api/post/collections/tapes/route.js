import {NextResponse} from "next/server";
import connect from "@/lib/connection.js";
import Tapes from "@/models/Tape.js";

export const POST = async (request) => {
	try {
		const {userId} = await request.json();

		await connect();

		const result = await Tapes.findOne({userId: userId});

		if (result) {
			return NextResponse.json({
				message: 'Fetched tapes successfully',
				status: true,
				result: result
			});
		} else {
			return NextResponse.json({
				message: 'No tapes found for the given userId',
				status: false,
				result: result
			});
		}
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			message: 'Error connecting to Database: ' + error,
			status: false
		});
	}
};
