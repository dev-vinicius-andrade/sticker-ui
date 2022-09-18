const notificationsPlugin = {
  install: (Vue, { store }) => {
    
    if (!store) {
      throw new Error('Please provide vuex store.')
    }

    Vue.prototype.$notifications = {
      notify: function ({content = 'Notification', color = 'primary',exception=null, position={ absolute:true, right:true, top:true,left:false, bottom:false, centered:false}, aditionalInfo=null, locale={key:undefined,count:undefined, single:true,args:undefined}, timeout=1250}) {
        store.commit('module_notifications/notifications_show_message',{ content, color,exception,position,aditionalInfo,locale, timeout },{ root: true })
      },
      notifyInfo: function ({content = '', position={ absolute:true, right:true, top:true,left:false, bottom:false, centered:false}, aditionalInfo=null,locale={key:undefined,count:undefined, single:true,args:undefined}, timeout=1250}) {
        this.notify({ content, color: 'info', position, aditionalInfo, locale, timeout })
      },
      notifySuccess: function ({content = '', position={ absolute:true, right:true, top:true,left:false, bottom:false, centered:false}, aditionalInfo=null,locale={key:undefined,count:undefined, single:true,args:undefined}, timeout=1250}) {
        this.notify({ content, color: 'success', position, aditionalInfo, locale, timeout })
      },
      notifyWarning: function ({content = '', position={ absolute:true, right:true, top:true,left:false, bottom:false, centered:false}, aditionalInfo=null,locale={key:undefined,count:undefined, single:true,args:undefined}, timeout=1250}) {
        this.notify({ content, color: 'warning', position, aditionalInfo, locale, timeout })
      },
      notifyError: function ({content = '', exception=null, position={ absolute:true, right:true, top:true,left:false, bottom:false, centered:false}, aditionalInfo=null,locale={key:undefined,count:undefined, single:true,args:undefined}, timeout=1250}) {
        this.notify({ content, color: 'error',exception, position, aditionalInfo, locale, timeout })
      }

    }
  }
}
export default notificationsPlugin
