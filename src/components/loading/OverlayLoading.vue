<template>
  <v-overlay v-if="overlayLoading" style="z-index: 12">
    <v-progress-circular active indeterminate color="primary">
      <div class="loading-text">
        <template v-if="typeof overlayLoading === 'string'">
          {{ overlayLoading }}
        </template>
        <template v-else>系統處理中...請稍候</template>
      </div>
    </v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
  },

  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.loading-text {
  margin-top: 7rem;
  padding: 0.5rem 1rem;
  min-width: 300px;
  font-size: 1.4rem;
  font-weight: bold;
  border-radius: 6px;
  text-align: center;
  background-color: #fff;
  line-height: 2.4rem;
  letter-spacing: 2px;
}
</style>
