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
            <v-row>
              <v-col>
                <v-checkbox v-model="textInput_disabled" label="disabled" dense />
              </v-col>
              <v-col>
                <v-checkbox v-model="textInput_readonly" label="readonly" dense />
              </v-col>
              <v-col>
                <v-checkbox
                  v-model="textInput_uppercase"
                  :disabled="textInput_disabled"
                  :readonly="textInput_readonly"
                  label="uppercase"
                  dense
                />
              </v-col>
              <v-col>
                <v-checkbox v-model="textInput_required" label="required" dense />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider class="my-2" />
        <v-row>
          <v-col>
            {{ checkFunctions }}
            <v-row>
              <v-col>
                <v-checkbox
                  v-model="checkFunctions"
                  label="checkIsChinese"
                  value="checkIsChinese"
                  dense
                />
              </v-col>
              <v-col>
                <v-checkbox
                  v-model="checkFunctions"
                  label="checkIsEnglish"
                  value="checkIsEnglish"
                  dense
                />
              </v-col>
              <v-col>
                <v-checkbox
                  v-model="checkFunctions"
                  label="checkIsNumber"
                  value="checkIsNumber"
                  dense
                />
              </v-col>
              <v-col>
                <v-checkbox
                  v-model="checkFunctions"
                  label="checkIsSymbol"
                  value="checkIsSymbol"
                  dense
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider class="my-2" />
        <v-row>
          <v-col>
            <v-row>
              <v-col>
                <TextInput v-model="textInput_maxlength" label="maxlength" />
              </v-col>
              <v-col>
                <TextInput v-model="textInput_minlength" label="minlength" />
              </v-col>
              <v-col>
                <TextInput v-model="textInput_errorMessages" label="error messages" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider class="my-6" />
        <v-row>
          <v-col>
            <TextInput
              v-model="textInput"
              label="result"
              :disabled="textInput_disabled"
              :readonly="textInput_readonly"
              :uppercase="textInput_uppercase"
              :required="textInput_required"
              :max-length="textInput_maxlength"
              :min-length="textInput_minlength"
              :error-messages="textInput_errorMessages"
              :check-functions="checkFunctions"
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
      textInput_uppercase: false,
      textInput_maxlength: null,
      textInput_minlength: null,
      textInput_errorMessages: '',
      textInput_required: false,
      checkFunctions: []
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
