<template>
  <VCustomPaginationCustom v-model="options" :total-count="20" />
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

  computed: {},

  created() {},

  mounted() {},
  methods: {}
}
</script>
