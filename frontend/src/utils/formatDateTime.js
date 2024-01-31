const formatDateTime = (dateTime, format) => {
	const date = new Date(dateTime);

	if (isNaN(date.getTime())) {
		throw new Error('Invalid date');
	}

	const year = date.getFullYear().toString();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const seconds = date.getSeconds().toString().padStart(2, '0');

	switch (format) {
		case 'YYYY-MM-DD HH:mm:ss':
			return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		case 'YYYY-MM-DD':
			return `${year}-${month}-${day}`;
		case 'HH:mm:ss':
			return `${hours}:${minutes}:${seconds}`;
		case 'HH:mm':
			return `${hours}:${minutes}`;
		case 'MM-DD-YYYY':
			return `${month}-${day}-${year}`;
		case 'DD-MM-YYYY':
			return `${day}-${month}-${year}`;
		default:
			throw new Error('Invalid format');
	}
};

export default formatDateTime;