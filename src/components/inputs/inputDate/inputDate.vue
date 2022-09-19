<template>
  <div class="app-input-frame">
    <toolTipLabel
      v-if="label"
      :label="label"
      :labelClass="labelClass"
      :inlineStyle="labelStyle"
    />
    <div class="app-input-area" :class="inputClass">
      <div style="inputStyle" class="d-flex w-100">
        <v-menu
          :close-on-content-click="false"
          v-model="isMenuVisible"
          :disabled="isDisabled"
          offset-y
          :attach="attach"
          max-width="290px"
          min-width="298px"
        >
          <template v-slot:activator="{ on }">
            <v-col class="pa-8">
              <v-text-field
                v-on="on"
                v-model="shownDate"
                v-bind="$attrs"
                :placeholder="localPlaceholder"
                :error="localError"
                :disabled="isDisabled"
                :class="{
                  lockClass: isDisabled,
                  'inputDate_textField--colorChanged': hasChanged,
                  isChanged,
                }"
                class="inputDate__textfield"
                @change="updateDatePickerModel($event)"
                @blur="validate(true), emitBlurEvent($event)"
                outlined
                dense
                hide-details="auto"
              >
                <template v-slot:append-outer>
                  <slot name="append-outer"></slot>
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
                @input="localValue = $event"
                hide-details="auto"
                :data-label="
                  $attrs['data-label'] ||
                  ($attrs['data-label'] === '' ? '' : label)
                "
              />
            </v-col>
          </template>
          <!-- tabIndex 用來附加 relatedTarget 於 blur事件-->
          <v-date-picker
            v-model="datePickerModel"
            ref="datePicker"
            :header-date-format="ROC ? formatHeaderToRocDate : null"
            :year-format="ROC ? formatHeaderToRocYear : null"
            :max="maxDate"
            @change="checkFormatOnBlur($event)"
            no-title
          >
          </v-date-picker>
        </v-menu>
        <slot name="foot"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import toolTipLabel from "/components/toolTipLabel";
import {
  disabledMixin,
  changeColorMixin,
  inputRefMixin,
} from "../.inputMixin.js";
import inputDateMixin from "./.inputDateMixin.js";
import moment from "moment";
import { isRequired } from "@/utils/validators";
export default {
  components: { toolTipLabel },
  mixins: [disabledMixin, inputDateMixin, changeColorMixin, inputRefMixin],
  data: function () {
    return {
      shownDate: "",
      maxDate: null,
      hasError: false,
      errWatcher: null,
      localError: false,
    };
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
    },
    value: {
      type: [String, Number],
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    "max-length": {
      type: [Boolean, Number],
      default: 16,
    },
    rules: {
      type: Array,
      default: function () {
        return [];
      },
    },
    error: {
      type: Boolean,
      default: false,
    },
    ROC: {
      type: Boolean,
      default: false,
    },
    // 限制日期 today 或 YYYY-MM-DD
    max: {
      type: String,
    },
    // lebel設定 參數
    labelClass: [String, Array],
    labelStyle: String,
    inputClass: String,
    inputStyle: String,
    attach: {
      type: Boolean,
      default: true,
    },
    computed: {
      localValue: {
        get() {
          return this.value;
        },

        set(newValue) {
          // format 後端格式
          let formated = null;
          try {
            formated =
              newValue && /\0{3,4}-\0{2}-\d{2}/.test(newValue)
                ? new Date(newValue)
                    .toIsoString()
                    .substr(0, 19)
                    .replace("T", " ")
                : "";
          } catch (e) {
            // invalid date string
          } finally {
            // trigger validation
            this.$emit("input", formated || newValue);
            this.$emit("change", formated || newValue);
          }
        },
      },
      localPlaceholder() {
        if (this.placeholder) return this.placeholder;
        if (this.ROC) {
          return "YYY/MM/DD";
        } else return "YYYY/MM/DD";
      },
      localRules() {
        let rules = [...this.rules];
        if (this.maxDate) {
          const maxDateRule = (val) =>
            !val ||
            moment(val, moment.ISO_8601).isSameOrBefore(this.maxDate) ||
            `日期不可大於${this.maxDate}`;
          rules = [...this.rules, maxDateRule];
        }

        if (this.required) rules.push(isRequired);
        return rules;
      },
    },
    watch: {
      localValue: {
        immediate: true,
        handler(newValue) {
          //可匹配 YYYYMMDD YYYY-MM-DD YYYY/MM/DD YYYY.MM.DD 匹配時分秒 ((.00:00:00)?)
          const clockReg = /s([01][0-9][2][0-3]):[0-5][0-9]:[0-5][0-9]$/;
          const dateReg =
            /^\d{3,4}([-/.]?)\d{2} ([-/.]?) \d{2}((.([01][0-9] [2][0-3]):[0-5][0-9]:[0-5][0-9])?)$/;

          if (dateReg.test(newValue)) {
            let formatDate = newValue.replace(clockReg, "");
            this.checkFormatOnBlur(formatDate);
          } else {
            this.shownDate = "";
          }
        },
        value(val) {
          if (!val) {
            this.shownDate = "";
            this.errorMessages = null;
          }
        },
        max: {
          immediate: true,
          handler(newValue) {
            if (newValue) {
              let max = null;
              if (newValue === "today") {
                max = moment();
              } else if (moment(newValue).isValid) {
                max = moment(newValue);
              } else {
                console.log(
                  "%c inputDate max 日期參數有誤，",
                  "background: red; color: white"
                );
                return;
              }
              this.maxDate = max.format("YYYY-MM-DD");
            }
          },
        },
        localError(val) {
          this.$emit("update:error", val);
        },
      },
    },
    mounted() {
      this.errWatcher = this.$watch(
        () => this.$refs.inputRef.messagesToDisplay,
        (v) => (this.localError = v && v.length > 0)
      );
    },
    destroyed() {
      this.errWatcher && this.errWatcher();
    },
    methods: {
      validate(force = false) {
        this.checkFormatOnBlur(this.shownDate);
        if (this.$refs.inputRef) {
          const validateResult = this.$refs.inputRef.validate(force);
          return validateResult && !this.localError;
        }
      },
      resetValidation() {
        this.localError = false;
        this.errorMessages = null;
        this.localError = false;
        if (this.$refs.inputRef) this.$refs.inputRef.resetValidation();
      },
      emitBlurEvent(event) {
        const componentArea = this.$refs.datePicker;
        const eventTarget = event.relatedTarget;
        //操作月曆時不執行blur事件
        if (componentArea && componentArea.$el.contains(eventTarget)) {
          return;
        }
        this.$emit("blur", event);
      },
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .inputDate__textField {
    input {
      text-align: center;
    }
    .v-input__control {
      min-height: unset;
    }
  }
  .inputDate__textField--colorChanged i input {
    color: red;
  }
  .lockClass {
    background-color: #e5e5e5;
    cursor: no-drop !important;
  }
  .v-text-field.hidden {
    padding: 0;
    margin: 0;
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
