<template>
  <v-row class="align-baseline no-gutters">
    <v-col v-if="name" : cols="colsName" :class="{ 'pr-1 text-right': row }">
      |
      <slot :name="name">{{ name }}</slot>
    </v-col>
    <v-col
      :cols="row ? colsInput : cols"
      class="d-flex"
      :class="{ 'pl-2': row }"
    >
      <v-autocomplete
        v-model="localValue"
        v-bind="$attrs"
        v-on="$listeners"
        ref="inputRef"
        class="inputAutocomplete"
        :class="{
          'inputAutocomplete--colorChanged': hasChanged,
          'inputAutocomplete--disabled': isDisabled,
          isChanged,
        }"
        :placeholder="placeholder"
        :rules="localRules"
        :label="label"
        :items="localItems"
        :item-text="itemTextKey"
        :item-value="itemValueKey"
        :disabled="isDisabled"
        :readonly="isDisabled"
        @click="$emit('click', $event)"
        @focus="onFocus"
        @blur="validate()"
        @update:error="$emit('update:error', $event)"
        @keyup.delete="onPressedDelete"
        hide-details="auto"
        dense
        outlined
        validate-on-blur
      >
        <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
        <slot v-for="slot in Object.keys($slots)" name="slot" :slot="slot" />
      </v-autocomplete>
    </v-col>
  </v-row>
</template>
<script>
import {
  disabledMixin,
  changeColorMixin,
  inputRefMixin,
} from "./.inputMixin.js";
export default {
  mixins: [disabledMixin, changeColorMixin, inputRefMixin],
  data: function () {
    return {};
  },
  props: {
    value: {
      type: String,
      default: "",
    },

    name: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
      default: function () {
        return [];
      },
    },

    itemTextKey: {
      type: String,
      default: "text",
    },
    itemValueKey: {
      type: String,
      default: "value",
    },
    required: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },

    rules: {
      type: Array,
      default: function () {
        return [];
      },
    },
    hasDefault: {
      type: Boolean,
      default: false,
    },
    defaultItem: {
      default: function () {
        return { text: "", value: "" };
      },
    },
    placeholder: {
      type: String,
      default: "",
    },
    cols: {
      type: Number,
      default: 12,
    },

    "cols-name": {
      type: Number,
      default: 4,
    },
    "cols-input": {
      type: Number,
      default: 8,
    },
  },
  computed: {
    localValue: {
      get() {
        return !this.value ? "" : this.value;
      },

      set(newValue) {
        this.$emit("input", newValue);
      },
    },

    localItems() {
      return this.hasDefault
        ? [
            {
              [this.itemValueKey]: this.defaultItem[this.itemValueKey],
              [this.itemTextKey]: this.defaultItem[this.itemTextKey],
            },
            ...this.items,
          ]
        : [...this.items];
    },
    localRules() {
      const rules = this.rules;
      if (this.required) {
        rules.unshift(this.checkEmpty);
      }
      return rules;
    },
  },
  methods: {
    validate(showMessage = false) {
      return this.$refs.inputRef.validate(showMessage);
    },
    reset() {
      return this.$refs.inputRef.reset();
    },
    checkEmpty(value) {
      const name = this.name ? this.name : "此欄位";
      return !this.required || !!value || `${name}為必填請修正`;
    },
    onPressedDelete(e) {
      const val = e.target.value;
      if (!val) {
        const option = this.localItems.find(({ value }) => value === val);
        if (option) {
          this.localValue = option.value;
          this.$emit("change", option.value);
        }
      }
    },
    onFocus(e) {
      this.$emit("focus", e);
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .inputAutocomplete {
  white-space: pre-line;
  .v-select__selections {
    white-space: nowrap;
    display: inline-block;
    input {
      min-width: unset !important;
    }
  }
}
::v-deep .inputAutocomplete--colorChanged {
  .v-select__selections {
    color: red;
  }
  input {
    color: red;
  }
}
::v-deep .inputAutocomplete--disabled {
  .v-input__slot {
    background-color: #e5e5e5;
  }
  input {
    color: black;
  }
}
</style>
