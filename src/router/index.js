import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import Auth from '../views/Auth/index.vue';

const routes = [
	{
		path: '/',
		name: 'auth',
		component: Auth,
	},
	{
		path: '/scanner/:id?',
		name: 'scanner',
		component: () => import('../views/Scan/index.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, _from, next) => {
	if (to.path !== '/' && !store.state.auth.token) {
		next({ path: '/' });
	} else if (to.path === '/' && store.state.auth.token) {
		next({ path: '/scanner' });
	} else {
		next();
	}
});

export default router;
