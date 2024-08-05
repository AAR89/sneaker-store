import './assets/main.css';

import App from './App.vue';
import { createApp } from 'vue';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import FavoritesPage from './pages/FavoritesPage.vue';

const app = createApp(App);

const routes = [
  { path: '/sneaker-store', name: 'HomePage', component: HomePage },
  { path: '/sneaker-store/favorites', name: 'FavoritesPage', component: FavoritesPage }
];
const router = createRouter({
  history: createWebHistory(),
  routes
});

app.use(router);
app.use(autoAnimatePlugin);

app.mount('#app');
