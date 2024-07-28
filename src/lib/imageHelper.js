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

export function hexToRgb(hex) {
	hex = hex.replace(/^#/, '');

	let bigint = parseInt(hex, 16);
	let r = (bigint >> 16) & 255;
	let g = (bigint >> 8) & 255;
	let b = bigint & 255;

	return `rgb(${r}, ${g}, ${b})`;
}

export function rgbToComplementary(rgb) {
	let [r, g, b] = rgb.match(/\d+/g).map(Number);

	let compR = 255 - r;
	let compG = 255 - g;
	let compB = 255 - b;

	return `rgb(${compR}, ${compG}, ${compB})`;
}

export function darkenRgb(rgb, factor) {
	let [r, g, b] = rgb.match(/\d+/g).map(Number);

	r = Math.max(0, Math.min(255, Math.round(r - factor)))
	g = Math.max(0, Math.min(255, Math.round(g - factor)))
	b = Math.max(0, Math.min(255, Math.round(b - factor)))

	return `rgb(${r}, ${g}, ${b})`;
}
