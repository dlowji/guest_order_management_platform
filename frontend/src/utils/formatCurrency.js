export function formatCurrency(value) {
	return new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
	}).format(value);
}

export function convertToUSD(value) {
	return Math.floor(value / 23000);
}