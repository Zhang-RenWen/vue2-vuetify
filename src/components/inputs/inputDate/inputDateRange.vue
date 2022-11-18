<template>
  <div class="app-input-frame">
    <tooltipLabel
      v-if="label"
      :label="label"
      :label-class="labelClass"
      :inline-style="labelStyle"
    />
    <div class="app-input-area flex-no-wrap" :class="inputClass" ::style="inputStyle">
      <calendarPicker
        ref="startDatePicker"
        v-model="startDate"
        :data-label="$attrs['data-label'] || ($attrs['data-label'] === '' ? '' : label)"
        v-bind="{ ...startDateProps }"
        @update:error="$emit('update:error', $event)"
        @input="setDateRange($event, 'startDatepicker')"
      />
      <div v-if="time" class="time-display-area">
        <hourPicker
          ref="startHourPicker"
          :value="startDate"
          v-bind="{ ...startHourProps }"
          @update:error="$emit('update:error', $event)"
          @input="setDateRange($event, 'startHourPicker')"
        />
        <div class="time-symbol">:</div>
        <minutePicker
          ref="startMinutePicker"
          v-model="startDate"
          v-bind="{ ...startMinuteProps }"
          @update:error="$emit('update:error', $event)"
          @input="setDateRange($event, 'startMinutePicker')"
        />
      </div>
      <div class="date-range-symbol">-</div>
      <calendarPicker
        ref="endDatePicker"
        v-model="endDate"
        v-bind="{ ...endDateProps }"
        :data-label="$attrs['data-label'] || ($attrs['data-label'] === '' ? '' : label)"
        @update:error="$emit('update:error', $event)"
        @input="setDateRange($event, 'endDatePicker')"
      />
      <div v-if="time" class="time-display-area">
        <hourPicker
          ref="endHourPicker"
          :value="startDate"
          v-bind="{ ...startHourProps }"
          @update:error="$emit('update:error', $event)"
          @input="setDateRange($event, 'startHourPicker')"
        />
        <div class="time-symbol">:</div>
        <minutePicker
          ref="startMinutePicker"
          v-model="startDate"
          v-bind="{ ...startMinuteProps }"
          @update:error="$emit('update:error', $event)"
          @input="setDateRange($event, 'startMinutePicker')"
        />
      </div>
      <div class="date-range-symbol">-</div>
    </div>
  </div>
</template>

<script>
import tooltipLabel from '@/components/tooltip/tooltipLabel'
import calendarPicker from './calendar Picker.vue'
import hourPicker from './hour Picker.vue'
import minutePicker from './minutePicker.vue'
import moment from 'moment'

export default {
  components: {
    tooltipLabel,
    calendarPicker,
    hourPicker,
    minutePicker
  },

  inheritAttrs: false,

  props: {
    value: {
      type: Object,
      default() {
        return {
          startDate: '',
          endDate: ''
        }
      }
    },

    label: {
      type: String,
      default: ''
    },

    startDateRules: {
      type: Array,
      default() {
        return []
      }
    },

    endDateRules: {
      type: Array,
      default() {
        return []
      }
    },

    startDatePlaceholder: {
      type: String,
      default: ''
    },

    endDatePlaceholder: {
      type: String,
      default: ''
    },

    time: {
      type: Boolean,
      default: false
    },

    required: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },

    attach: {
      type: Boolean,
      default: true
    },

    // ROC: {
    //   type: Boolean,
    //   default: false
    // },

    hasRules: {
      type: Boolean,
      default: true
    },

    hasEdge: {
      type: Boolean,
      default: true
    },

    labelClass: {
      type: String,
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

    inputStyle: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      startDate: '', // YYYY-MM-DD HH:mm:ss
      endDate: ''
    }
  },

  computed: {
    startDateProps() {
      const defaultRule = this.hasRules ? [this.startDateEdge] : []
      return {
        placeholder: this.startDatePlaceholder,
        rules: [...this.startDateRules, ...defaultRule],
        ROC: this.ROC,
        max: this.max,
        min: '1912-01-01 00:00:00', // 民國元年
        disabled: this.disabled,
        required: this.required,
        attach: this.attach
      }
    },

    startHourProps() {
      const defaultRule = this.hasRules ? [this.startDateEdge] : []
      return {
        disabled: this.disabled,
        required: this.required,
        rules: [...this.startDateRules, ...defaultRule]
      }
    },

    startMinuteProps() {
      const defaultRule = this.hasRules ? [this.startDateEdge] : []
      return {
        disabled: this.disabled,
        required: this.required,
        rules: [...this.startDateRules, ...defaultRule]
      }
    },

    endDateProps() {
      const defaultRule = this.hasRules ? [this.endDateEdge] : []
      return {
        placeholder: this.endDatePlaceholder,
        rules: [...this.endDateRules, ...defaultRule],
        ROC: this.ROC,
        max: '2910-12-31 23:59:59', // 民國999年
        min: this.min,
        disabled: this.disabled,
        required: this.required,
        attach: this.attach
      }
    },

    // endHourProps() {
    //   const defaultRule = this.hasRules ? [this.endDateEdge] : []
    //   return {
    //     disabled: this.disabled,
    //     required: this.required,
    //     rules: [...this.endDateRules, ...defaultRule]
    //   }
    // },

    // endMinuteProps() {
    //   const defaultRule = this.hasRules ? [this.endDateEdge] : []
    //   return {
    //     disabled: this.disabled,
    //     required: this.required,
    //     rules: [...this.endDateRules, ...defaultRule]
    //   }
    // },

    max() {
      if (this.validate(this.value.endDate) && this.hasEdge) {
        return this.value.endDate
      }

      return null
    },

    min() {
      if (this.validDate(this.value.startDate) && this.hasEdge) {
        return this.value.startDate
      }

      return null
    }
  },

  watch: {
    $listeners: {
      deep: true,
      handler() {}
    },

    value: {
      deep: true,
      // immediate: true,
      handler() {
        // 重置validate
        this.$nextTick(() => {
          this.$refs.startDatePicker.validate()
          this.$refs.endDatePicker.validate()

          if (this.time === true) {
            this.$refs.startHourPicker.validate()
            this.$refs.startMinutePicker.validate()
            this.$refs.endHourPicker.validate()
            this.$refs.endMinutePicker.validate()
          }
        })
      }
    },

    'value.startDate': {
      immediate: true,
      handler(value) {
        this.startDate = value
      }
    },

    'value.endDate': {
      immediate: true,
      handler(value) {
        this.endDate = value
      }
    }
  },

  methods: {
    validate(str) {
      /**
       * 驗證格式是否為 YYY-MM-DD HH:mm:ss
       */
      const dateReg =
        /^\d{3,4}([-/.]?)\d{2}([-/.]?)\d{2}((-([01][0-9][2][0-3]):[0-5][0-9]:[0-5][0-9])?)$/

      return dateReg.test(str)
    },

    startDateEdge() {
      /**
       * 計算最大起始日
       */
      if (moment(this.value.startDate).isValid() && moment(this.value.endDate).isValid()) {
        return moment(this.value.startDate).isSameOrBefore(this.value.endDate) || `日期不可大於迄日`
      }

      return true
    },

    endDateEdge() {
      /**
       * 計算最小結束日
       */
      if (moment(this.value.startDate).isValid() && moment(this.value.endDate).isValid) {
        return moment(this.value.endDate).isSameOrAfter(this.value.startDate) || `日期不可小於起日`
      }

      return true
    },

    // reset() {
    //   this.$refs.startDatePicker.reset()
    //   this.$refs.endDatePicker.reset()
    // },

    // resetValidation() {
    //   this.$refs.startDatePicker.resetValidation()
    //   this.$refs.endDatePicker.resetValidation()
    // },

    startDateTimeCombine(changePicker) {
      let value = {
        startDate: this.startDate,
        endDate: this.endDate
      }

      // 需要判斷變更日期或時間:啟動時間修改,需要分別辨認並組組合時間字串
      if (this.time) {
        // 有時間修改需要判斷日期是否已存在

        // 起始日期變更
        if (changePicker === 'startDatePicker') {
          // 日期格式錯誤,代入今日日期
          const date = moment(value.startDate).isValid()
            ? moment(value.startDate).format('YYYY-MM-DD')
            : ''

          // 沒有時間格式,代入"00:00:00"
          const time = moment(this.value.startDate).isValid()
            ? moment(this.value.startDate).format('HH:mm:ss')
            : '00:00:00'

          value.startDate = `${date} ${time}`
          return value
        }

        return value
      }

      return value
    },

    endDateTimeCombine(changePicker) {
      let value = {
        startDate: this.startDate,
        endDate: this.endDate
      }

      // 需要判斷變更日期或時間:啟動時間修改,需要分別猝認並組合時間字串
      if (this.time) {
        // 有時間修改需要判斷日期是否已存在

        // 結束日期變更
        if (changePicker === 'endDatePicker') {
          // 日期格式錯誤,代入今日日期
          const date = moment(value.endDate).isValid()
            ? moment(value.endDate).format('YYYY-MM-DD')
            : ''

          // 沒有時間格式,代入"00:00:00"
          const time = moment(this.value.endDate).isValid()
            ? moment(this.value.endDate).format('HH:mm:ss')
            : '00:00:00'

          value.endDate = `${date} ${time}`

          return value
        }

        return value
      }

      return value
    },

    setDateRange($event, changePicker = '') {
      if (/^start.*$/.test(changePicker)) {
        this.startDate = $event
        this.$emit('input', this.startDateTimeCombine(changePicker))
      }

      if (/^end.*$/.test(changePicker)) {
        this.endDate = $event
        this.$emit('input', this.endDateTimeCombine(changePicker))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-setting {
  flex-wrap: wrap;
  justify-content: flex-start;
}

.date-range-symbol {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1px;
  cursor: default;
  height: 32px;
}

.time-display-area {
  display: flex;
  flex-direction: row;
  padding: 0 0 0 2px !important;
}

.time-symbol {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1px;
  cursor: default;
  height: 32px;
}
</style>
