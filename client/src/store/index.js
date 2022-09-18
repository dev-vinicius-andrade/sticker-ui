import Vue from "vue";
import Vuex from "vuex";
import simpleBrowserFingerprint from "simple-browser-fingerprint";
import createPersistedState from 'vuex-persistedstate';
import SecureLS from "secure-ls";
import module_menu from '@store/modules/module_menu';
import module_theme from '@store/modules/module_theme';
import module_locale from '@store/modules/module_locale';
import module_albums from '@store/modules/module_albums'
import module_configurations from '@store/modules/module_configurations';
import module_notifications from '@store/modules/module_notifications';
import module_authentication from '@store/modules/module_authentication';
function store(keycloak) {
  const ls = new SecureLS({
    encryptionNamespace: '12AEC20B3B904E62A3A3F22FEBE7AEA2',
    encodingType: "aes",
    encryptionSecret: `350A047A3D724461A1F256A9EBBCCBEA`,
    isCompression: false
  });
  Vue.use(Vuex);
  return new Vuex.Store({
    state: {},
    modules: {
      module_menu: module_menu,
      module_theme: module_theme,
      module_albums: module_albums,
      module_locale: module_locale,
      module_notifications:module_notifications,
      module_configurations: module_configurations,
      
      module_authentication: module_authentication(keycloak),
    },
    plugins: [
      createPersistedState({
        key: '12AEC20B3B904E62A3A3F22FEBE7AEA2',
        paths: [
          "module_authentication.connectedUser",
          "module_authentication.authentication",
          "module_theme.theme",
          "module_locale.locale",
          "module_menu.menuState",
        ],
        storage: {
          getItem: (key) => { const result = ls.get(key); console.log(result); return result; },
          setItem: (key, value) => ls.set(key, value),
          removeItem: (key) => ls.remove(key),
        },
      })
    ],
    getters: {},
    mutations: {},
    actions: {},
  });
}
export default store;
