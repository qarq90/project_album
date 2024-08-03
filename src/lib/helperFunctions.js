import axios from "axios";

export const handleDownload = async (downloadhref, type, name) => {
	try {
		const response = await axios.get(downloadhref, {
			responseType: 'arraybuffer'
		});

		const mimeType = type === 'image' ? 'image/png' : type === 'video' ? 'video/mp4' : null;
		if (!mimeType) throw new Error('Unsupported file type');

		const file = new Blob([response.data], {type: mimeType});
		const url = URL.createObjectURL(file);
		const link = document.createElement('a');

		link.href = url;
		link.download = name;
		document.body.appendChild(link);
		link.click();

		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	} catch (error) {
		console.error(`Error downloading ${type}:`, error);
	}
};

export function removeNumbersAndTrailingChars(str) {

	let cleanedStr = str.replace(/\d+/g, '');
	cleanedStr = cleanedStr.replace(/[-\/]+$/, '');

	return cleanedStr;
}

export function blobToBase64(blob) {

	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result);
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
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

export const getCellType = (width, height) => {

	const aspectRatio = width / height;

	if (aspectRatio > 1.5) return 'panorama';
	// if (aspectRatio > 1.2) return 'landscape';
	if (aspectRatio < 0.8) return 'portrait';

	return 'square';
};

export function removeNameFromURL(url) {

	let urlParts = url.split('/');
	if (urlParts.length > 4) {
		urlParts.pop();
	}

	let extracted = urlParts[4];
	let extractedParts = extracted.split("-")
	extractedParts.pop()

	return extractedParts.join("-")
}
