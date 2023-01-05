<template>
  <v-menu
    v-model="isMenuVisible"
    :disabled="disabled"
    :close-on-content-click="false"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template #activator="{ on }">
      <v-text-field
        ref="inputRef"
        v-model.trim="localValue"
        :placeholder="placeholder"
        :rules="localRules"
        :readonly="readonly"
        :disabled="disabled"
        class="inputTextField"
        :class="{
          'input-textField--colorChanged': hasChanged && !disableSetColor,
          'input-textField--disabled': disabled
        }"
        :label="label"
        :counter="[0, '0', '', undefined, null].includes(maxLength) ? false : true"
        :maxlength="[0, '0', undefined, null].includes(maxLength) ? null : maxLength"
        :minlength="[0, '0', '', undefined, null].includes(minLength) ? null : minLength"
        :error-messages="errorMessages"
        solo
        outlined
        flat
        hide-details="auto"
        vue
        dense
        validate-on-blur
        v-bind="$attrs"
        v-on="on"
        @focus="onFocus"
        @blur="
          () => {
            validate()
            formatValue()
          }
        "
        @reset="reset"
      />
    </template>
    <v-date-picker v-model="localValue" no-title />
  </v-menu>
</template>

<script>
import { valueChangedSetColor, inputRefEvent, formatters, rulesSetting } from './inputMixin.js'

export default {
  mixins: [valueChangedSetColor, inputRefEvent, formatters, rulesSetting],
  inheritAttrs: false,

  props: {
    name: {
      type: String,
      default: ''
    },

    label: {
      type: String,
      default: ''
    },

    labelClass: { type: String, default: '' },

    labelStyle: { type: String, default: '' },

    placeholder: {
      type: String,
      default: 'YYY/MM/DD'
    },

    disabled: {
      type: Boolean,
      default: false
    },

    readonly: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isMenuVisible: false
    }
  },

  computed: {
    localRules() {
      const rules = this.rules
      const newRules = []
      const allCheckMethods = Object.keys(rulesSetting.methods)
      if (this.disabled) {
        return newRules
      }
      if (this.required) {
        newRules.unshift(this.checkEmpty)
      }

      rules.forEach((rule) => {
        if (allCheckMethods.includes(rule)) {
          // name
          newRules.unshift(this[rule])
        } else {
          newRules.unshift(rule)
        }
      })

      return newRules
    }
  },

  methods: {
    checkTimeOnBlur(event, shownDate) {
      if (!shownDate) {
        this.shownHours = ''
        this.shownMinutes = ''
        this.shownSeconds = ''
      }
      // this.checkFormatOnBlur(shownDate)
    },

    formatHeaderToRocDate() {},
    datePickerModel() {},
    formatHeaderToRocYear() {},
    formatIsoToRocDate(isoString) {
      if (!isoString) {
        return {
          date: ``,
          hours: '',
          minutes: '',
          seconds: ''
        }
      }
      const dateInstance = new Date(isoString)
      let year = dateInstance.getFullYear() - 1911
      let month = dateInstance.getMonth() + 1
      let day = dateInstance.getDate()
      let hours = dateInstance.getHours()
      let minutes = dateInstance.getMinutes()
      let seconds = dateInstance.getSeconds()
      // padStart
      year = this.padZeroStart(year, 3)
      month = this.padZeroStart(month, 2)
      day = this.padZeroStart(day, 2)
      hours = this.padZeroStart(hours, 2)
      minutes = this.padZeroStart(minutes, 2)
      seconds = this.padZeroStart(seconds, 2)
      const rocDate = {
        date: `${year}/${month}/${day}`,
        hours,
        minutes,
        seconds
      }
      return rocDate
    },

    updateLocalValue() {
      const date = this.shownDate
      const dateParts = date.split('/')
      let year = Number(dateParts[0]) + 1911
      let month = dateParts[1]
      let day = dateParts[2]
      let hours = Number(this.shownHours)
      let minutes = Number(this.shownMinutes)
      let seconds = Number(this.shownSeconds)
      const isValidHours = 0 <= hours && hours < 24
      const isValidMinutes = 0 <= minutes && minutes < 60
      this.errorHour = ''
      this.errorMinute = ''
      if (!isValidHours) {
        this.errorHour = '此時有誤請修正'
      }
      if (!isValidMinutes) {
        this.errorMinute = '此分有誤請修正'
      }
      if (!isValidHours || !isValidMinutes) {
        return
      }

      year = this.padZeroStart(year, 3)
      month = this.padZeroStart(month, 2)
      day = this.padZeroStart(day, 2)
      hours = this.padZeroStart(hours, 2)
      minutes = this.padZeroStart(minutes, 2)
      seconds = this.padZeroStart(seconds, 2)
      const isoString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      this.localValue = isoString
    }
  }
}
</script>

<style lang="scss" scoped>
/* stylelint-disable */

::v-deep .input-textField--colorChanged input,
::v-deep .input-textField--colorChanged textarea {
  color: red;
}

::v-deep .input-textField--disabled input,
::v-deep .input-textField--disabled textarea {
  color: rgb(155, 155, 155);
}

::v-deep .input-textField--disabled {
  .v-input__slot {
  }

  input {
  }
}
</style>
