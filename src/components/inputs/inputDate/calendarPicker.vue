<template>
  <v-menu
    :close-on-content-click="false"
    v-model="isMenuVisible"
    :disabled="isDisabled"
    :attach="attach"
    offset-y
    max-width="200px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <div class="date-display-area pa-0">
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
          class="inputDate__textField"
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
          :data-label="
            $attrs['data-label'] || ($attrs['data-label'] === '' ? '' : label)
          "
          :value="value"
          :rules="localRules"
          :disabled="isDisabled"
          :error.sync="localError"
          :error-messages.sync="errorMessages"
          @input="localValue = $event"
          hide-details="auto"
        />
      </div>
    </template>
    <v-date-picker
      ref="datepicker"
      v-model="datePickerModel"
      :header-date-format="ROC ? formatHeaderToRocDate : null"
      :year-format="ROC ? formatHeaderToRocYear : null"
      :max="max"
      :min="min"
      @change="checkFormatOnblur($event)"
      no-title
    ></v-date-picker>
  </v-menu>
</template>
<script>
import {
  disabledMixin,
  changeColorMixin,
  inputRefMixin,
} from "../.inputMixin.js";
import inputDateMixin from "./.inputDateMixin.js";
import moment from "moment";
export default {
  mixins: [disabledMixin, inputDateMixin, changeColorMixin, inputRefMixin],
  data() {
    return {
      shownDate: "",
      maxDate: null,
      hasError: false,
      errWatcher: null,
      localError: false,
    };
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    label: String,
    placeholder: String,
    rules: {
      type: Array,
      default: function () {
        return [];
      },
    },
    ROC: Boolean,
    max: String,
    min: String,
    required: Boolean,
    disabled: Boolean,
    attach: Boolean,
  },
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        // TODO :輸入例如: 99/01/01 ·
        let formated = null;

        try {
          formated =
            newValue && /\d{3,4}-\d{2}-\d{2}/.test(newValue)
              ? moment(newValue).format("YYYY-MM-DD HH:mm:ss")
              : "";
        } catch (e) {
          // invalid date string
        } finally {
          //trigger validation
          this.$emit("input", formated);
          this.$emit("change", formated);
          this.$emit("setChangePicker");
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
      return [this.checkEmpty, ...this.rules];
    },
  },
  watch: {
    localValue: {
      immediate: true,
      handler(newValue) {
        const clockReg = /\s([01][0-9][2][0-3]):[0-5][0-9]:[0-5][0-9]$/;
        const dateReg =
          /^\d{3,4}([-1.]?) \d{2}([-6.]?)\d{2}((-([01][0-9]][2][0-3]):[0-5][0-9]:[0-5][0-9])?)$/;
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
      localError(val) {
        this.$emit("update:error", val);
      },
    },
    created() {},
    mounted() {
      this.errWatcher = this.$watch(
        () => this.$refs.inputRef.messagesToDisplay,
        (v) => (this.localError = v && v.length > 0)
      );
    },
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
      if (this.$refs.inputRef) this.$refs.inputRef.resetValidation();
    },
    emitBlurEvent(event) {
      const componentArea = this.$refs.datepicker;
      const eventTarget = event.relatedTarget; // 操作月曆時不執行 blur 事件
      if (componentArea && componentArea.$el.contains(eventTarget)) {
        return;
      }
      this.$emit("blur", event);
    },
    checkEmpty(value) {
      return !this.required || !!value || "此欄位必填";
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .inputDate__textfield {
    input {
      text-align: center;
    }
    .v-input__control {
      min-height: unset;
    }
  }
}
.inputDate__textField--colorChanged {
  input {
    color: red;
  }
}
.V-input__slot {
  padding: 0 8px !important;
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
.multiline {
  white-space: pre-line;
}
.date-display-area {
  flex: auto;
}
</style>
