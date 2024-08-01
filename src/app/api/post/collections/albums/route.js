import {NextResponse} from "next/server";
import connect from "@/lib/connection.js";
import Albums from "@/models/Album";

export const POST = async (request) => {
	try {
		const {userId} = await request.json();

		await connect();

		const result = await Albums.findOne({userId: userId});

		if (result) {
			return NextResponse.json({
				message: 'Fetched albums successfully',
				status: true,
				result: result
			});
		} else {
			return NextResponse.json({
				message: 'No albums found for the given userId',
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
