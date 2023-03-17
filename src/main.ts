import { createApp } from 'vue';
import '@/style.scss';
import App from './App.vue';
import router from '@/router';
import { vMaska } from 'maska';

createApp(App).directive('maska', vMaska).use(router).mount('#app');
