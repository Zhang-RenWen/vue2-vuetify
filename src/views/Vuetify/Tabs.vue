<template>
  <v-sheet outlined>
    <v-tabs show-arrows v-model="tab">
      <v-tabs-slider />
      <v-tab v-for="item of list" :key="item">Tab {{ item }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item of list" :key="item">
        <v-card color="basil" flat>
          <v-card-text>{{ item }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-sheet>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      tab: null,
      list: ['0', '1']
    }
  },

  mounted() {},
  methods: {}
}
</script>
