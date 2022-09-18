<template>
    <v-container>
      <v-switch v-if="!iconOnly" v-model="darkMode" :append-icon="(appendIcon)?icon:undefined"/>
      <v-icon v-else>{{icon}}</v-icon>
    </v-container>
</template>
<script>
export default {
  name: 'ThemeSelector',
  props:{
    appendIcon:{
      type: Boolean,
      default: true,
    },
    iconOnly:{
      type: Boolean,
      default: false,
    }
  },
  methods: {
    toggleTheme() {
        this.$store.dispatch('module_theme/toggleTheme');
        const isDarkThemeSet = this.$store.getters['module_theme/isDarkThemeSet'];
        this.$vuetify.theme.dark =isDarkThemeSet;
        return isDarkThemeSet;
    }
  },
  computed: {
    darkMode:{
      get() {
        return this.$store.getters['module_theme/isDarkThemeSet'];
      },
      set(value) {
        this.toggleTheme();
      }
    },
    icon()
    {
      return this.$store.getters['module_theme/isDarkThemeSet'] ?  'dark_mode':'mdi-lightbulb' ;
    }
  }
}
</script>