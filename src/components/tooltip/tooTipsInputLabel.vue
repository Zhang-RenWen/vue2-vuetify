<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-subheader
        :style="inlineStyle"
        :class="inlineClass"
        v-bind="attrs"
        v-on="on"
        v-text="shortLabel(label).label"
      />
    </template>
    <span>{{ label }}</span>
  </v-tooltip>
</template>
<script>
export default {
  name: "tooTipsInputLabel",
  props: ["label", "showAll", "inlineStyle", "limit", "inlineClass"],
  methods: {
    shortLabel(str) {
      let label = "";
      let strLengthLimit = this.limit || 6;
      let strLength = str.length <= strLengthLimit;
      if (strLength || this.showAll) {
        label = str;
      } else {
        label = str.substr(0, strLengthLimit) + "...";
      }
      return {
        label,
        strLength,
      };
    },
  },
};
</script>
