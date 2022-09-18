const module_notifications = {
  namespaced: true,
  state: () => ({
    alertNewNotificationState: true,
    content: '',
    exception:null,
    color: 'primary',
    aditionalInfo: null,
    timeout:1250,
    position:{
      absolute:false,
      right:false,
      top:false,
      left:false,
      bottom:false,
      centered:false
    },
    locale:{
      key:undefined,
      count:undefined,
      single:true,
      args:undefined
    }
  }),
  mutations: {
    set_alert_new_notifications_state(state,value)
    {
      state.alertNewNotificationState = value;
    },
    notifications_show_message(state, payload) {
      state.content = payload.content;
      state.exception = payload.exception;
      state.color = payload.color;
      state.aditionalInfo=payload.aditionalInfo?payload.aditionalInfo:null;
      state.timeout=payload.timeout?payload.timeout:1250;
      state.position.top      = payload?.position?.top!==undefined?payload.position.top:false;
      state.position.left     = payload?.position?.left!==undefined?payload.position.left:false;
      state.position.right    = payload?.position?.right!==undefined?payload.position.right:false;
      state.position.bottom   = payload?.position?.bottom!==undefined?payload.position.bottom:false;
      state.position.centered = payload?.position?.centered!==undefined?payload.position.centered:false;
      state.position.absolute = payload?.position?.absolute!==undefined?payload.position.absolute:true;
      state.locale.key        = payload?.locale?.key!==undefined?payload.locale.key:undefined;
      state.locale.count      = payload?.locale?.count!==undefined?payload.locale.count:undefined;
      state.locale.single     = payload?.locale?.single!==undefined?payload.locale.single:true;
      state.locale.args = payload.locale.args!==undefined?payload.locale.args:undefined;
    }
  },
  getters:{
     alertNewNotificationState:(state)=>state.alertNewNotificationState
  }
};
export default module_notifications;
