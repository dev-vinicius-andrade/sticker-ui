<template>
  <v-dialog
    v-model="data"
    content-class="elevation-0"
    :fullscreen="fullscreen"
    :width="fullscreen ? undefined : '50vw'"
    :height="fullscreen ? undefined : '50vh'"
    justify="center"
  >
    <template v-if="button" v-slot:activator="{ on, attrs }">
      <slot name="button" :on="on" :attrs="attrs">
        <v-tooltip :disabled="!tooltipEnabled" left allow-overflow>
          <template v-slot:activator="{ on }">
            <v-btn
              @click.prevent
              @click.stop="show()"
              :icon="buttonTypeIcon"
              :small="buttonSmall"
              :x-small="buttonXSmall"
              :large="buttonLarge"
              :x-large="buttonXLarge"
              :fab="buttonTypeIcon"
              :color="buttonColor"
              v-bind="attrs"
              v-on="on"
            >
              <slot name="button-inner">
                <slot name="button-inner-append" />
                <template v-if="buttonTypeIcon">
                  <v-icon>{{ buttonIcon }}</v-icon>
                </template>
                <template v-if="!buttonTypeIcon">
                  <v-icon
                    :color="buttonIconColor"
                    v-if="buttonPrependIcon && !buttonTypeIcon"
                    :left="buttonPrependIcon"
                    >{{ buttonIcon }}</v-icon
                  >
                  <text-value
                    v-if="!buttonTypeIcon"
                    :text-key="buttonTextKey"
                    :count="buttonTextCount"
                  />

                  <v-icon
                    :color="buttonIconColor"
                    v-if="buttonAppendIcon"
                    :right="buttonAppendIcon && !buttonTypeIcon"
                    >{{ buttonIcon }}</v-icon
                  >
                </template>
              </slot>
            </v-btn>
          </template>
          <text-value
            v-if="tooltipEnabled"
            :text-key="buttonTextKey"
            :count="buttonTextCount"
          />
        </v-tooltip>
      </slot>
    </template>
    <v-card :color="fullscreen ? undefined : 'transparent'">
      <v-toolbar flat :color="fullscreen ? undefined : 'transparent'">
        <v-spacer />

        <v-btn
          icon
          @click="closeDialog()"
          :color="fullscreen ? undefined : closeButtonColor"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <slot name="content" :close="closeDialog" :show="show" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import TextValue from "@components/textValue/TextValue.vue";
import GenericInitializer from "@mixins/genericInitializer";
import GenericProperty from "@mixins/genericProperty";
import GenericDataMixin from "@mixins/genericData";
import GenericEvents from "@mixins/genericEvents";
export default {
  name: "Dialog",
  mixins: [
    GenericInitializer,
    GenericProperty,
    GenericDataMixin,
    GenericEvents,
  ],
  components: { TextValue },
  props: {
    button: {
      type: Boolean,
      default: true,
    },
    buttonSmall: {
      type: Boolean,
      default: false,
    },
    buttonXSmall: {
      type: Boolean,
      default: false,
    },
    buttonLarge: {
      type: Boolean,
      default: false,
    },
    buttonXLarge: {
      type: Boolean,
      default: false,
    },
    buttonTextKey: {
      type: String,
      default: "texts.showDialog.textCammelCased",
    },
    buttonTextCount: {
      type: Number,
      default: undefined,
    },
    buttonTypeIcon: {
      type: Boolean,
      default: false,
    },
    buttonIcon: {
      type: String,
      default: undefined,
    },
    buttonPrependIcon: {
      type: Boolean,
      default: false,
    },
    buttonAppendIcon: {
      type: Boolean,
      default: false,
    },
    buttonIconColor: {
      type: String,
      default: undefined,
    },
    buttonColor: {
      type: String,
      default: undefined,
    },
    closeButtonColor: {
      type: String,
      default: "white",
    },
    tooltipEnabled: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: "50vw",
    },
  },
  data: () => {
    return {
      data: undefined,
    };
  },
  async created() {
    const self = this;
    this.baseInitializer(false);
    this.isCreated = true;
  },
  watch: {
    data: {
      handler(newValue, oldValue) {
        this.emitInput();
      },
      deep: true,
      immediate: true,
    },
    value: {
      handler() {
        this.data = this.value;
        console.log("alterou");
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    fullscreen: (self) =>
      self.$vuetify.breakpoint.xs || self.$vuetify.breakpoint.sm,
  },
  methods: {
    //...BaseMethods,
    show() {
      this.data = true;
      this.emit("visible");
    },
    closeDialog() {
      this.data = false;
      this.emitCloseEvents();
    },
    emitCloseEvents() {
      this.$emit("closed");
    },
  },
  async mounted() {
    this.emitMounted();
    this.isMounted = true;
  },
};
</script>
