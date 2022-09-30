<template>
  <div class="container">
    <v-btn
      class="relative"
      block
      color="primary"
      :ripple="false"
      @click="diretionTo($event, 'aaaa')"
    >
      aa
      <Icon class="absolute" :w="16" :h="16" name="carbon_flow-connection" />
    </v-btn>
  </div>
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
  methods: {
    diretionTo(e) {
      e.stopPropagation()
      e.preventDefault()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 25px 0;
  width: 500px;
  height: 500px;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
  top: -20px;
  left: 0;
}
</style>
