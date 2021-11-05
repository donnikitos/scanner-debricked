import { createRouter, createWebHistory } from 'vue-router';
import Auth from '../views/Auth/index.vue';

const routes = [
	{
		path: '/',
		name: 'Authorize',
		component: Auth,
	},
	{
		path: '/scanner',
		name: 'Scanner',
		component: () => import('../views/Scan/index.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
