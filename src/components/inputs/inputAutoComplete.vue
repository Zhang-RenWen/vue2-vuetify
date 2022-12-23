<template>
  <v-row class="align-baseline no-gutters">
    <v-col v-if="name" :cols="colsName" :class="{ 'pr-1 text-right': row }">
      <slot :name="name">{{ name }}</slot>
    </v-col>
    <v-col :cols="row ? colsInput : cols" class="d-flex" :class="{ 'pl-2': row }">
      <v-autocomplete
        v-bind="$attrs"
        ref="inputRef"
        v-model="localValue"
        class="input-autocomplete"
        :class="{
          'input-autocomplete--color-changed': hasChanged,
          'input-autocomplete--disabled': disabled
        }"
        :placeholder="placeholder"
        :rules="localRules"
        :label="label"
        :items="localItems"
        :item-text="itemTextKey"
        :item-value="itemValueKey"
        :disabled="disabled"
        :readonly="readonly"
        hide-details="auto"
        dense
        outlined
        validate-on-blur
        v-on="$listeners"
        @click="$emit('click', $event)"
        @focus="onFocus"
        @blur="validate()"
        @reset="reset"
        @update:error="$emit('update:error', $event)"
        @keyup.delete="onPressedDelete"
      >
        <template v-for="(_, slot) of $scopedSlots" #[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
        <slot v-for="slot of Object.keys($slots)" :slot="slot" name="slot" />
      </v-autocomplete>
    </v-col>
  </v-row>
</template>

<script>
import { valueChangedSetColor, inputRefEvent } from './inputMixin.js'
export default {
  mixins: [valueChangedSetColor, inputRefEvent],
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

    placeholder: {
      type: String,
      default: ''
    },

    cols: {
      type: Number,
      default: 12
    },

    row: {
      type: Boolean,
      default: true
    },

    colsName: {
      type: Number,
      default: 4
    },

    colsInput: {
      type: Number,
      default: 8
    },

    items: {
      type: Array,
      default() {
        return []
      }
    },

    itemTextKey: {
      type: String,
      default: 'text'
    },

    itemValueKey: {
      type: String,
      default: 'value'
    },

    hasDefault: {
      type: Boolean,
      default: false
    },

    defaultItem: {
      type: Object,
      default() {
        return { text: '', value: '' }
      }
    },

    required: {
      type: Boolean,
      default: false
    },

    rules: {
      type: Array,
      default() {
        return []
      }
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
    return {}
  },

  computed: {
    localItems() {
      return this.hasDefault
        ? [
            {
              [this.itemValueKey]: this.defaultItem[this.itemValueKey],
              [this.itemTextKey]: this.defaultItem[this.itemTextKey]
            },
            ...this.items
          ]
        : [...this.items]
    },

    localRules() {
      const rules = this.rules
      if (this.required) {
        rules.unshift(this.checkEmpty)
      }
      return rules
    }
  },

  methods: {
    validate(showMessage = false) {
      return this.$refs.inputRef.validate(showMessage)
    },

    reset() {
      return this.$refs.inputRef.reset()
    },

    checkEmpty(value) {
      const name = this.name ? this.name : '此欄位'
      return !this.required || !!value || `${name}為必填請修正`
    },

    onPressedDelete(e) {
      const val = e.target.value
      if (!val) {
        const option = this.localItems.find(({ value }) => value === val)
        if (option) {
          this.localValue = option.value
          this.$emit('change', option.value)
        }
      }
    },

    onFocus(e) {
      this.$emit('focus', e)
    }
  }
}
</script>

<style lang="scss" scoped>
/* stylelint-disable */
::v-deep .input-autocomplete {
  white-space: pre-line;

  .v-select__selections {
    white-space: nowrap;
    display: inline-block;

    input {
      min-width: unset !important;
    }
  }
}
::v-deep .input-autocomplete--color-changed {
  .v-select__selections {
    color: red;
  }

  input {
    color: red;
  }
}

::v-deep .input-autocomplete--disabled {
  .v-input__slot {
  }

  input {
  }
}
</style>
