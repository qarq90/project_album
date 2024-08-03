import {NextResponse} from "next/server";
import connect from "@/lib/connection.js";
import Tapes from "@/models/Tape";

export const POST = async (request) => {
	try {
		const {userId, tapeId, videoId} = await request.json();

		await connect();

		const result = await Tapes.findOneAndUpdate(
			{
				userId: userId,
				"tapes.tapeId": tapeId
			},
			{
				$pull: {
					"tapes.$.tapeId": {videoId: videoId}
				}
			},
			{
				new: true
			}
		);

		if (result) {
			return NextResponse.json({
				message: 'Image removed from album successfully',
				status: true,
				result: result
			});
		} else {
			return NextResponse.json({
				message: 'Image failed to be removed from album',
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
