<template>
  <div class="app-input-frame">
    <toolTipLabel
      v-if="label"
      :
      label="label"
      :label-class="labelClass"
      :inline-style="labelStyle"
    />
    <v-row :class="inputClass" :style="input - style">
      <v-menu
        v-model="isMenuVisible"
        :disabled="isDisabled"
        :close-on-content-click="false"
        offset-y
        :attach="attach"
        max-width="290px"
        min-width="290px"
      >
        <template #activator="{ on }">
          <v-col>
            <v-text-field
              v-model="shownDate"
              placeholder="YYY/MM/DD"
              :rules="localRules"
              :error-messages="errorMessages"
              :disabled="isDisabled"
              :class="{
                'lock-class': isDisabled,
                'inputDate_textField--color-changed': hasChanged
              }"
              class="inputDate_textfield"
              :data-label="$attrs['data-label'] || ($attrs['data-label'] === '' ? '' : label)"
              dense
              outlined
              hide-details="auto"
              v-on="on"
              @change="updateDatePickerModel($event)"
              @blur="checkTimeOnBlur($event, shownDate)"
            />
          </v-col>
        </template>
        <v-date-picker
          v-model="datePickerModel"
          :header-date-format="formatHeaderToRocDate"
          :year-format="formatHeaderToRocYear"
          no-title
          @change="checkFormatOnBlur($event)"
        />
      </v-menu>
      <v-col col="12" sm="3" md="3">
        <v-text-field
          v-model="shownHours"
          placeholder="hh"
          :error-messages="errorHour"
          :disabled="isDisabled"
          :class="{
            'lock-class': isDisabled,
            'inputDate__hours--color-changed': hasChanged
          }"
          class="inputDate_hours"
          hide-details="auto"
          dense
          @change="updateLocalValue($event)"
        />
      </v-col>
      <span class="align-self-center">:</span>
      <v-col col="12" sm="3" md="3">
        <v-text-field
          v-model="shownMinutes"
          placeholder="mm"
          :disabled="isDisabled"
          :error-messages="errorMinute"
          :class="{
            'lock-class': isDisabled,
            'inputDate_minutes--color-changed': hasChanged
          }"
          class="inputDate minutes"
          hide-details="auto"
          outlined
          dense
          @change="updateLocalValue($event)"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import toolTipLabel from '@/components/tooltip/tooltipLabel' // import uiStateMixin from "@mixins/UIstateMixin";
import { disabledMixin, changeColorMixin } from '../.inputMixin.js'
import inputDateMixin from './.inputDateMixin.js'

export default {
  components: { toolTipLabel },

  mixins: [disabledMixin, changeColorMixin, inputDateMixin],
  inheritAttrs: false,

  props: {
    label: {
      type: String,
      default: ''
    },

    value: {
      type: [String, Number],
      default: ''
    },

    // disabled: {
    //   type: Boolean,
    //   default: false
    // },

    // required: {
    //   type: Boolean,
    //   default: false
    // },

    // maxLength: {
    //   type: [Boolean, Number],
    //   default: 16
    // },

    rules: {
      type: Array,
      default() {
        return []
      }
    },

    // label設定參數
    labelClass: {
      type: [String, Array],
      default: ''
    },

    labelStyle: {
      type: String,
      default: ''
    },

    inputClass: {
      type: String,
      default: ''
    },

    // inputStyle: {
    //   type: String,
    //   default: ''
    // },

    attach: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      shownDate: '',
      shownHours: '',
      shownMinutes: '',
      shownSeconds: '',
      errorHour: '',
      errorMinute: ''
    }
  },

  computed: {
    localValue: {
      get() {
        return this.value
      },

      set(newValue) {
        this.$emit('input', newValue)
      },

      localRules() {
        let rules = [...this.rules]
        return rules
      }
    }
  },

  watch: {
    localValue: {
      handler(newValue) {
        /**
         * 假定是拿到 2020-01-01 格式
         */

        const rocDate = this.formatIsoToRocDate(newValue)
        this.shownDate = rocDate.date
        this.shownHours = rocDate.hours
        this.shownMinutes = rocDate.minutes
        this.shownSeconds = rocDate.seconds
      },

      immediate: true
    },

    datePickerModel(newDate) {
      /**
       * 若沒有時分秒給定預設值
       */

      if (!this.shownHours) {
        this.shownHours = '00'
      }
      if (!this.shownMinutes) {
        this.shownMinutes = '00'
      }

      if (!this.shownSeconds) {
        this.shownSeconds = '00'
      }

      const newDateTimeString = `"${newDate} ${this.shownHours}:${this.shownMinutes}:${this.shownSeconds}`
      this.localValue = newDateTimeString
      this.isMenuVisible = false
    }
  },

  methods: {
    checkTimeOnBlur(event, shownDate) {
      if (!shownDate) {
        this.shownHours = ''
        this.shownMinutes = ''
        this.shownSeconds = ''
      }
      this.checkFormatOnBlur(shownDate)
    },

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
::v-deep .inputDate__textField {
  input {
    text-align: center;
  }
}

.inputDate_textField--color-changed {
  input {
    color: red;
  }
}
.inputDate_hours--color-changed {
  input {
    color: red;
  }
}
.inputDate_minutes--color-changed {
  input {
    color: red;
  }
}
.lock-class {
  background-color: #e5e5e5;
  cursor: no-drop !important;
}
.multiline {
  white-space: pre-line;
}
</style>
