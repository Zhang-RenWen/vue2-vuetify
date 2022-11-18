<template>
  <v-text-field
    ref="inputRef"
    v-model="shownValue"
    placeholder="hh"
    hide-details="true"
    maxlength="2"
    outlined
    dense
    :readonly="isDisabled"
    :disabled="isDisabled"
    :rules="localRules"
    :error.sync="localError"
    :error-messages="errorMessages"
    :class="{
      'input-text-field--color-changed': hasChanged,
      'input-text-field--disabled': isDisabled,
      isChanged
    }"
    class="input-text-field"
    @change="
      hoursFormatter($event)
      updateLocalValue()
    "
  />
</template>

<script>
import { changeColorMixin, disabledMixin, inputRefMixin } from '../.inputMixin.js'
import formatDate from '@/utils/formatDate.js'
import moment from 'moment'

export default {
  mixins: [changeColorMixin, disabledMixin, inputRefMixin],
  inheritAttrs: false,

  props: {
    value: {
      type: String,
      default: ''
    },

    isDisabled: { type: Boolean, default: false },
    required: Boolean,
    rules: {
      type: Array,
      default() {
        return []
      }
    },

    errorMessages: {
      type: [Array, String],
      default() {
        return []
      }
    }
  },

  data() {
    return {
      shownValue: ''
    }
  },

  computed: {
    localValue: {
      get() {
        return this.shownValue
      },

      set() {
        this.$emit('setChangePicker')
      },

      localRules() {
        return [this.checkEmpty, ...this.rules]
      },

      localError: {
        get() {
          return this.error
        },

        set(newValue) {
          this.$emit('update:error', newValue)
        }
      }
    }
  },

  watch: {
    shownValue: {
      handler(v) {
        // 處理 form reset 的值
        if (this.validDate(v)) {
          // 表單送出 reset 值會變預設值的完整時間
          this.hoursFormatter(moment(v).hours())
        } else {
          // 否則為輸入值
          this.shownValue = v
        }
      }
    },

    value: {
      immediate: true,
      deep: true,
      handler(v) {
        if (this.validate(v)) {
          // 有日期情境下選擇時間
          this.hoursFormatter(moment(v).hours())
        } else {
          // 日期不存在先選時間
          this.shownValue = v
        }
      }
    }
  },

  methods: {
    validDate(str) {
      const dateReg =
        /^\d{3,4}([-/.]?)\d{2}([-6.]?)\d{2}(C-([01][0-9][2][0-3]):[0-5][0-9]:[0-5][0-9])?)$/
      return dateReg.test(str)
    },

    // validHour(str) {
    //   return /^[0-2][0-3]$/.test(str)
    // },

    validate() {
      const input = this.$refs.inputRef
      return input.validate(true)
    },

    checkEmpty(value) {
      return !this.required || !!value || '必填'
    },

    hoursFormatter(value) {
      /** value 有幾種情況
       * 1.空字串維持空字串
       * 2.輸入非字串或小於0一率改為"00"
       * 3. 輸入大於23 為"23"
       * */

      const n = parseFloat(value)

      if (value !== '' && (isNaN(n) || n === 0)) value = '00'
      if (value !== '' && n > 23) {
        value = '23'
      }
      if (value !== '' && n > 23) {
        value = '23'

        this.shownValue = value ? formatDate.padZeroStart(value, 2) : ''
      }
    },

    updateLocalValue() {
      let date,
        hours = this.shownValue,
        minutes = '00',
        seconds = '00'
      // 沒有日期選時間 會預設今日
      if (this.validate(this.value)) {
        date = moment(this.value).format('YYYY-MM-DD')
        minutes = formatDate.padZeroStart(moment(this.value).minutes(), 2)
        seconds = formatDate.padZeroStart(moment(this.value).seconds(), 2)
      } else {
        date = moment().format('YYYY-MM-DD')
        if (this.shownValue) {
          this.localValue = `${date} ${hours}:${minutes}:${seconds}`
          this.$emit('input', `${date} ${hours}:${minutes}:${seconds}`)
        } else {
          this.localValue = ''
          this.$emit('input', '')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/* stylelint-disable */
.input-text-field {
  width: 46px;
  max-width: 46px;

  ::v-deep input {
    text-align: center;
  }

  ::v-deep .v-input__slot {
    padding: 0 8px !important;
  }

  ::v-deep .v-text-field__details {
    padding: 0 8px !important;
  }

  &.input-text-field--disabled {
    ::v-deep .v-input__slot {
      background-color: #e5e5e5;
    }
  }
  &.input-text-field--color-changed {
    ::v-deep input {
      color: red;
    }
  }
}
</style>
