export const requestMedia = async (apiKey, url) => {
	try {
		const options = {
			method: 'GET',
			headers: {
				'Authorization': apiKey,
			},
		};

		const response = await fetch(url, options);
		return await response.json();
	} catch (error) {
		console.error("Error fetching images..." + error)
	}
}
