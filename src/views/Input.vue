<template>
  <v-container>
    <v-card class="mb-10">
      <v-card-title>
        <h2>
          InputAutoComplete
          <span id="" />
        </h2>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col />
          <InputAutoComplete />
          <v-col />
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mb-10">
      <v-card-title>
        <h2>
          InputAutoComplete
          <span id="" />
        </h2>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col />
          <InputAutoComplete />
          <v-col />
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      themes: {}
    }
  },

  computed: {},

  async mounted() {
    this.themes = this.$vuetify.theme.themes
  },

  beforeDestroy() {},

  methods: {}
}
</script>

<style lang="scss" scoped></style>
