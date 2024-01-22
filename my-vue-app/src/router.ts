import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import TodoList from './components/TodoList.vue'
import CreateTodo from './components/CreateTodo.vue'
import DetailsPage from './components/DetailsPage.vue'
import UpdateTodo from './components/UpdateTodo.vue'


const routes: Array<RouteRecordRaw> = [
 { path: '/', component: TodoList },
 { path: '/CreateTodo', component: CreateTodo},
 {path:'/details', component: DetailsPage},
 {path:'/UpdateTodo', component: UpdateTodo}
];


const router = createRouter({
 history: createWebHistory(),
 routes,
});


export default router;
