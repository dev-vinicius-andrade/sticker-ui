<template>
  <div id="$0"></div>
</template>
<script>
export default {
  name: "$0",
  components: {},
  props: {},
  data: () => {
    return {
      isCreated: false,
      isMounted: false,
      changed: false,
    };
  },
  async created() {
    this.isCreated = true;
  },
  watch: {},
  computed: {},
  methods: {},
  async mounted() {
    this.isMounted = true;
  },
};
</script>
