import objectToFormData from '@/functions/objectToFormData';
import requestAPI from '@/functions/requestAPI';

export default {
	state() {
		return {
			token: localStorage.getItem('token') || undefined,
		};
	},
	mutations: {
		setToken(state, payload) {
			const token = payload || undefined;

			if (token) {
				localStorage.setItem('token', token);
			} else {
				localStorage.removeItem('token');
			}
			state.token = token;
		},
	},
	actions: {
		async auth({ commit }, payload) {
			const result = await requestAPI(
				'POST',
				'login_check',
				{
					data: objectToFormData({
						_username: payload.username,
						_password: payload.password,
					}),
				},
				false,
			);

			if (result) {
				commit('setToken', result.token);
			}

			return result;
		},
	},
};
