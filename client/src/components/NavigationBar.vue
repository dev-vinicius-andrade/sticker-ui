<template>
  <v-navigation-drawer v-model="openMenu" app>
    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.id"
        :to="
          item.type === 'link' && item.to && !item.href ? item.to : undefined
        "
        :href="
          item.type === 'link' && !item.to && item.href ? item.href : undefined
        "
        :target="
          item.type === 'link' && !item.to && item.href
            ? item.target
            : undefined
        "
        @click.stop="item.type === 'button' ? item.function(item) : undefined"
        active-class="active-list-item"
      >
        <v-list-item-icon>
          <template v-if="!item.icon.color">
            <v-icon>{{ item.icon.key }}</v-icon>
          </template>
          <template v-else>
            <v-icon :color="item.icon.color">{{ item.icon.key }}</v-icon>
          </template>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-if="item.content.title.locale.count">
            {{
              $tc(
                item.content.title.locale.key,
                item.content.title.locale.count
              )
            }}
          </v-list-item-title>
          <v-list-item-title v-else>
            {{ $t(item.content.title.locale.key) }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import pluralizationTypes from "@constants/pluralizationTypes";
export default {
  name: "NavigationBar",
  components: {},
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    initialState: {
      type: Boolean,
      default: false,
    },
    permanent: {
      type: Boolean,
      default: false,
    },
    onMenuClosed: {
      type: Function,
      default: null,
    },
  },
  watch: {
    "$vuetify.breakpoint.name": function (newBreakpoint, oldBreakpoint) {
      this.openMenu = false;
      this.$forceUpdate();
    },
  },
  data() {
    return {};
  },
  computed: {
    mini: {
      get() {
        const value = this.$store.getters["module_menu/mini"];
        return value;
      },
      set(value) {
        this.$store.commit("module_menu/set_mini", value);
      },
    },
    openMenu: {
      get() {
        const value = this.$store.getters["module_menu/openMenu"];
        return value;
      },
      set(value) {
        this.$store.commit("module_menu/set_open_menu", value);
      },
    },
  },
  methods: {
    showConfigurationModal() {
      this.$refs.configurationModal.show();
    },
    async hidePermanentMenu() {
      await this.$store.dispatch("module_menu/close");
      this.close();
    },
    close() {
      if (this.onMenuClosed) this.onMenuClosed();
      this.$forceUpdate();
    },
    goPageByName(name) {
      this.$router.push({ name: name });
    },
    goPageByPath(path) {
      this.$router.push({ path: path, replace: true });
    },
    goToInformation() {
      this.goPageByName("InformationView");
    },
    goToPayments() {
      this.goPageByName("PaymentsView");
    },
    goToEvents() {
      this.goPageByName("EventsView");
    },
    gotToLocation() {
      this.goPageByName("LocationView");
    },
  },
};
</script>
<style scoped>
.active-list-item {
  background-color: Rgba(0, 0, 0, 0.1);
}
</style>
