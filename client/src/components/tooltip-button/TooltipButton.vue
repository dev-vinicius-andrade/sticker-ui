<template>
  <v-tooltip
    :z-index="toolTipZIndex"
    :content-class="tooltipClass"
    allow-overflow
    :color="backgroundColor"
    :nudge-right="tooltipNudgeRight"
    internal-activator
    left
  >
    <template v-slot:activator="{ on }">
      <v-btn
        :absolute="absolute"
        :top="top"
        :right="right"
        :left="left"
        :class="customClass"
        :color="backgroundColor"
        :dark="dark"
        :icon="icon"
        :fab="fab"
        v-on="on"
        @click.stop="btnClicked"
      >
        <slot name="tooltip-button-icon">
          <v-icon :md="iconMd" :class="iconClass" v-if="btnIcon">
            {{ btnIcon }}</v-icon
          >
        </slot>
      </v-btn>
    </template>
    <span>{{ tooltipText }}</span>
  </v-tooltip>
</template>
<script>
export default {
  props: {
    absolute: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: null,
    },
    top: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
    left: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    toolTipZIndex: {
      type: String,
      default: "2",
    },
    tooltipClass: {
      type: String,
      default: "pa-3 pr-4",
    },
    tooltipNudgeRight: {
      type: String,
      default: "20",
    },
    tooltipText: {
      type: String,
      default: "Tooltip Text",
    },
    iconMd: {
      type: Boolean,
      default: false,
    },
    iconClass: {
      type: String,
      default: null,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    fab: {
      type: Boolean,
      default: false,
    },
    btnIcon: {
      type: String,
      default: null,
    },
    backgroundColor: {
      type: String,
      default: null,
    },
    clicked: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      openToolTip: false,
    };
  },
  methods: {
    async btnClicked(e) {
      if (this.clicked) await this.clicked();
      this.$emit("click", e);
    },
  },
};
</script>
