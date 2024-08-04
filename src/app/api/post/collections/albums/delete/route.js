import {NextResponse} from "next/server";
import connect from "@/lib/connection.js";
import Albums from "@/models/Album.js";

export const POST = async (request) => {
	try {
		const {userId, albumId} = await request.json();

		await connect();

		const result = await Albums.findOneAndUpdate(
			{
				userId: userId,
			},
			{
				$pull: {
					albums: { albumId: String(albumId) }
				}
			},
			{
				new: true
			}
		);

		if (result) {
			return NextResponse.json({
				message: 'Album deleted successfully.',
				status: true,
				result: result
			});
		} else {
			return NextResponse.json({
				message: 'Failed to delete tape',
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
