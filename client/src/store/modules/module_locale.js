//import createPersistedState from 'vuex-persistedstate';
const module = {
  namespaced: true,
  state: {
    locale: (navigator.language || navigator.userLanguage),
    availableLocales: ['pt-BR','en-US']
  },
  plugins: [  ],
  modules: {
  },
  mutations: {
    set_locale(state, locale) {
      state.locale = locale;
    }
  },
  actions: {
    setLocale({ commit }, locale) {
      commit('set_locale', locale);
    },

  },
  getters: {
    getLocale:(state) => state.locale,
    getAvailableLocales:(state) => state.availableLocales,
  }
};
export default  module;
