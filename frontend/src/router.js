import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/MainPage.vue'
import ShowMovie from './components/ShowMovie.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/movie/:id',
        name: 'Movie',
        component: ShowMovie
    },
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router