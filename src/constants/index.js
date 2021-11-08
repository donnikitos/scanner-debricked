export const isDev = process.env.NODE_ENV === 'development';

export const API_URL = isDev
	? '//localhost:8081/api'
	: 'https://debricked.com/api';

export const API_VERSION = '1.0';
