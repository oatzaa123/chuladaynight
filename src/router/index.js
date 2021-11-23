import { createRouter, createWebHistory } from "vue-router";
// import store from './../store/index'
import Home from "./../pages/Home.vue";

const routes = [
  {
    path: "/",
    component: () => import("../layouts/Main.vue"),
    children: [
      {
        path: "/",
        redirect: "/Home",
      },
      {
        path: "/Home",
        name: "Home",
        component: Home,
      },
    ],
  },
  {
    path: "/",
    component: () => import("../layouts/Default.vue"),
    children: [
      {
        path: "/",
        redirect: "/Home",
      },
      {
        path: "/About",
        name: "About",
        component: () =>
          import(/* webpackChunkName: "About" */ "../pages/About.vue"),
      },
      {
        path: "/Contact",
        name: "Contact",
        component: () =>
          import(/* webpackChunkName: "Contact" */ "../pages/Contact.vue"),
      },
      {
        path: "/Gallery",
        name: "Gallery",
        component: () =>
          import(
            /* webpackChunkName: "Gallery" */ "../pages/gallery/Gallery.vue"
          ),
      },
      {
        path: "/Gallery/:id",
        name: "Gallery-id",
        component: () =>
          import(/* webpackChunkName: "Gallery" */ "../pages/gallery/_id.vue"),
      },
      {
        path: "/News",
        name: "News",
        component: () =>
          import(/* webpackChunkName: "News" */ "../pages/New/News.vue"),
      },
      {
        path: "/News/:id",
        name: "News-id",
        component: () =>
          import(/* webpackChunkName: "News" */ "../pages/New/_id.vue"),
      },
      {
        path: "/Workshop",
        name: "Workshop",
        component: () =>
          import(
            /* webpackChunkName: "Workshop" */ "../pages/Workshop/Workshop.vue"
          ),
      },
      {
        path: "/Workshop/:id",
        name: "Workshop-id",
        component: () =>
          import(
            /* webpackChunkName: "Workshop" */ "../pages/Workshop/_id.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(savedPosition);
        }, 500);
      });
    } else {
      return { left: 0, top: 0 };
    }
  },
  routes,
});

// router.beforeEach((to, from, next) => {
//     if (!store.state.isAuthenticated) next({ name: 'Auth' })
//     else next()
// })

export default router;
