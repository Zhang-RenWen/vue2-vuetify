<template>
  <v-form v-model="isValid">
    <v-col>
      <v-text-field
        name="名稱"
        v-model="localValue.No"
        :readonly="readonly === 'No'"
        :rules="[rule_noEmpty]"
      />
    </v-col>
    <v-col>
      <v-text-field
        name="長度"
        v-model="localValue.w"
        :readonly="readonly === 'w'"
        :rules="[rule_noEmpty, rule_integerOnly]"
      />
    </v-col>
    <v-col>
      <v-text-field
        name="寬度"
        v-model="localValue.h"
        :readonly="readonly === 'h'"
        :rules="[rule_noEmpty]"
      />
    </v-col>
  </v-form>
</template>

<script>
export default {
  components: {},
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    },

    readonly: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      isValid: false
    }
  },

  watch: {
    isValid(newValue) {
      this.$emit('update:dialogIsValid', newValue)
    }
  },

  mounted() {},

  methods: {
    rule_noEmpty(v) {
      return v !== ''
    },

    rule_integerOnly(v) {
      return /^[0-9]*$/.test(v) || '請輸入正整數'
    }
  },

  computed: {
    localValue: {
      get() {
        return this.value
      },

      set(newValue) {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>
