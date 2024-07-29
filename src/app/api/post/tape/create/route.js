import {NextResponse} from "next/server";
import connect from "@/lib/connection.js";
import Tapes from "@/models/Tape.js";
import Albums from "@/models/Album";

export const POST = async (request) => {
	try {
		const {userId, tapes} = await request.json();

		await connect();

		const result = await Tapes.updateOne(
			{
				userId: userId
			},
			{
				$push: {
					tapes: {
						$each: tapes
					}
				}
			},
			{
				upsert: true
			}
		);

		if (result) {
			return NextResponse.json({
				message: 'Tape(s) Added Successfully',
				status: true,
				result: result,
			});
		} else {
			return NextResponse.json({
				message: 'Failed to Add Tape(s)',
				status: false,
				result: result,
			});
		}
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			message: 'Error connecting to Database: ' + error,
			result: false,
		});
	}
};
