import Vue from 'vue';
import VueI18n from 'vue-i18n';
//docs https://kazupon.github.io/vue-i18n/introduction.html
Vue.use(VueI18n);
const messages = {
    'pt-BR': require('./pt-BR/messages'),
    'en-US': require('./en-US/messages'),
};
const numberFormats = {
    'pt-BR': require('./pt-BR/formats/number'),
    'en-US': require('./en-US/formats/number')
};
const dateTimeFormats = {
    'pt-BR': require('./pt-BR/formats/datetime'),
    'en-US': require('./en-US/formats/datetime')
}

const i18n = new VueI18n({
    locale: 'en-US',
    fallbackLocale: 'en-US', 
    messages,
    numberFormats,
    dateTimeFormats, 
});
export default i18n;