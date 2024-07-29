import {NextResponse} from "next/server";
import connect from "@/lib/connection.js";
import Tapes from "@/models/Tape.js";

export const POST = async (request) => {
	try {
		const {userId, tapeId, video} = await request.json();

		await connect();

		const result = await Tapes.findOneAndUpdate(
			{
				userId: userId,
				"tapes.tapeId": tapeId
			},
			{
				$push: {
					"tapes.$.tapeData": video
				}
			},
			{
				new: true
			}
		);

		if (result) {
			return NextResponse.json({
				message: 'Video added to tape successfully',
				status: true,
				result: result
			});
		} else {
			return NextResponse.json({
				message: 'Video failed to be added to tape',
				status: false
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
