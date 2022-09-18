<template>
    <div>
        <div v-if="hasMultipleLanguages">
            <v-switch v-if="enableSwitch" 
                    :input-value="$i18n.locale" 
                    @change="changeLocale"
                    :true-value="languages[0]" 
                    :dark="dark" :color="color" 
                    :false-value="languages[1]" 
                    :label="$i18n.locale"
            />
            <v-col v-else :width="selectWidth">
            <v-select  :items="languages"  v-model="$i18n.locale" @change="changeLocale" :dark="dark" :color="color"/>
            </v-col>
        </div>
        <div v-else :class="textColorClassPersisted">
            {{ languages[0] }}
        </div>
    </div>
</template>
<script>
export default {
    props:{
        disableSwitch: {
            type: Boolean,
            default: false
        },
        textColorClass:{
            type:String,
            default:'black--text font-weight-light'
        },
        color:{
            type:String,
            default:'white'
        },
        dark: {
            type: Boolean,
            default: false
        },
        langs:{
            type:Array,
            default:()=>{
                return ['en-US'];
            }
        }
    },
    name: 'LocaleSelector',
    data() {
        return {
            selectedLang: this.$i18n.locale,
            languages:this.langs,
        };
    },
    computed:{
        selectWidth(){
            return (this.$i18n.locale.length +15) + "px";
        },
        textColorClassPersisted(){
            return this.dark?  this.textColorClass.replace("black","white"):this.textColorClass;
        },
        hasMultipleLanguages(){ return this.languages.length > 1;},
        enableSwitch(){return this.languages.length ===2 && !this.disableSwitch;}
    },
    methods: {
        changeLocale(lang) {
            this.$store.dispatch('module_locale/setLocale', lang);
            this.$i18n.locale = lang;
        },
    },
    created() {
    },
    beforeCreate() {
    }
};

</script>
<style scoped>
.v-select.fit {
  width: min-content;
}
.v-select.fit  .v-select__selection--comma {
    text-overflow: unset;
}
</style>