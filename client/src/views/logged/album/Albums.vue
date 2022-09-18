<template>
  <!-- <div id="Albums"> -->
  <v-row>
    <v-row v-if="$store.getters['module_authentication/isAdmin']" no-gutters>
      <v-spacer />
      <v-col cols="1">
        <Dialog
          buttonTypeIcon
          button-icon="mdi-plus"
          button-text-key="buttons.add"
        >
          <template v-slot:content>
            <v-card>
              <v-card-title>{{
                $t("texts.createAlbum.textCammelCased")
              }}</v-card-title>
              <v-card-text>
                <v-btn
                  @click.stop="$notifications.notifyInfo({ content: 'teste' })"
                  >test</v-btn
                >
              </v-card-text>
            </v-card>
          </template>
        </Dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10">
        <v-row justify="start" align="start">
          <v-col v-for="(album, index) in albums" :key="album.id" cols="3">
            <v-card>
              <!-- <v-img :src="album.cover" height="200px"></v-img> -->
              <v-card-title>{{ index }}. {{ album.name }}</v-card-title>
              <v-card-subtitle>{{ album.description }}</v-card-subtitle>
              <v-card-actions>
                <v-btn color="primary" @click="openAlbum(album.id)">Open</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-row>
  <!-- </div> -->
</template>
<script>
// import Datatable from "@components/datatable";
import Dialog from "@components/dialog/Dialog.vue";
import GenericInitializer from "@mixins/genericInitializer";
import GenericProperty from "@mixins/genericProperty";
import GenericDataMixin from "@mixins/genericData";
import GenericEvents from "@mixins/genericEvents";
export default {
  name: "Albums",
  components: {
    Dialog,
  },
  mixins: [
    GenericInitializer,
    GenericProperty,
    GenericDataMixin,
    GenericEvents,
  ],
  props: {},
  data: () => {
    return {
      albums: [
        {
          id: 1,
          name: "Album 1",
          description: "Album 1 description",
          cover: "https://picsum.photos/200/300",
        },
        {
          id: 2,
          name: "Album 2",
          description: "Album 2 description",
          cover: "https://picsum.photos/200/300",
        },
        {
          id: 3,
          name: "Album 3",
          description: "Album 3 description",
          cover: "https://picsum.photos/200/300",
        },
        {
          id: 4,
          name: "Album 4",
          description: "Album 4 description",
          cover: "https://picsum.photos/200/300",
        },
        {
          id: 5,
          name: "Album 5",
          description: "Album 5 description",
          cover: "https://picsum.photos/200/300",
        },
        {
          id: 6,
          name: "Album 6",
          description: "Album 6 description",
          cover: "https://picsum.photos/200/300",
        },
        {
          id: 7,
          name: "Album 7",
          description: "Album 7 description",
          cover: "https://picsum.photos/200/300",
        },
        {
          id: 8,
          name: "Album 8",
          description: "Album 8 description",
          cover: "https://picsum.photos/200/300",
        },
        {
          id: 9,
          name: "Album 9",
          description: "Album 9 description",
          cover: "https://picsum.photos/200/300",
        },
        {
          id: 10,
          name: "Album 10",
          description: "Album 10 description",
          cover: "https://picsum.photos/200/300",
        },
        {
          id: 11,
          name: "Album 11",
          description: "Album 11 description",
          cover: "https://picsum.photos/200/300",
        },
        {
          id: 12,
          name: "Album 12",
          description: "Album 12 description",
          cover: "https://picsum.photos/200/300",
        },
      ],
    };
  },
  async created() {
    this.baseInitializer();
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
