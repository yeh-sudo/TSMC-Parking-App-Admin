import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/home/HomePage.vue";
import UsersPage from "../components/users/UsersPage.vue";
import BlacklistPage from "../components/blacklist/BlacklistPage.vue";
import HistoryPage from "../components/history/HistoryPage.vue";
import AuthPage from "../components/auth/AuthPage.vue";
import AdminPage from "../components/adminview/adminview.vue"
import CreateAccount from "../components/auth/CreateAccount.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: AuthPage },
    { path: "/create-account", component: CreateAccount },
    {
      path: "/admin",
      component: AdminPage,
      children: [
        {
          path: "home",
          component: HomePage,
        },
        {
          path: "users",
          component: UsersPage,
        },
        {
          path: "blacklist",
          component: BlacklistPage,
        },
        {
          path: "history",
          component: HistoryPage,
        },
      ],
    },
  ],
});

export default router;
