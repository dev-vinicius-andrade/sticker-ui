<template>
  <div id="notification">
    <v-btn
      @click="showNotifications()"
      v-if="showDefaultNotificationButton"
      dark
      icon
    >
      <v-badge
        v-if="hasNewNotification"
        bordered
        bottom
        color="yellow darken-3"
        dot
        offset-x="-25"
        offset-y="-10"
      />
      <v-icon>{{ notificationIcon }}</v-icon>
    </v-btn>

    <v-dialog v-model="showNotificationsDialog" :max-width="dialogMaxWidth">
      <v-card :max-height="dialogMaxHeight" :class="dialogCardClass">
        <v-toolbar :color="dialogToolbarColor" elevation="0">
          <v-app-bar-nav-icon
            ><v-icon>{{ notificationIcon }}</v-icon></v-app-bar-nav-icon
          >
          <v-spacer></v-spacer>
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
        </v-toolbar>
        <v-list three-line>
          <template>
            <v-subheader>
              {{
                $tc(
                  "variations.notification.countCammelCased",
                  storedNotificationsCount
                )
              }}
              <v-spacer /><v-switch
                v-model="alertNewNotificationState"
                flat
                :label="alertNewNotificationStateLabel"
              />
            </v-subheader>
          </template>

          <v-list-item
            v-for="(item, index) in storedNotifications"
            :key="index"
          >
            <v-list-item-avatar
              :color="item.color"
              class="white--text"
              v-text="item.avatar"
            />
            <v-list-item-content>
              <v-list-item-title v-text="item.type"></v-list-item-title>
              <v-list-item-subtitle>
                <text-value
                  :text-key="item?.locale?.key"
                  :count="item?.locale?.count"
                  :single="item?.locale?.single"
                  :text="item.message"
                  :args="item?.locale?.args"
              /></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    @click="clearNotification(index)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>
                      {{ deleteNotificationIcon }}
                    </v-icon>
                  </v-btn>
                </template>
                <span>{{
                  $t("texts.clearNotifications.textCammelCased")
                }}</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    @click="showDetails(item)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>
                      {{ showDetailsIcon }}
                    </v-icon>
                  </v-btn>
                </template>
                <span>{{ $t("texts.showDetails.textCammelCased") }}</span>
              </v-tooltip>
            </v-list-item-action>
          </v-list-item>
          <v-divider />
        </v-list>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="showDetail"
      v-if="showDetail"
      :max-width="detailDialogMaxWidth"
    >
      <v-card max-width="100%">
        <v-toolbar :color="detailInfo.color" dark>
          <v-app-bar-title>{{ detailInfo.title }}</v-app-bar-title>
        </v-toolbar>
        <v-expansion-panels v-model="detailInfo.panel" multiple>
          <v-expansion-panel ex>
            <v-expansion-panel-header>
              <text-value
                :text-key="
                  detailInfo.panel.length == 0
                    ? 'texts.expandDetails.textCammelCased'
                    : 'texts.shrinkDetails.textCammelCased'
                "
              />
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <p v-for="(detail, index) in detailInfo.details" :key="index">
                <text-value
                  :text-key="detail?.locale?.key"
                  :count="detail?.locale?.count"
                  :single="detail?.locale?.single"
                  :text="detail.content"
                  :args="detail?.locale?.args"
                />
              </p>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-dialog>

    <v-snackbar
      :timeout="notification.timeout"
      v-model="show"
      :color="notification.color"
      value="true"
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
import TextValue from "@components/textValue/TextValue.vue";
export default {
  components: {
    TextValue,
  },
  props: {
    dialogToolbarColor: {
      type: String,
      default: "white",
    },
    showDefaultNotificationButton: {
      type: Boolean,
      default: true,
    },
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
    showDetailsIcon: {
      type: String,
      default: "mdi-chevron-down",
    },
    dialogMaxWidth: {
      type: String,
      default: "50vw",
    },
    detailDialogMaxWidth: {
      type: String,
      default: "40vw",
    },
    dialogMaxHeight: {
      type: String,
      default: "50vh",
    },
    dialogCardClass: {
      type: String,
      default: "ma-auto pa-1",
    },
    defaultNotificationTimeout: {
      type: Number,
      default: 1250,
    },
  },

  data() {
    return {
      keepNotifications: 10,
      show: false,
      notification: {
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
  created() {
    const self = this;
    this.initializeDetailsInfo();
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "module_notifications/notifications_show_message") {
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
  },
  methods: {
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
};
</script>
