<template>
  <Dialog
    v-model="openDialog"
    button-type-icon
    button-icon="mdi-cog"
    button-large
    button-text-key="variations.configuration.Text"
    :button-text-count="2"
  >
    <template v-slot:content>
      <v-card>
        <v-card-title>{{ $t("configuration.title") }}</v-card-title>
        <v-divider />
        <v-card-text>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{
                  $t("configuration.theme")
                }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action><theme-selector /></v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{
                  $t("configuration.language")
                }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <locale-selector
                  disableSwitch
                  :langs="$store.getters['module_locale/getAvailableLocales']"
                />
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-divider />
      </v-card>
    </template>
  </Dialog>
</template>
<script>
import Dialog from "@components/dialog/Dialog.vue";
import LocaleSelector from "@components/LocaleSelector";
import ThemeSelector from "@components/ThemeSelector";
export default {
  name: "NavigationBar",
  components: {
    Dialog,
    ThemeSelector,
    LocaleSelector,
  },
  data() {
    return {
      openDialog: false,
    };
  },
  methods: {
    show() {
      this.openDialog = true;
    },
    close() {
      this.openDialog = false;
    },
  },
};
</script>
