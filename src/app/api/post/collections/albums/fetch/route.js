import {NextResponse} from "next/server";
import connect from "@/lib/connection.js";
import Albums from "@/models/Album.js";

export const POST = async (request) => {
	try {
		const {userId} = await request.json();

		await connect();

		const result = await Albums.findOne(
			{
				userId: userId
			}
		);

		if (result) {
			return NextResponse.json({
				message: 'Album(s) Fetched Successfully',
				status: true,
				result: result
			});
		} else {
			return NextResponse.json({
				message: 'Failed to Fetched Album(s)',
				status: false,
				result: result
			});
		}
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			message: 'Error connecting to Database: ' + error,
			result: false
		});
	}
};
