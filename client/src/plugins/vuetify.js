import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true
        },
        light: {
            background:"#cccccc",
        },
        dark: {
            background:"#1e1e1e",
        },
        themes: {
            light: {
                active_menu_color:"#bcbcbc",
            },
            dark: {
                active_menu_color:"#323232",
            }
        }
    }
});
