import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/home/HomePage.vue";
import UsersPage from "../components/users/UsersPage.vue";
import BlacklistPage from "../components/blacklist/BlacklistPage.vue";
import HistoryPage from "../components/history/HistoryPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/users", component: UsersPage },
    { path: "/blacklist", component: BlacklistPage },
    { path: "/history", component: HistoryPage },
  ],
});

export default router;