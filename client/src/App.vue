<template>
  <router-view :style="cssProps" />
</template>

<script>
import AppBar from "@components/AppBar.vue";
import { mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    // AppBar,
  },
  data: () => ({}),
  created() {
    this.$i18n.locale = this.$store.getters["module_locale/getLocale"];
    this.$vuetify.theme.dark = this.darkMode;
    const configurations = this.$store.getters["module_configurations/get"];
    document.title = `${configurations.site.name}`;
  },
  computed: {
    darkMode() {
      const isDarkThemeSet = this.$store.getters["module_theme/isDarkThemeSet"];
      return isDarkThemeSet;
    },
    cssProps() {
      var themeColors = {};
      Object.keys(this.$vuetify.theme.currentTheme).forEach((color) => {
        themeColors[`--v-${color}`] = this.$vuetify.theme.currentTheme[color];
      });
      return themeColors;
    },
  },
};
</script>
<style>
.pre-wrapped {
  white-space: pre-wrap; /* css-3 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}
.pre-inherited {
  white-space: inherit; /* css-3 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}
</style>
