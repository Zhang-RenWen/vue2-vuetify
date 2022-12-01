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
          <v-col>
            <InputAutoComplete
              v-model="costType"
              refs="costType"
              name="類別"
              label="類別"
              placeholder="placeholder"
              :items="options"
              :item-text-key="itemTextKey"
              :required="required"
              :disabled="disabledCondition.includes('costType')"
              :readonly="false"
              :has-default="hasDefault"
              :rules="[]"
              old-value="A"
              @change="change"
            />
          </v-col>
          <v-col>value:{{ costType }}</v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mb-10">
      <v-card-title>
        <h2>
          TextInput
          <span id="" />
        </h2>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col>
            <v-checkbox v-model="textInput_disabled" label="textInput_disabled" dense />
            <v-checkbox v-model="textInput_readonly" label="textInput_readonly" dense />
            <v-checkbox
              v-model="textInput_isCapital"
              :disabled="textInput_disabled"
              :readonly="textInput_readonly"
              label="textInput_isCapital"
              dense
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <TextInput
              v-model="textInput"
              :disabled="textInput_disabled"
              :readonly="textInput_readonly"
              :is-capital="textInput_isCapital"
            />
          </v-col>
          <v-col>value:{{ textInput }}</v-col>
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
      themes: {},
      costType: '',
      disabledCondition: [],
      options: [
        { label: 'option1-label', text: 'option1-text', value: 'A' },
        { label: 'option1-labe2', text: 'option2-text', value: 'B' }
      ],

      itemTextKey: 'label',
      required: true,
      hasDefault: false,
      textInput: '',
      textInput_disabled: false,
      textInput_readonly: false,
      textInput_isCapital: false
    }
  },

  computed: {},

  async mounted() {
    this.themes = this.$vuetify.theme.themes
  },

  beforeDestroy() {},

  methods: {
    change(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped></style>
