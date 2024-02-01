const getTokenService = () => {
	const token = localStorage.getItem('token');
	if (!token) return null;
	return token;
};

const setTokenService = (token) => {
	localStorage.setItem('token', token);
};

const removeTokenService = () => {
	localStorage.removeItem('token');
};

export { getTokenService, setTokenService, removeTokenService };