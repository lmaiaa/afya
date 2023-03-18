import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@/style.scss';
import App from './App.vue';
import router from '@/router';
import { vMaska } from 'maska';

const pinia = createPinia();

createApp(App).directive('maska', vMaska).use(pinia).use(router).mount('#app');
