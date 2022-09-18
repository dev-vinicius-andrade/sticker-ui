import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import axios from "axios";
import routerModule from "./router";
import storeModule from "./store";
import vuetify from "./plugins/vuetify";
import utils from '@plugins/utils';
import i18n from '@locales/i18n';
import notifications from '@plugins/notificationsPlugin';
import pluralizationTypes from '@/constants/pluralizationTypes';
import colors from 'vuetify/lib/util/colors';
import Keycloak from 'keycloak-js';

async function main(){
  const realmConfiguration ={
    url:process.env.VUE_APP_AUTH_URL,
    realm:process.env.VUE_APP_AUTH_REALM,
    clientId:process.env.VUE_APP_AUTH_CLIENT_ID,
    onLoad:'login-required',
    scope:'openid profile email',
  };
  const keycloak = new Keycloak(realmConfiguration);
  const store = storeModule(keycloak);
  const router = routerModule(store);

  await initialLogin(realmConfiguration,store);
  await store.dispatch('module_authentication/startRefreshToken')
  console.log(keycloak)
  Vue.use(utils, { store });
  Vue.use(notifications, { store: store });
  Vue.config.productionTip = false;
  Vue.prototype.$pluralizationTypes = pluralizationTypes;
  Vue.prototype.$colors =colors;
  
  new Vue({
    i18n,
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
}
async function initialLogin(realmConfiguration,store){
  await store.dispatch('module_authentication/setConfiguration',realmConfiguration);
  while(!(await store.dispatch('module_authentication/login')))
  {console.log('not logged', keycloak.authenticated, keycloak)}
}
main();