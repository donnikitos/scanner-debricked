import axios from 'axios';
import { API_URL, API_VERSION } from '@/constants/index.js';
import store from '@/store/index.js';
import router from '@/router/index.js';
import { useToast } from 'vue-toastification';

const toast = useToast();

const active = [];

async function requestAPI(method, url, args, withVersion = true) {
	const requestId = JSON.stringify({ method, url, args, withVersion });

	if (active.includes(requestId)) {
		return;
	} else {
		active.push(requestId);
	}

	let result = undefined;
	const token = store.state.auth.token;

	let headers = undefined;
	if (token) {
		headers = {
			// 'Access-Control-Allow-Origin': '*',
			Authorization: token ? 'Bearer ' + token : undefined,
		};
	}

	try {
		result = await axios({
			method,
			url: `${API_URL}${withVersion ? `/${API_VERSION}` : ''}/${url}`,
			headers,
			...args,
		});
	} catch (e) {
		const message =
			e.response?.data?.message ||
			`Request failed (${e.response?.status})` ||
			e.message;

		toast(message, { type: 'error' });

		if (['Expired JWT Token', 'Invalid JWT Token'].includes(message)) {
			store.commit('setToken', false);
			router.push('/');
		}
		// console.log(e);
	}

	active.splice(
		active.findIndex((item) => item === requestId),
		1,
	);

	return result?.data;
}

export default requestAPI;
