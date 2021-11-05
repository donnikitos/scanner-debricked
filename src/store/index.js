import { createStore } from 'vuex';
import authStore from './auth';

const store = createStore({
	modules: {
		auth: authStore,
	},
});

export default store;
