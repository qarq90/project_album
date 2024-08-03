import {NextResponse} from "next/server";
import connect from "@/lib/connection.js";
import Albums from "@/models/Album.js";

export const POST = async (request) => {
	try {
		const {userId, albumId, image} = await request.json();

		await connect();

		const result = await Albums.findOneAndUpdate(
			{
				userId: userId,
				"albums.albumId": albumId
			},
			{
				$push: {
					"albums.$.albumData": image
				}
			},
			{
				new: true
			}
		);

		if (result) {
			return NextResponse.json({
				message: 'Cell added to album successfully',
				status: true,
				result: result
			});
		} else {
			return NextResponse.json({
				message: 'Cell failed to be added to album',
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
