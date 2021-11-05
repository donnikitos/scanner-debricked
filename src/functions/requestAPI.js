import axios from 'axios';
import { API_URL, API_VERSION } from '@/constants/index.js';
import { useToast } from 'vue-toastification';

const toast = useToast();

async function requestAPI(method, url, args, withVersion = true) {
	let result = undefined;

	try {
		result = await axios({
			method,
			url: `${API_URL}${withVersion ? `/${API_VERSION}` : ''}/${url}`,
			...args,
		});
	} catch (e) {
		const message =
			e.response?.data?.message ||
			`Request failed (${e.response?.status})` ||
			e.message;

		toast(message, { type: 'error' });
		// console.log(e);
	}

	return result?.data;
}

export default requestAPI;
