<template>
  <v-card class="pa-2">
    <h2>Loading</h2>
    <v-sheet outlined class="pa-4">
      <v-card-text>
        <h2 class="mb-5">LinearLoading</h2>
        <LinearLoading />
      </v-card-text>
      <v-card-text>
        <h2 class="mb-5">CircularLoading</h2>
        <CircularLoading />
      </v-card-text>
      <v-card-text>
        <h2 class="mb-5">OverlayLoading</h2>
        <TextInput name="自定義訊息" class="mb-5" @input="setOverlayLoading" />
        <OverlayLoading style="position: relative; min-height: 500px" />
      </v-card-text>
    </v-sheet>
  </v-card>
</template>

<script>
export default {
  props: {},
  data() {
    return {}
  },

  computed: {},
  mounted() {
    this.toggleLoading(true)
    this.closeGlobalLoading()
  },

  destroyed() {
    this.openGlobalLoading()
    this.toggleLoading(false)
  },

  methods: {
    async closeGlobalLoading() {
      await this.$nextTick(() => {})
      document
        .getElementById('overlayLoading')
        .setAttribute('style', 'position: relative; min-height: 500px')
    },

    openGlobalLoading() {
      document.getElementById('overlayLoading').setAttribute('style', null)
    },

    setOverlayLoading(text) {
      if (!text) {
        this.toggleLoading('系統處理中...請稍候')
      } else {
        this.toggleLoading(text)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
