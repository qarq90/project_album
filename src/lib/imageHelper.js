import axios from "axios";

export const handleDownload = async (downloadhref, name) => {
	try {

		const response = await axios.get(downloadhref, {
			responseType: 'arraybuffer'
		})

		const image = new Blob([response.data], {type: "image/png"})
		const url = URL.createObjectURL(image)
		const link = document.createElement("a")
		link.href = url
		link.download = name
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
		URL.revokeObjectURL(url)
		link.remove()
	} catch (error) {
		console.error('Error downloading image:', error)
	}
}

export function removeNumbersAndTrailingChars(str) {
	let cleanedStr = str.replace(/\d+/g, '');

	cleanedStr = cleanedStr.replace(/[-\/]+$/, '');

	return cleanedStr;
}

export async function urlToBase64(url) {
	const response = await fetch(url);
	const blob = await response.blob();
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result);
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
}
