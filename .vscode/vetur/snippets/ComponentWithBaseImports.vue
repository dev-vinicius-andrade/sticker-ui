<template>
  <div id="$0"></div>
</template>
<script>
import GenericInitializer from "@mixins/genericInitializer";
import GenericProperty from "@mixins/genericProperty";
import GenericDataMixin from "@mixins/genericData";
import GenericEvents from "@mixins/genericEvents";
export default {
  name: "$0",
  components: {},
  mixins: [
    GenericInitializer,
    GenericProperty,
    GenericDataMixin,
    GenericEvents,
  ],
  props: {},
  data: () => {
    return {};
  },
  created() {
    this.baseInitializer();
    this.isCreated = true;
  },
  watch: {},
  computed: {},
  methods: {},
  mounted() {
    this.isMounted = true;
  },
};
</script>
