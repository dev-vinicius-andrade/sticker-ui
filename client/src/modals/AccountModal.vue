<template>
  <Dialog
    v-model="openDialog"
    button-type-icon
    button-icon="mdi-account"
    button-text-key="variations.account.Text"
    button-large
  >
    <template v-slot:content>
      <v-container fluid>
        <v-row no-gutters>
          <v-col>
            <v-card>
              <v-card-title>
                {{ $tc("variations.account.Text", 1) }}
              </v-card-title>
              <v-card-subtitle>{{
                $store.getters["module_authentication/name"]
              }}</v-card-subtitle>
              <v-card-text>
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ $tc("variations.id.Text", 1) }}
                      </v-list-item-title>
                      {{ $store.getters["module_authentication/id"] }}
                    </v-list-item-content>
                    <v-list-item-action align>
                      <v-btn icon @click="copyId()">
                        <v-icon>mdi-copy-content</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ $tc("variations.email.Text", 1) }}
                      </v-list-item-title>
                      {{ $store.getters["module_authentication/email"] }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ $tc("variations.permission.Text", 2) }}
                      </v-list-item-title>
                      {{ $store.getters["module_authentication/roles"] }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title> Current Token </v-list-item-title>

                      <v-text-field
                        :value="currentToken"
                        append-icon="mdi-content-copy"
                        @click:append="copyToken"
                      >
                      </v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click.stop="logout()">{{
                  $t("texts.loggout.Text")
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </Dialog>
</template>
<script>
import Dialog from "@components/dialog/Dialog.vue";
import GenericDataMixin from "@mixins/genericData.js";
export default {
  name: "",
  components: { Dialog },
  mixins: [GenericDataMixin],
  props: {},
  data: () => {
    return {
      openDialog: false,
    };
  },
  created() {
    this.isCreated = true;
  },
  watch: {
    openDialog: {
      handler: function (val) {
        if (val) {
          console.log("opened");
        } else {
          console.log("closed");
        }
      },
      deep: true,
    },
  },
  computed: {
    currentToken() {
      return this.$store.getters["module_authentication/token"];
    },
  },
  methods: {
    copyId() {
      this.$utils.copyToClipboard(
        this.$store.getters["module_authentication/id"]
      );
      this.$notifications.notify({
        locale: { key: "templates.copiedToClipboard" },
      });
    },
    copyToken() {
      this.$utils.copyToClipboard(
        this.$store.getters["module_authentication/token"]
      );
      this.$notifications.notify({
        locale: { key: "templates.copiedToClipboard" },
      });
    },
    show() {
      this.openDialog = true;
    },
    hide() {
      this.openDialog = false;
    },
    async logout() {
      await this.$store.dispatch("module_authentication/logout");
      this.$router.push({ name: "login" });
    },
  },
  mounted() {
    this.isMounted = true;
  },
};
</script>
