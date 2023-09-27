<template>
  <v-card>
    <v-card-title>v-card</v-card-title>
    <v-divider />
    <v-card-text>
      <v-card-title>v-card-text</v-card-title>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {}
  },

  computed: {},
  mounted() {
    this.validate()
  },

  methods: {
    // directionTo(e) {
    //   e.stopPropagation()
    //   e.preventDefault()
    // }
    async validate() {
      return false
    }
  }
}
</script>

<style lang="scss" scoped></style>
