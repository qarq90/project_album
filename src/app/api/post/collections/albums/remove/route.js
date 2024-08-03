import {NextResponse} from "next/server";
import connect from "@/lib/connection.js";
import Albums from "@/models/Album.js";

export const POST = async (request) => {
	try {
		const {userId, albumId, imageId} = await request.json();

		await connect();

		const result = await Albums.findOneAndUpdate(
			{
				userId: userId,
				"albums.albumId": albumId
			},
			{
				$pull: {
					"albums.$.albumData": { imageId: imageId }
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
