import axios from 'axios';

// import jwt_decode from 'jwt-decode';
// import qs from 'qs';
const module =function(keycloak) {
  return {
    namespaced: true,
    state: {
      keycloak
    },
    mutations: {
      set_configuration(state,payload){
        state.configuration = payload;
      },
      set_status(state,payload){
        state.authentication.status = payload;
      }
    },
    actions: {
      setConfiguration({commit, state, rootState,dispatch, getters}, payload)
      {
        commit('set_configuration', payload);
      },
      async logout({commit, state, rootState,dispatch, getters}){
        try {
          commit('set_status','logout_started');
          await keycloak.logout();
          commit('set_status','logout_finished');
          return true;
        } catch (error) {
          commit('set_status','error_logout');
        }
      },
      async login({commit, state, rootState,dispatch, getters}){
         try {
          commit('set_status','login_started');
          const result = await  keycloak.init({ onLoad: getters.configuration.onLoad })
          console.log(result)
          commit('set_status','login_finished');
          return result;
        } catch (error) {
          commit('set_status','login_error');
          return false;
        }
      },
      async startRefreshToken({commit, state, rootState,dispatch, getters}){
      const interval=   setInterval(() => {
          keycloak.updateToken(70).then((refreshed) => {
            if (refreshed) {
              console.log('Token refreshed', refreshed, getters.token);
            } else {
              console.log('Token not refreshed, valid for '
                + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
            }
          }).catch(() => {
          console.log('Failed to refresh token');
          });
        }, 6000)
        return interval;
    },
    },
    
    getters: {
      configuration:(state)=>state.configuration,
      authenticated:(state)=>keycloak.authenticated,
      name:(state)=>keycloak.tokenParsed.name,
      email:(state)=>keycloak.tokenParsed.email,
      token:(state)=>keycloak.token,
      roles:(state)=>keycloak.tokenParsed.realm_access.roles,
      id:(state)=>keycloak.tokenParsed.sub,
      isAdmin:(state)=>keycloak.hasRealmRole('admin'),
    }
  }
}
export default module;
