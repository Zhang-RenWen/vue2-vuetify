<template>
  <v-sheet>
    <div class="d-flex align-center py-1">
      <span class="mr-1">
        總筆數：
        <strong>{{ totalCount }}</strong>
        筆
      </span>
      <v-pagination v-model="page" :length="totalPageCount" :total-visible="value.totalVisible" />
      <v-spacer />
      <div class="v-data-footer__select">
        每頁列數：
        <v-select v-model="selectedItem" :items="itemsPerPageSelect" dense outlined hide-details />
        <span>筆</span>
      </div>
    </div>
  </v-sheet>
</template>

<script>
export default {
  name: 'TablePagination',
  components: {},
  props: {
    totalCount: {
      type: Number,
      default: 30
    },

    // 給外部 V-model 的 Options
    value: {
      type: Object,
      default() {
        return {
          page: 1,
          itemPerPage: 10,
          totalVisible: 10
        }
      }
    },

    itemsPerPageSelect: {
      type: Array,
      default: () => [10, 20, 30, 40]
    }
  },

  data() {
    return {}
  },

  created() {
    this.selectedItem = 10
  },

  computed: {
    selectedItem: {
      get() {
        return this.value.itemsPerPage
      },

      set(value) {
        this.$set(this.value, 'itemsPerPage', value)
        this.$set(this.value, 'page', 1)
      }
    },

    page: {
      get() {
        return this.value.page
      },

      set(value) {
        console.log({ ...this.value, page: value })
        this.$emit('input', { ...this.value, page: value })
      }
    },

    totalPageCount() {
      return Math.ceil(this.totalCount / this.selectedItem) || 0
    }
  },

  mounted() {},
  methods: {}
}
</script>
