<template>
  <div :id="$options.name">
    <Dialog
      v-model="openDialog"
      button-type-icon
      button-icon="mdi-bell"
      button-text-key="variations.notification.Text"
      :button-text-count="2"
      button-large
    >
      <template v-slot:button-inner-append>
        <v-badge
          v-if="hasNewNotification"
          bordered
          :content="storedNotificationsCount"
          bottom
          color="yellow darken-3"
          dot
          offset-x="-25"
          offset-y="-10"
        />
      </template>
      <template v-slot:content>
        <v-container fluid>
          <v-row no-gutters>
            <v-col>
              <v-card>
                <v-toolbar elevation="0">
                  <v-toolbar-title>
                    <v-icon>{{ notificationIcon }}</v-icon>
                    {{ $tc("variations.notification.textCammelCased", 2) }}
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          @click="clearNotifications()"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon>{{ clearNotificationsIcon }}</v-icon>
                        </v-btn>
                      </template>
                      <span>
                        {{ $t("texts.clearNotifications.textCammelCased") }}
                      </span>
                    </v-tooltip>
                  </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                  <v-list three-line>
                    <v-list-item
                      v-for="(item, index) in storedNotifications"
                      :key="index"
                    ></v-list-item>
                  </v-list>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </Dialog>
    <v-snackbar
      :timeout="notification.timeout"
      v-model="show"
      :color="notification.color"
      :absolute="notification.position.absolute"
      :right="
        notification.position.right &&
        !notification.position.left &&
        !notification.position.centered
      "
      :top="notification.position.top && !notification.position.bottom"
      :left="
        notification.position.left &&
        !notification.position.right &&
        !notification.position.centered
      "
      :bottom="notification.position.bottom && !notification.position.top"
      :centered="notification.position.centered"
      app
      style="z-index: 10000; top: 60px !important"
    >
      <text-value
        :text-key="notification?.locale?.key"
        :count="notification?.locale?.count"
        :single="notification?.locale?.single"
        :text="notification.message"
        :args="notification?.locale?.args"
      />
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="show = false">
          {{ $t("texts.close.textCammelCased") }}
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import Dialog from "@components/dialog/Dialog.vue";
import GenericDataMixin from "@mixins/genericData.js";
import TextValue from "@components/textValue/TextValue.vue";
export default {
  name: "",
  components: { Dialog, TextValue },
  mixins: [GenericDataMixin],
  props: {
    notificationIcon: {
      type: String,
      default: "mdi-bell",
    },
    deleteNotificationIcon: {
      type: String,
      default: "mdi-delete",
    },
    clearNotificationsIcon: {
      type: String,
      default: "mdi-notification-clear-all",
    },
    defaultNotificationTimeout: {
      type: Number,
      default: 1250,
    },
  },
  data: () => {
    return {
      openDialog: false,
      keepNotifications: 10,
      show: false,
      notification: {
        message: null,
        color: "primary",
        timeout: null,
        aditionalInfo: null,
        details: [],
        position: {
          absolute: true,
          right: true,
          top: true,
          left: false,
          bottom: false,
          centered: false,
        },
      },
      notificationsCountLastOpenedDialog: 0,
      storedNotifications: [],
      notificationStates: {
        enabled: "Enabled",
        disabled: "Disabled",
      },
      newNotification: false,
      showNotificationsDialog: false,
      showDetail: false,
      detailInfo: null,
      items: [{ header: "Today" }],
    };
  },
  created() {
    const self = this;
    this.notification.timeout = this.defaultNotificationTimeout;
    this.initializeDetailsInfo();
    this.cleanNotification();
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "module_notifications/notifications_show_message") {
        self.cleanNotification();
        self.notification.type =
          state.module_notifications.color.charAt(0).toUpperCase() +
          state.module_notifications.color.slice(1);
        self.notification.color = state.module_notifications.color;
        self.notification.avatar = state.module_notifications.color
          .charAt(0)
          .toUpperCase();
        self.notification.message = state.module_notifications.content;
        self.notification.locale = state.module_notifications.locale;
        self.notification.aditionalInfo =
          state.module_notifications.aditionalInfo;
        self.notification.timeout = state.module_notifications.timeout;
        self.notification.position.top =
          state.module_notifications.position.top;
        self.notification.position.left =
          state.module_notifications.position.left;
        self.notification.position.right =
          state.module_notifications.position.right;
        self.notification.position.bottom =
          state.module_notifications.position.bottom;
        self.notification.position.centered =
          state.module_notifications.position.centered;
        self.notification.position.absolute =
          state.module_notifications.position.absolute;
        self.notification.date = new Date().getMilliseconds();
        self.initializeDetailsInfo();
        self.notification.details.push({
          content: state.module_notifications.content,
          locale: state.module_notifications.locale,
        });
        if (state.module_notifications.exception) {
          self.notification.details.push({
            content: state.module_notifications.exception.message,
          });
          self.notification.details.push({
            content: state.module_notifications.exception.stack,
          });
        }
        if (state.module_notifications.aditionalInfo)
          self.notification.details.push({
            content: state.module_notifications.aditionalInfo,
          });
        self.newNotification = true;
        self.storedNotifications.unshift(self.notification);
        if (this.alertNewNotificationState) self.show = true;
        if (self.storedNotifications.length > self.keepNotifications)
          self.storedNotifications.pop();
      }
    });
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
    alertNewNotificationState: {
      get() {
        const value =
          this.$store.getters["module_notifications/alertNewNotificationState"];
        return value;
      },
      set(value) {
        this.$store.commit(
          "module_notifications/set_alert_new_notifications_state",
          value
        );
      },
    },
    storedNotificationsCount() {
      if (!this.storedNotifications) return "";
      if (this.storedNotifications.length === 0) return "";
      return `(${this.storedNotifications.length})`;
    },
    hasNewNotification() {
      return (
        this.newNotification ||
        this.storedNotifications.length >
          this.notificationsCountLastOpenedDialog
      );
    },
    alertNewNotificationStateLabel() {
      return this.alertNewNotificationState
        ? this.$tc("variations.enabled.textCammelCased", 1)
        : this.$tc("variations.disabled.textCammelCased", 1);
    },
  },
  methods: {
    showDialog() {
      this.openDialog = true;
    },
    hideDialog() {
      this.openDialog = false;
    },
    initializeDetailsInfo() {
      this.detailInfo = {
        panel: [0],
        title: "",
        details: [],
        color: "",
      };
    },
    cleanNotification() {
      this.notification = {
        message: null,
        color: "primary",
        timeout: this.defaultNotificationTimeout,
        aditionalInfo: null,
        details: [],
        position: {
          absolute: true,
          right: true,
          top: true,
          left: false,
          bottom: false,
          centered: false,
        },
      };
    },
    clearDetails() {},
    showDetails(detail) {
      const self = this;
      this.initializeDetailsInfo();
      this.detailInfo.title = `${detail.type} - ${detail.message}`;
      this.detailInfo.color = detail.color;

      detail.details.forEach((detail) => {
        self.detailInfo.details.push(detail);
      });
      this.showDetail = true;
    },
    clearNotifications() {
      this.storedNotifications = [];
      this.notificationsCountLastOpenedDialog = 0;
    },
    clearNotification(index) {
      this.storedNotifications.splice(index, 1);
      this.notificationsCountLastOpenedDialog = this.storedNotifications.length;
    },
    showNotifications() {
      this.newNotification = false;
      this.showNotificationsDialog = true;
      this.notificationsCountLastOpenedDialog = this.storedNotifications.length;
    },
  },
  mounted() {
    this.isMounted = true;
  },
};
</script>
