<template>
  <div class="app-input-frame">
    <toolTipLabel
      v-if="label"
      :label="label"
      :label-class="labelClass"
      :inline-style="labelStyle"
    />
    <div class="app-input-area" :class="inputClass">
      <div :style="inputStyle" class="d-flex w-100">
        <v-menu
          v-model="isMenuVisible"
          :close-on-content-click="false"
          :disabled="isDisabled"
          offset-y
          :attach="attach"
          max-width="290px"
          min-width="298px"
        >
          <template #activator="{ on }">
            <v-col class="pa-8">
              <v-text-field
                v-model="shownDate"
                v-bind="$attrs"
                :placeholder="localPlaceholder"
                :error="localError"
                :disabled="isDisabled"
                :class="{
                  'lock-class': isDisabled,
                  'inputDate_textField--color-changed': hasChanged,
                  isChanged
                }"
                class="inputDate__textfield"
                outlined
                dense
                hide-details="auto"
                v-on="on"
                @change="updateDatePickerModel($event)"
                @blur="validate(true), emitBlurEvent($event)"
              >
                <template #append-outer>
                  <slot name="append-outer" />
                </template>
              </v-text-field>
              <v-text-field
                ref="inputRef"
                class="hidden multiline"
                :value="value"
                :rules="localRules"
                :disabled="isDisabled"
                :error.sync="localError"
                :error-messages.sync="errorMessages"
                hide-details="auto"
                :data-label="$attrs['data-label'] || ($attrs['data-label'] === '' ? '' : label)"
                @input="localValue = $event"
              />
            </v-col>
          </template>
          <!-- tabIndex 用來附加 relatedTarget 於 blur事件-->
          <v-date-picker
            ref="datePicker"
            v-model="datePickerModel"
            :header-date-format="ROC ? formatHeaderToRocDate : null"
            :year-format="ROC ? formatHeaderToRocYear : null"
            :max="maxDate"
            no-title
            @change="checkFormatOnBlur($event)"
          />
        </v-menu>
        <slot name="foot" />
      </div>
    </div>
  </div>
</template>

<script>
import toolTipLabel from '/components/toolTipLabel'
import { disabledMixin, changeColorMixin, inputRefMixin } from '../.inputMixin.js'
import inputDateMixin from './.inputDateMixin.js'
import moment from 'moment'
import { isRequired } from '@/utils/validators'
export default {
  components: { toolTipLabel },
  mixins: [disabledMixin, inputDateMixin, changeColorMixin, inputRefMixin],

  props: {
    label: {
      type: String,
      default: ''
    },

    placeholder: {
      type: String,
      default: ''
    },

    value: {
      type: [String, Number],
      default: ''
    },

    required: {
      type: Boolean,
      default: false
    },

    maxLength: {
      type: [Boolean, Number],
      default: 16
    },

    rules: {
      type: Array,
      default() {
        return []
      }
    },

    error: {
      type: Boolean,
      default: false
    },

    ROC: {
      type: Boolean,
      default: false
    },

    // 限制日期 today 或 YYYY-MM-DD
    max: {
      type: String,
      default: ''
    },

    // label設定 參數
    labelClass: { type: [String, Array], default: '' },

    labelStyle: {
      type: String,
      default: ''
    },

    inputClass: {
      type: String,
      default: ''
    },

    inputStyle: {
      type: String,
      default: ''
    },

    attach: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      shownDate: '',
      maxDate: null,
      errWatcher: null,
      localError: false
    }
  },

  computed: {
    localValue: {
      get() {
        return this.value
      },

      set(newValue) {
        // format 後端格式
        let formated = null
        try {
          formated =
            newValue && /\0{3,4}-\0{2}-\d{2}/.test(newValue)
              ? new Date(newValue).toIsoString().substr(0, 19).replace('T', ' ')
              : ''
        } catch (e) {
          // invalid date string
        } finally {
          // trigger validation
          this.$emit('input', formated || newValue)
          this.$emit('change', formated || newValue)
        }
      }
    },

    localPlaceholder() {
      if (this.placeholder) return this.placeholder
      if (this.ROC) {
        return 'YYY/MM/DD'
      } else return 'YYYY/MM/DD'
    },

    localRules() {
      let rules = [...this.rules]
      if (this.maxDate) {
        const maxDateRule = (val) =>
          !val ||
          moment(val, moment.ISO_8601).isSameOrBefore(this.maxDate) ||
          `日期不可大於${this.maxDate}`
        rules = [...this.rules, maxDateRule]
      }

      if (this.required) rules.push(isRequired)
      return rules
    }
  },

  watch: {
    localValue: {
      immediate: true,
      handler(newValue) {
        // 可匹配 YYYYMMDD YYYY-MM-DD YYYY/MM/DD YYYY.MM.DD 匹配時分秒 ((.00:00:00)?)
        const clockReg = /s([01][0-9][2][0-3]):[0-5][0-9]:[0-5][0-9]$/
        const dateReg =
          /^\d{3,4}([-/.]?)\d{2} ([-/.]?) \d{2}((.([01][0-9] [2][0-3]):[0-5][0-9]:[0-5][0-9])?)$/

        if (dateReg.test(newValue)) {
          let formatDate = newValue.replace(clockReg, '')
          this.checkFormatOnBlur(formatDate)
        } else {
          this.shownDate = ''
        }
      },

      value(val) {
        if (!val) {
          this.shownDate = ''
          this.errorMessages = null
        }
      },

      max: {
        immediate: true,
        handler(newValue) {
          if (newValue) {
            let max = null
            if (newValue === 'today') {
              max = moment()
            } else if (moment(newValue).isValid) {
              max = moment(newValue)
            } else {
              console.log('%c inputDate max 日期參數有誤，', 'background: red; color: white')
              return
            }
            this.maxDate = max.format('YYYY-MM-DD')
          }
        }
      },

      localError(val) {
        this.$emit('update:error', val)
      }
    }
  },

  mounted() {
    this.errWatcher = this.$watch(
      () => this.$refs.inputRef.messagesToDisplay,
      (v) => (this.localError = v && v.length > 0)
    )
  },

  destroyed() {
    this.errWatcher && this.errWatcher()
  },

  methods: {
    validate(force = false) {
      this.checkFormatOnBlur(this.shownDate)
      if (this.$refs.inputRef) {
        const validateResult = this.$refs.inputRef.validate(force)
        return validateResult && !this.localError
      }
    },

    resetValidation() {
      this.localError = false
      this.errorMessages = null
      this.localError = false
      if (this.$refs.inputRef) this.$refs.inputRef.resetValidation()
    },

    emitBlurEvent(event) {
      const componentArea = this.$refs.datePicker
      const eventTarget = event.relatedTarget
      // 操作月曆時不執行blur事件
      if (componentArea && componentArea.$el.contains(eventTarget)) {
        return
      }
      this.$emit('blur', event)
    }
  }
}
</script>

<style lang="scss" scoped>
/* stylelint-disable */
::v-deep {
  .inputDate__textField {
    input {
      text-align: center;
    }
    .v-input__control {
      min-height: unset;
    }
  }
  .inputDate__textField--color-changed i input {
    color: red;
  }
  .lock-class {
    background-color: #e5e5e5;
    cursor: no-drop !important;
  }
  .v-text-field.hidden {
    margin: 0;
    padding: 0;
    .v-input__control {
      min-height: unset;
    }
    .v-input__slot {
      display: none;
    }
  }
}

.multiline {
  white-space: pre-line;
}
</style>
