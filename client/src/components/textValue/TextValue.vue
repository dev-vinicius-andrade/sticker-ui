<template>
  <span>
    <template v-if="textKey">
      <template v-if="count">
        {{ $tc(textKey, count, args) }}
      </template>
      <template v-else>
        {{ $tc(textKey, single ? 1 : 2, args) }}
      </template>
    </template>
    <template v-else>
      {{ text }}
    </template>
  </span>
</template>
<script>
export default {
  name: "TextValue",
  components: {},
  props: {
    args: {
      type: Object,
      default: undefined,
    },
    textKey: {
      type: String,
      default: undefined,
    },
    count: {
      type: Number,
      default: undefined,
    },
    single: {
      type: Boolean,
      default: true,
    },
    parameters: {
      type: Array,
      default: undefined,
    },
    text: {
      type: String,
      default: "Text",
    },
  },
};
</script>
