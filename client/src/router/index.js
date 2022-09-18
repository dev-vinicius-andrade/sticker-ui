import Vue from "vue";
import VueRouter from "vue-router";
import routes from '@router/routes/routes.js';
const router = function(store){
  Vue.use(VueRouter);
  const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
  });
  function requires_roles(meta)
  {
    console.log(meta)
    return meta.roles && meta.roles.length>0?true:false
  }
  
  function userHasRole(router,rouleRoute) {
    console.log('user roles')
    console.log(store.getters['module_authentication/getRoles'])
    return store.getters['module_authentication/getRoles'].filter(rule => rouleRoute.meta.roles.includes(rule));
  }
  async function each_logged_area_routes(router,to,from,next) {
    try {
      const roleRoute = to.matched.find(record => requires_roles(record.meta));
      if(roleRoute)
      {
        // await store.dispatch('module_authentication/refreshToken');
        if(userHasRole(router,roleRoute)) {
          console.log('tem permissão')
          next();
        }
        else {
          this.$notifications.notifyError("You are not authorized to access this content");
          next('/')
        }
      }else
      {
        console.log('nao precisa de role, continuando...')

        // await router.app.$store.dispatch('module_authentication/refreshToken');
        next();
      }
    } catch (err) {
      console.log('error refreshing token');
      console.log(err);
      next('/login');
    }
    return;
  }
  router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (store.getters["module_authentication/authenticated"]) {
        await each_logged_area_routes(router,to,from,next);
      }else {
        next('/login');
      }
    } else {
      next();
    }
  });
  return router;
}


export default router;
