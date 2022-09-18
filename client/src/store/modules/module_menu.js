const module_menu = {
  namespaced: true,
  state: () => ({
    menuState: {
      mini: false,
      openMenu: true
    },
  }),
  mutations:
    {
      set_open_menu(state, value) {
        state.menuState.openMenu = value;
      }
      ,
      set_mini(state, value) {
        state.menuState.mini = value;
      }
      ,
      toogle_menu(state) {
        state.menuState.mini = !state.menuState.openMenu ? false : !state.menuState.mini;
        state.menuState.openMenu = true;
      }
      ,
      hide_permanent_menu(state) {
        state.menuState.openMenu = false;
      }
    }
  ,
  actions: {
    setOpenMenu({commit, state, rootState, getters}, value) {
      return new Promise((resolve) => {
        commit('set_open_menu', value);
        resolve(state.openMenu);
      });

    }
    ,
    setMini({commit, state, rootState, getters}, value) {
      return new Promise((resolve) => {
        commit('set_mini', value);
        resolve(state.mini);
      });
    }
    ,
    toogleMenu({commit, state, rootState, getters}) {
      return new Promise((resolve) => {
        commit('toogle_menu');
        resolve(state.openMenu);
      });

    }
    ,
    close({commit, state, rootState, getters}) {
      return new Promise((resolve) => {
        commit('hide_permanent_menu');
        resolve(state.openMenu);
      });
    }
  }
  ,
  getters: {
    mini: (state) => state.menuState.mini,
    openMenu: (state) => state.menuState.openMenu,
  }
};
export default module_menu;
