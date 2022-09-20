<template>
  <v-dialog v-model="localShowDialog" persistent max-width="1024px">
    <v-card>
      <v-card-title>新增資料</v-card-title>
      <v-divider />
      <v-card-text>
        <slot name="form" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="closeDialog">取消</v-btn>
        <v-btn :disabled="!isValid" @click="addData">新增</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  components: {},
  props: {
    dialogIsOpened: {
      type: Boolean,
      default: true
    },

    isValid: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {}
  },

  computed: {
    localShowDialog: {
      get() {
        return this.dialogIsOpened
      }
    }
  },

  mounted() {
    console.log('vdialog')
  },

  methods: {
    closeDialog() {
      this.$emit('update:dialogIsOpened', false)
      this.$emit('closeDialog')
    },

    addData() {
      this.$emit('addData')
    }
  }
}
</script>
