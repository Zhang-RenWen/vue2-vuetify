<template>
  <i class="v-icon" v-on="$listeners">
    <svg :class="iconClass" aria-hidden="true">
      <use :xlink:href="iconName" />
    </svg>
    <span v-if="append" class="ml-1 app-svg-icon-text">{{ append }}</span>
  </i>
</template>

<script>
/**
＊自訂義 svg 圖檔元件
* @param {Array} classList  自訂樣式名稱
* @param {String} classList 自訂樣式名稱
* @param {String} icon 圖形名稱
*
*/

export default {
  name: "SvgIcon",
  props: {
    classList: [Array, String],
    icon: {
      type: String,
      default: "",
    },

    append: {
      type: String,
      default: "",
    },
  },
  computed: {
    iconClass() {
      if (typeof this.classList === "string") {
        return `app-svg-icon ${this.classList}`;
      } else if (Array.isArray(this.classList)) {
        return ["app-svg-icon", ...this.classList];
      } else {
        return "app-svg-icon";
      }
    },
    iconName() {
      return `#icon-${this.icon}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.app-svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
}

.app-svg-icon-text {
  font-size: 1rem;
  cursor: default;
}
</style>
