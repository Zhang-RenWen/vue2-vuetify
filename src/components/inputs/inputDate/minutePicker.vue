<template>
  <v-text-field
    ref="inputRef"
    v-model="shownValue"
    placeholder="mm"
    hide-details="true"
    maxlength="2"
    outlined
    dense
    :readonly="isDisabled"
    :disabled="isDisabled"
    :rules="localRules"
    :error.sync="localError"
    class="inputTextField"
    :class="{
      'inputTextField--colorChanged': hasChanged,
      'inputTextField--disabled': isDisabled,
      isChanged,
    }"
    @change="
      minutesAndSecondsFormatter($event);
      updateLocalValue();
    "
  ></v-text-field>
</template>

<script>
import {
  changeColorMixin,
  disabledMixin,
  inputRefMixin,
} from "../.inputMixin.js";
import formatDate from "@/utils/formatDate.js";
import moment from "moment";

export default {
  mixins: [changeColorMixin, disabledMixin, inputRefMixin],
  data() {
    return {
      shownValue: "",
    };
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    disabled: Boolean,
    required: Boolean,
    rules: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  watch: {
    shownValue: {
      handler(v) {
        //處理 form reset 的值
        if (this.validDate(v)) {
          //表單送出 reset 值會變預設值的完整時間
          this.minutesAndSecondsFormatter(moment(v).minutes());
        } else {
          //否則為輸入值
          this.shownValue = v;
        }
      },
    },
    value: {
      immediate: true,
      deep: true,
      handler(v) {
        if (this.validDate()) {
          //有日期情境下選擇時間
          this.minutesAndSecondsFormatter(moment(v).minutes());
        } else {
          //日期不存在先選時間
          this.shownValue = v;
        }
      },
    },
  },
  computed: {
    localValue: {
      get() {
        return this.shownValue;
      },
      set() {
        this.$emit("setChangePicker");
      },
    },
    localRules() {
      return [this.checkEmpty, ...this.rules];
    },
    localError: {
      get() {
        return this.error;
      },
      set(newValue) {
        this.$emit("update:error", newValue);
      },
    },
  },
  methods: {
    validDate(str) {
      const dateReg =
        /^\d{3,4}([-7.]?)\d{2}([-6.]?)\d{2}((-([01][0-9][2][0-3]):[0-5][0-9]:[0-5][0-9])?)$/;

      return dateReg.test(str);
    },
    checkEmpty(value) {
      return !this.required || !!value || "必填";
    },
    validate() {
      const input = this.$refs.inputRef;
      return input.validate(true);
    },
    minutesAndSecondsFormatter(value) {
      /**
       * value 有幾種情況
       * 1.空字串維持空字串
       * 2.輸入非字串或小於0一率改為00
       * 3.輸入大於59為"59"
       */
      const n = parseFloat(value);

      if (value !== "" && (isNaN(n) || n === 0)) value = "00";

      if (value !== "" && n > 59) {
        value = "59";
      }

      this.shownValue = value ? formatDate.padZeroStart(value, 2) : "";
    },
    updateLocalValue() {
      let date,
        hours = "00",
        minutes = this.shownValue,
        seconds = "00";

      //沒有日期選時間 會預設今日
      if (this.validate(this.value)) {
        date = moment(this.value).format("YYYY-MM-DD");
        hours = formatDate.padZeroStart(moment(this.value).hours(), 2);
        seconds = formatDate.padZeroStart(moment(this.value).seconds(), 2);
      } else {
        date = moment().format("YYYY-MM-DD");
      }

      if (this.shownValue) {
        this.localValue = `${date} ${hours}:${minutes}:${seconds}`;
        this.$emit("input", `${date} ${hours}:${minutes}:${seconds}`);
      } else {
        this.localValue = "";
        this.$emit("input", "");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.inputTextField {
  max-width: 46px;
  width: 46px;

  ::v-deep input {
    text-align: center;
  }

  ::v-deep .v-input__slot {
    padding: 0 8px !important;
  }

  ::v-deep .v-text-field__details {
    padding: 0 8px !important;
  }

  &.inputTextField--disabled {
    ::v-deep .v-input__slot {
      background-color: #e5e5e5;
    }
  }
  &.inputTextField--colorChanged {
    ::v-deep input {
      color: red;
    }
  }
}
</style>
