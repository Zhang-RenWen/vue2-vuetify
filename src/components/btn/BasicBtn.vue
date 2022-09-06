<template>
  <v-btn
    class="white--text mx-1"
    v-bind="{ ...$attrs }"
    v-on="$listeners"
    :color="color"
    :small="small"
    :disabled="getDisabled"
  >
    <slot>{{ text }} </slot>
  </v-btn>
</template>
<script>
export default {
  name: "BasicBtn",
  props: {
    text: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "grey darken-2",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    getDisabled() {
      return this.disabled || this.isApplicationReadOnly;
    },
  },
};
</script>
