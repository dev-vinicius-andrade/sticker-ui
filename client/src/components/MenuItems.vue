<template>
  <!-- <v-container fluid>
    <v-row justify="center" align="center" no-gutters> -->
  <div>
    <v-btn
      :text="false"
      v-for="item in items"
      :plain="plain"
      :x-large="xLarge"
      :icon="icon"
      :key="item.id"
      :to="item.type === 'link' && item.to && !item.href ? item.to : undefined"
      :href="
        item.type === 'link' && !item.to && item.href ? item.href : undefined
      "
      :target="
        item.type === 'link' && !item.to && item.href ? item.target : undefined
      "
      @click.stop="item.type === 'button' ? item.function(item) : undefined"
      active-class="active-list-item"
    >
      <v-icon v-if="item.icon" :class="item.icon.class">{{
        item.icon.key
      }}</v-icon>
      <span :class="item.content.class" v-if="item?.content">
        <template v-if="item?.content?.title?.locale?.count">
          {{
            $tc(
              item.content.title.locale.key,
              item.content.title.locale.count,
              item.content.title.locale.parameters
            )
          }}
        </template>
        <template v-else>
          {{
            $t(
              item.content.title.locale.key,
              item.content.title.locale.parameters
            )
          }}
        </template>
      </span>
    </v-btn>
  </div>
  <!-- </v-row>
  </v-container> -->
</template>
<script>
export default {
  name: "MenuItems",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    plain: {
      type: Boolean,
      default: false,
    },
    xLarge: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped>
.active-list-item {
  background-color: Rgba(0, 0, 0, 0.1);
}
</style>
