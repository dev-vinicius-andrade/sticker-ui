<template>
  <div :class="{ shake: data }">
    <slot name="content" :shake="shake" />
  </div>
</template>
<script>
import BaseWatch from "@abstractions/baseWatch.js";
import BaseData from "@abstractions/baseData.js";
import BaseMethods from "@abstractions/baseMethods.js";
import BaseProperties from "@abstractions/baseProperties.js";
export default {
  name: "",
  components: {},
  props: {
    ...BaseProperties,
    timeout: {
      type: Number,
      default: 1000,
    },
    delayTimeout: {
      type: Number,
      default: undefined,
    },
  },
  data: () => {
    return {
      ...BaseData,
      delayed: false,
    };
  },
  created() {
    this.baseInitializer();
    this.isCreated = true;
  },
  watch: {
    ...BaseWatch,
  },
  computed: {},
  methods: {
    ...BaseMethods,
    shake() {
      const self = this;
      if (self.delayed) return;
      this.data = true;
      setTimeout(() => {
        self.data = false;
      }, self.timeout);
      self.delayShake();
    },
    delayShake() {
      if (this.delayTimeout === undefined) return;
      const self = this;
      self.delayed = true;
      setTimeout(() => {
        self.delayed = false;
      }, self.delayTimeout);
    },
  },
  mounted() {
    this.isMounted = true;
  },
};
</script>
<style scoped>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
