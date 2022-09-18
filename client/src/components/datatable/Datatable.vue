<template>
  <v-card>
    <v-toolbar flat extended>
      <v-toolbar-title v-if="titleText || titleKey">
        <b v-if="titleText && !useLocales">
          {{ titleText }}
        </b>
        <b v-else-if="titleSingle">
          {{ $tc(titleKey, 1, titleParameters) }}
        </b>
        <b v-else-if="titleMultiple">
          {{ $tc(titleKey, 2, titleParameters) }}
        </b>
        <b v-else>
          {{ $t(titleKey, titleParameters) }}
        </b>
      </v-toolbar-title>
      <v-spacer />

      <v-btn
        v-if="buttonAdd"
        :color="buttonAddColor"
        :fab="buttonAddFab"
        :dark="buttonAddDark"
        :class="buttonAddClass"
        v-on:click.prevent
        @click.stop="emitButtonAddClickedEvent()"
      >
        <v-icon>{{ buttonAddIcon }}</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-title v-if="searchable">
      <v-text-field
        v-model="searchInputValue"
        :append-icon="searchIcon"
        :label="searchLabel"
        :single-line="searchSingleLine"
        :hide-details="searchHideDetails"
        :placeholder="searchPlaceholder || searchDefaultPlaceHolder"
      />
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="items || dataTableItemsResult"
      :items-per-page="itemsPerPage"
      :page.sync="page"
      :loading="isLoading"
      :search="searchInputValue"
      :loading-text="dataTableLoadingText || datatableDefaultTitleText"
      :class="dataTableClass"
      @page-count="pageCount = $event"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <slot name="actions" :item="item" />
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
export default {
  name: "Datatable",
  components: {},
  props: {
    searchIcon: {
      type: String,
      default: "mdi-magnify",
    },
    searchSingleLine: {
      type: Boolean,
      default: false,
    },
    searchHideDetails: {
      type: Boolean,
      default: false,
    },
    searchPlaceholder: {
      type: String,
      default: undefined,
    },
    searchLabel: {
      type: String,
      default: undefined,
    },
    buttonAdd: {
      type: Boolean,
      default: false,
    },
    buttonAddIcon: {
      type: String,
      default: "mdi-plus",
    },
    buttonAddDark: {
      type: Boolean,
      default: false,
    },
    buttonAddFab: {
      type: Boolean,
      default: true,
    },
    buttonAddColor: {
      type: String,
      default: "green",
    },
    buttonAddClass: {
      type: String,
      default: "mt-2",
    },
    titleText: {
      type: String,
      default: "Datatable",
    },
    dataTableLoadingText: {
      type: String,
      default: undefined,
    },
    dataTableClass: {
      type: String,
      default: "elevation-1",
    },
    titleKey: {
      type: String,
      default: undefined,
    },
    titleCount: {
      type: Number,
      default: undefined,
    },
    titleSingle: {
      type: Boolean,
      default: false,
    },
    titleMultiple: {
      type: Boolean,
      default: false,
    },
    titleParameters: {
      type: Object,
      default: undefined,
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    useLocales: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => undefined,
    },
    headers: {
      type: Array,
      default: () => [],
    },
    dataTableItemsLoader: {
      type: Function,
      default: undefined,
    },
    dataTableItemConverter: {
      type: Function,
      default: undefined,
    },
  },
  data() {
    return {
      page: 0,
      pageCount: 10,
      itemsPerPage: 10,
      queryLimitItems: 10,
      isLoading: false,
      searchInputValue: "",
      openCreateDialogModel: false,
      openEditDialogModel: false,
      activeOnlyFilter: true,
      notificationsEventNames: {
        itemAdded: "schemaAdded",
        itemUpdated: "schemaUpdated",
        itemDeactivated: "schemaDeactivated",
        itemReactivated: "schemaReactivated",
      },
      dataTableItemsResult: [],
      editingId: null,
    };
  },
  computed: {
    datatableDefaultTitleText() {
      return this.$t("templates.loadingDatatableData", {
        data: this.$t("variations.data.textCammelCased", 2),
      });
    },
    searchDefaultPlaceHolder() {
      return this.$tc("variations.search.textCammelCased", 1);
    },
  },
  async mounted() {
    const self = this;
    if (!this.items) await this.getDatatableItems();
    else this.dataTableItemsResult = this.items;
  },
  methods: {
    emitButtonAddClickedEvent() {
      this.$emit("buttonAddClicked");
    },
    async getDatatableItems() {
      const self = this;
      this.isLoading = true;

      try {
        if (
          this.dataTableItemsLoader &&
          typeof this.dataTableItemsLoader !== "function"
        )
          throw new Error("data-table-items-loader is not a function");

        const result = await this.dataTableItemsLoader(
          this.page,
          this.pageCount,
          this.searchInputValue
        );
        this.dataTableItemsResult = [];
        if (result.hasError) throw new Error(result.message, result);
        // this.$notifications.notifyError(`Error ${result.status}: ${result.data.message}`);
        result.data.forEach(async (data) => {
          if (
            self.dataTableItemConverter &&
            typeof self.dataTableItemConverter === "function"
          )
            self.dataTableItemsResult.push(
              await self.dataTableItemConverter(data)
            );
          else self.dataTableItemsResult.push(data);
        });
      } catch (err) {
        this.dataTableItemsResult = [];
        this.$notifications.notifyError(
          "Error while returning data-table-items.",
          err
        );
      }
      this.isLoading = false;
    },
    addItemToDataTableItemsResult(item) {
      const model = {
        id: item.id,
        active: item.active,
        activeDescription: item.active ? "Active" : "Disabled",
        name: item.name,
        description: item.description,
        commitBy: item.commit.by.username,
        commitMessage: item.commit.message,
        createdDate: item.createdDate,
        updatedDate: item.updatedDate,
      };
      this.dataTableItemsResult.push(model);
    },
    openCreateDialog() {
      this.openCreateDialogModel = true;
    },
    closeCreateDialog() {
      this.openCreateDialogModel = false;
    },
    openEditDialog(id) {
      if (!id) {
        this.closeEditDialog();
        return;
      }
      this.editingId = id;
      this.openEditDialogModel = true;
    },
    closeEditDialog() {
      this.openEditDialogModel = false;
      this.editingId = null;
    },
  },
  watch: {
    activeOnlyFilter() {
      this.getDatatableItems();
    },
  },
};
</script>
