import { createApp } from 'vue';
import router from './router';
import store from './store';
import Toast from 'vue-toastification';
import App from './App.vue';

createApp(App).use(Toast).use(router).use(store).mount('#app');
