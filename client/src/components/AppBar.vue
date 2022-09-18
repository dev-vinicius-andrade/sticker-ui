<template>
  <div>
    <v-app-bar app clipped-left>
      <!-- <v-toolbar> -->
      <v-app-bar-title>
        <router-link to="/" style="cursor: pointer">
          <v-img
            v-if="$store.getters['module_theme/isDarkThemeSet']"
            contain
            :max-width="iconSize"
            :max-height="iconSize"
            src="/image/icons/dark/icon.svg"
          />
          <v-img
            v-else
            contain
            :max-width="iconSize"
            :max-height="iconSize"
            src="/image/icons/light/icon.svg"
          />
        </router-link>
      </v-app-bar-title>
      <v-btn plain x-large key="home" to="/">
        {{ $store.getters["module_configurations/get"].site.name }}
      </v-btn>
      <!-- <v-toolbar-items class="hidden-md-and-down"> -->

      <MenuItems
        :items="itemsFiltered.filter((i) => i.align === 'left')"
        icon
        plain
        x-large
        class="hidden-md-and-down"
      />

      <v-spacer />
      <MenuItems
        :items="itemsFiltered.filter((i) => i.align === 'right')"
        plain
        icon
        x-large
        class="hidden-md-and-down"
      />
      <v-divider vertical />
      <NotificationsModal />
      <AccountModal />
      <ConfigurationModal />
      <v-app-bar-nav-icon
        class="hidden-lg-and-up"
        v-on:click.prevent
        @click.stop="toogleMenu()"
      />
      <!-- @click="sidebar = !sidebar"/> -->
    </v-app-bar>
    <div>
      <NavigationBar
        ref="menu"
        :onMenuClosed="onMenuClosed"
        :items="itemsFiltered"
        v-if="enableNavigationDrawer"
        class="hidden-lg-and-up"
      />
    </div>
  </div>
</template>
<script>
import AccountModal from "@modals/AccountModal";
import NotificationsModal from "@modals/NotificationsModal";
import ConfigurationModal from "@modals/ConfigurationModal";

import pluralizationTypes from "@constants/pluralizationTypes";
import roles from "@constants/roles";
import NavigationBar from "@components/NavigationBar.vue";
import MenuItems from "@components/MenuItems.vue";
export default {
  name: "AppBar",
  components: {
    AccountModal,
    NotificationsModal,
    ConfigurationModal,
    NavigationBar,
    MenuItems,
  },
  props: {
    iconSize: {
      type: String,
      default: "48px",
    },
    permanent: {
      type: Boolean,
      default: false,
    },
    enableNavigationBar: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      openMenu: true,
      mini: false,
      items: [
        {
          visible: true,
          align: "left",
          icon: {
            key: "mdi-book-open",
            class: "hidden-md-and-up",
          },
          content: {
            class: null,
            title: {
              locale: { key: "variations.album.Text", count: 2 },
            },
          },
          id: "administration",
          type: "link",
          to: "/albums",
          target: null,
          function: this.openInternalUrl,
          requiredRoles: [roles.user],
        },
        // {
        //   visible: true,
        //   align: "right",
        //   icon: { key: "mdi-account", class: null },
        //   content: {
        //     class: "hidden-md-and-up",
        //     title: {
        //       locale: { key: "variations.account.Text", count: 1 },
        //     },
        //   },
        //   id: "account",
        //   type: "button",
        //   function: this.openAccountModal,
        //   requiredRoles: [roles.user],
        // },
        // {
        //   visible: true,
        //   align: "right",
        //   icon: { key: "mdi-cog", class: null },
        //   content: {
        //     class: "hidden-md-and-up",
        //     title: {
        //       locale: { key: "variations.configuration.Text", count: 2 },
        //     },
        //   },
        //   id: "configurations",
        //   type: "button",
        //   function: this.openConfigurationModal,
        //   requiredRoles: [roles.user],
        // },
      ],
    };
  },
  computed: {
    enableNavigationDrawer: (self) =>
      !self.$vuetify.breakpoint.lg && !self.$vuetify.breakpoint.xl,
    itemsFiltered() {
      const self = this;
      const userRoles = this.$store.getters["module_authentication/roles"];
      const defaultRoles = [roles.user];
      console.log(roles);
      return this.items.filter(
        (item) =>
          item.visible &&
          self.$utils.contains(
            item?.requiredRoles ?? defaultRoles,
            userRoles,
            true,
            false
          )
      );
    },
  },
  methods: {
    onMenuClosed() {
      this.openMenu = false;
      this.$forceUpdate();
    },
    toogleMenu() {
      this.$store.commit("module_menu/toogle_menu");
    },
    openExternalUrl(item) {
      window.open(item.href, item.target);
    },
    openInternalUrl(item, replace = false) {
      this.$router.push({ path: item.to, replace: replace });
    },
    openConfigurationModal() {
      this.$refs.configurationModal.show();
    },
    openAccountModal() {
      this.$refs.accountModal.show();
    },
  },
};
</script>
<style scoped>
.active-list-item {
  background-color: var(--v-active_menu_color);
  /* //Rgba(0,0,0,0.1); */
}
</style>
