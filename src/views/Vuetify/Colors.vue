<template>
  <v-card>
    <v-card-title><h1>Colors</h1></v-card-title>

    <v-row>
      <v-col v-for="(v, key) of $vuetify.theme.themes.light" :key="`main${key}`" class="" cols="2">
        <v-sheet :color="v" width="100%" height="100">{{ key }}:{{ v }}</v-sheet>
        <v-card
          dense
          tile
          v-for="n of [5, 4, 3, 2, 1]"
          :key="`lighten-${n}`"
          :color="`${key} lighten-${n}`"
        >
          <v-card-text>
            <strong class="black--text">{{ key }} {{ `lighten-${n}` }}</strong>
          </v-card-text>
        </v-card>
        <v-card dense tile v-for="n of 4" :key="`darken-${n}`" :color="`${key} darken-${n}`">
          <v-card-text>
            <strong class="white--text">{{ key }} {{ `darken-${n}` }}</strong>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  mounted() {}
}
</script>
