export function removeNameFromURL(url) {

	let urlParts = url.split('/');


	if (urlParts.length > 4) {
		urlParts.pop();
	}

	let extracted = urlParts[4];

	let extractedParts = extracted.split("-")

	extractedParts.pop()

	let desc = extractedParts.join("-")

	return desc
}
