<template>
  <TablePagination v-model="options" :total-count="20" />
</template>

<script>
export default {
  name: 'Pagination',
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
