//import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';
const module = {
    namespaced: true,
    state: {
    },
    plugins: [  ],
    modules: {
    },
    mutations: {
      set_theme(state, theme) {
        state.theme = theme;
      },
      toggle_theme(state) {
        state.theme = state.theme == 'dark' ? 'light' : 'dark';
      }
    },
    actions: {
      get_authenticated(context) {
        commit('toggle_theme')
      },
      get_unauthenticated(context) {
        commit('toggle_theme')
      },
    },
    getters: {
      isDarkThemeSet:(state) => state.theme === 'dark',
      isLightThemeSet:(state) => state.theme === 'light',
    }
  };
  export default  module;
  