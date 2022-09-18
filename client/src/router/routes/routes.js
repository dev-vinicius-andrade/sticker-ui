const routes = [
    {
      path: "/login",
      name: "login",
      component: () =>  import(/* webpackChunkName: "about" */ "@views/Login.vue"),
    },

    {
      path: "",
      meta: { requiresAuth: true },
      component: () =>  import(/* webpackChunkName: "about" */ "@layouts/LoggedAreaLayout.vue"),
      children:[
        {
          path: "/",
          name: "HomeView",
          component: () =>  import(/* webpackChunkName: "about" */ "@views/logged/HomeView.vue"),
        },
        {
          path: "/about",
          name: "About",
          component: () =>  import(/* webpackChunkName: "about" */ "@views/logged/AboutView.vue"),
        },
        {
          path: "/albums",
          component: () =>  import(/* webpackChunkName: "about" */ "@layouts/RouteLayout.vue"),
          children:[
            {
              path: "",
              name: "/albums",
              component: () =>  import(/* webpackChunkName: "about" */ "@views/logged/album/Albums.vue"),
            }
          ],
        },
      ]
    },
];
export default routes;