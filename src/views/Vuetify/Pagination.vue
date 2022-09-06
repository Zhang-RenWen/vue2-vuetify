<template>
  <VCustomPaginationCustom v-model="options" :totalCount="20" />
</template>

<script>
export default {
  name: 'TablePagination',
  components: {},
  props: {},

  data() {
    return {
      options: { totalVisible: 9 }
    }
  },

  created() {},

  computed: {},

  mounted() {},
  methods: {}
}
</script>
