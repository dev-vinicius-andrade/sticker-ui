//import createPersistedState from 'vuex-persistedstate';
const module = {
  namespaced: true,
  state: {
    theme:'dark'
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
    toggleTheme({commit}) {
      commit('toggle_theme')
    },
    setDarkTheme({ commit }) {
      commit('set_theme', 'dark');
    },
    setLightTheme({ commit }) {
      commit('set_theme', 'light');
    },

  },
  getters: {
    isDarkThemeSet:(state) => state.theme === 'dark',
    isLightThemeSet:(state) => state.theme === 'light',
  }
};
export default  module;
