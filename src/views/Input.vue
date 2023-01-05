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
              label="類別"
              placeholder="placeholder"
              :items="options"
              :item-text-key="itemTextKey"
              :required="required"
              :disabled="disabledCondition.includes('costType')"
              :readonly="false"
              :has-default="hasDefault"
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
          TextInput / TextArea
          <span id="" />
        </h2>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col>
            <InputAutoComplete
              v-model="textInput_selectedCheckMethods"
              :items="textInput_checkMethods"
              chips
              label="Rules"
              item-text="name"
              item-value="name"
              multiple
            >
              <template #selection="data">
                <v-chip
                  class="mt-2"
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  small
                  @click="data.select"
                  @click:close="removeValidation(data.item)"
                >
                  <!-- <v-avatar left>
                    <v-img :src="data.item.avatar" />
                  </v-avatar> -->
                  {{ data.item }}
                </v-chip>
              </template>
            </InputAutoComplete>
          </v-col>
          <v-col>
            <InputAutoComplete
              v-model="textInput_selectedFormatMethods"
              :items="textInput_formatMethods"
              chips
              label="Format"
              item-text="name"
              item-value="name"
              multiple
            >
              <template #selection="data">
                <v-chip
                  class="mt-2"
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  small
                  @click="data.select"
                  @click:close="removeFormat(data.item)"
                >
                  <!-- <v-avatar left>
                    <v-img :src="data.item.avatar" />
                  </v-avatar> -->
                  {{ data.item }}
                </v-chip>
              </template>
            </InputAutoComplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-row>
              <v-col cols="12" sm="3">
                <v-row>
                  <v-checkbox v-model="textInput_disabled" label="disabled" dense />
                </v-row>
                <v-row>
                  <v-checkbox v-model="textInput_readonly" label="readonly" dense />
                </v-row>
                <v-row>
                  <v-checkbox v-model="textInput_required" label="required" dense />
                </v-row>
                <v-row>
                  <v-checkbox v-model="textInput_progress" label="progress" dense />
                </v-row>
                <v-row>
                  <v-checkbox
                    v-model="textInput_input_disable_changed_color"
                    label="disable changed color"
                    dense
                  />
                </v-row>
                <v-row>
                  <v-checkbox v-model="textInput_input_clearable" label="clearable" dense />
                </v-row>
                <v-row>
                  <v-checkbox v-model="textInput_prepend_icon" label="prepend icon" dense />
                </v-row>
                <v-row>
                  <v-checkbox
                    v-model="textInput_prepend_inner_icon"
                    label="prepend inner_icon"
                    dense
                  />
                </v-row>
                <v-row>
                  <v-checkbox v-model="textInput_append_icon" label="append icon" dense />
                </v-row>
                <v-row>
                  <v-checkbox
                    v-model="textInput_append_outer_icon"
                    label="append outer_icon"
                    dense
                  />
                </v-row>
                <v-row>
                  <v-checkbox v-model="textInput_has_slot" label="has slot" dense />
                </v-row>
              </v-col>
              <v-col cols="12" sm="3">
                <v-row>
                  <TextInput v-model="textInput_placeholder" label="placeholder" />
                </v-row>
                <v-row>
                  <TextInput v-model="textInput_maxlength" label="maxlength" />
                </v-row>
                <v-row>
                  <TextInput v-model="textInput_minlength" label="minlength" />
                </v-row>
                <v-row>
                  <TextInput v-model="textInput_max" label="max" />
                </v-row>
                <v-row>
                  <TextInput v-model="textInput_min" label="min" />
                </v-row>
                <v-row>
                  <TextInput v-model="textInput_errorMessages" label="error messages" />
                </v-row>
                <v-row>
                  <TextInput v-model="textInput_input_type" label="input type" />
                </v-row>
                <v-row>
                  <TextInput v-model="textInput_prefix" label="prefix" />
                </v-row>
                <v-row>
                  <TextInput v-model="textInput_suffix" label="suffix" />
                </v-row>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="text-settings-result">
                  <h1>Settings Result</h1>
                  <v-switch
                    v-model="textOrTextArea"
                    class="mb-2"
                    label="(Y) textInput / (N) textArea"
                  />
                  <TextInput
                    v-if="textOrTextArea"
                    v-model="textInput"
                    :type="textInput_input_type"
                    name="TextInput Result:"
                    :placeholder="textInput_placeholder"
                    :disabled="textInput_disabled"
                    :readonly="textInput_readonly"
                    :required="textInput_required"
                    :max-length="textInput_maxlength"
                    :min-length="textInput_minlength"
                    :max="textInput_max"
                    :min="textInput_min"
                    :prefix="textInput_prefix"
                    :suffix="textInput_suffix"
                    :error-messages="textInput_errorMessages"
                    :rules="textInput_selectedCheckMethods"
                    :format="textInput_selectedFormatMethods"
                    :loading="textInput_progress"
                    :prepend-icon="textInput_prepend_icon ? textInput_input_icon : ''"
                    :prepend-inner-icon="textInput_prepend_inner_icon ? textInput_input_icon : ''"
                    :append-icon="textInput_append_icon ? textInput_input_icon : ''"
                    :append-outer-icon="textInput_append_outer_icon ? textInput_input_icon : ''"
                    :clear-icon="textInput_input_clear_icon"
                    :clearable="textInput_input_clearable"
                    :disable-set-color="textInput_input_disable_changed_color"
                    @click:append="clickIcon('append')"
                    @click:append-outer="clickIcon('append-outer')"
                    @click:prepend="clickIcon('prepend')"
                    @click:prepend-inner="clickIcon('prepend-inner')"
                    @click:clear="clickIcon('clear')"
                  >
                    <template #progress>
                      <v-progress-linear
                        v-if="textInput_progress"
                        :value="textInput_progress"
                        absolute
                        height="7"
                      />
                    </template>
                    <template v-if="textInput_has_slot" #prepend>
                      <v-tooltip bottom>
                        <template #activator="{ on }">
                          <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                        </template>
                        I'm a tooltip
                      </v-tooltip>
                    </template>
                    <template v-if="textInput_has_slot" #prepend-inner>
                      <v-tooltip bottom>
                        <template #activator="{ on }">
                          <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                        </template>
                        I'm a tooltip
                      </v-tooltip>
                    </template>
                    <template v-if="textInput_has_slot" #append>
                      <v-tooltip bottom>
                        <template #activator="{ on }">
                          <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                        </template>
                        I'm a tooltip
                      </v-tooltip>
                    </template>
                    <template v-if="textInput_has_slot" #append-outer>
                      <v-tooltip bottom>
                        <template #activator="{ on }">
                          <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                        </template>
                        I'm a tooltip
                      </v-tooltip>
                    </template>
                  </TextInput>
                  <TextAreaInput
                    v-else
                    v-model="textInput"
                    :type="textInput_input_type"
                    name="TextAreaInput Result:"
                    :placeholder="textInput_placeholder"
                    :disabled="textInput_disabled"
                    :readonly="textInput_readonly"
                    :required="textInput_required"
                    :max-length="textInput_maxlength"
                    :min-length="textInput_minlength"
                    :prefix="textInput_prefix"
                    :suffix="textInput_suffix"
                    :error-messages="textInput_errorMessages"
                    :rules="textInput_selectedCheckMethods"
                    :format="textInput_selectedFormatMethods"
                    :loading="textInput_progress"
                    :prepend-icon="textInput_prepend_icon ? textInput_input_icon : ''"
                    :prepend-inner-icon="textInput_prepend_inner_icon ? textInput_input_icon : ''"
                    :append-icon="textInput_append_icon ? textInput_input_icon : ''"
                    :append-outer-icon="textInput_append_outer_icon ? textInput_input_icon : ''"
                    :clear-icon="textInput_input_clear_icon"
                    :clearable="textInput_input_clearable"
                    :disable-set-color="textInput_input_disable_changed_color"
                    @click:append="clickIcon('append')"
                    @click:append-outer="clickIcon('append-outer')"
                    @click:prepend="clickIcon('prepend')"
                    @click:prepend-inner="clickIcon('prepend-inner')"
                    @click:clear="clickIcon('clear')"
                  >
                    <template #progress>
                      <v-progress-linear
                        v-if="textInput_progress"
                        :value="textInput_progress"
                        absolute
                        height="7"
                      />
                    </template>
                    <template v-if="textInput_has_slot" #prepend>
                      <v-tooltip bottom>
                        <template #activator="{ on }">
                          <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                        </template>
                        I'm a tooltip
                      </v-tooltip>
                    </template>
                    <template v-if="textInput_has_slot" #prepend-inner>
                      <v-tooltip bottom>
                        <template #activator="{ on }">
                          <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                        </template>
                        I'm a tooltip
                      </v-tooltip>
                    </template>
                    <template v-if="textInput_has_slot" #append>
                      <v-tooltip bottom>
                        <template #activator="{ on }">
                          <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                        </template>
                        I'm a tooltip
                      </v-tooltip>
                    </template>
                    <template v-if="textInput_has_slot" #append-outer>
                      <v-tooltip bottom>
                        <template #activator="{ on }">
                          <v-icon v-on="on">mdi-help-circle-outline</v-icon>
                        </template>
                        I'm a tooltip
                      </v-tooltip>
                    </template>
                  </TextAreaInput>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mb-10">
      <v-card-title>
        <h2>
          TextInput: Date
          <span id="" />
        </h2>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <InputDate v-model="date" />
          </v-col>
          <v-col>
            <TextInput placeholder="hh" />
          </v-col>
          <div class="d-flex align-center">:</div>
          <v-col>
            <TextInput placeholder="mm" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mb-10">
      <v-card-title>
        <h2>
          TextInput: DateRange
          <span id="" />
        </h2>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-row>
              <v-col>
                <InputDate v-model="date" />
              </v-col>
              <v-col>
                <TextInput placeholder="hh" />
              </v-col>
              <div class="d-flex align-center">:</div>
              <v-col>
                <TextInput placeholder="mm" />
              </v-col>
            </v-row>
          </v-col>
          <div class="d-flex align-center">-</div>
          <v-col>
            <v-row>
              <v-col>
                <InputDate v-model="date" />
              </v-col>
              <v-col>
                <TextInput placeholder="hh" />
              </v-col>
              <div class="d-flex align-center">:</div>
              <v-col>
                <TextInput placeholder="mm" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mb-10">
      <v-card-title>
        <h2>
          v-form
          <span id="" />
        </h2>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-divider class="my-6" />
        <v-form ref="form">
          <v-row>
            <v-col><TextInput label="required" required /></v-col>
            <v-col>
              <TextInput
                label="not required but with error message"
                error-messages="error message"
              />
            </v-col>
            <v-col><TextInput label="not required" /></v-col>
          </v-row>
        </v-form>
        <v-divider class="my-6" />
        <v-row>
          <v-col>
            <v-btn class="mr-2" @click="clickValidation">validation</v-btn>
            <v-btn @click="clickResetValidation">Reset Validation</v-btn>
          </v-col>
          <v-col>check result:{{ textInput_input_click_check_result }}</v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title>v-slider</v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <v-subheader>test</v-subheader>
          </v-col>
          <v-col cols="12" sm="6">
            <v-slider
              :rules="[]"
              color="orange"
              label="Age"
              hint="Be honest"
              min="1"
              max="100"
              thumb-label
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { formatters, rulesSetting } from '@/components/inputs/inputMixin.js'
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

      textOrTextArea: true,
      itemTextKey: 'label',
      required: true,
      hasDefault: false,
      textInput: '',
      textInput_placeholder: 'placeholder',
      textInput_disabled: false,
      textInput_readonly: false,
      textInput_maxlength: null,
      textInput_minlength: null,
      textInput_max: null,
      textInput_min: null,
      textInput_errorMessages: '',
      textInput_required: false,
      textInput_input_type: 'text', // text(default) /password /number /date /time
      textInput_prefix: '',
      textInput_suffix: '',
      textInput_progress: false,
      textInput_prepend_icon: false,
      textInput_prepend_inner_icon: false,
      textInput_append_icon: false,
      textInput_append_outer_icon: false,
      textInput_input_icon: 'mdi-map-marker',
      textInput_input_clearable: false,
      textInput_input_clear_icon: 'mdi-close-circle',
      textInput_has_slot: false,
      textInput_input_disable_changed_color: false,
      textInput_input_click_check_result: true,
      textInput_checkMethods: Object.keys(rulesSetting.methods),
      textInput_formatMethods: Object.keys(formatters.methods),
      textInput_selectedCheckMethods: [],
      textInput_selectedFormatMethods: [],
      date: ''
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
    },

    clickIcon(iconName) {
      console.log(`click ${iconName}`)
    },

    clickValidation() {
      const isValid = this.$refs.form.validate()
      this.textInput_input_click_check_result = isValid
    },

    clickResetValidation() {
      this.$refs.form.resetValidation()
      this.textInput_input_click_check_result = true
    },

    removeValidation(item) {
      const index = this.textInput_selectedCheckMethods.indexOf(item)
      if (index >= 0) this.textInput_selectedCheckMethods.splice(index, 1)
    },

    removeFormat(item) {
      const index = this.textInput_selectedFormatMethods.indexOf(item)
      if (index >= 0) this.textInput_selectedFormatMethods.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.text-settings-result {
  overflow: hidden;
  padding: 6px;
  height: 450px;
  border: 2px solid black;
  border-radius: 6px;
}
</style>
