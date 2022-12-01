<template>
  <div class="inputCheckbox" :class="{ 'd-flex': row }">
    <InputTextLabel
      :name="name"
      :label-hint="localLabelHint"
      :show-label-hint="showLabelHint"
      :label-color="labelColor"
      :items="items"
      class="label"
      :style="labelStyle"
    />
    <div class="flex-wrap" :class="{ 'd-flex': row }">
      <div :class="itemClassNames">
        <v-checkbox
          v-model="check"
          :class="{ 'v-input__colorChanged': isChanged(item), 'mr-2': row }"
          :label="item[itemText]"
          dense
          :readonly="readonly"
          :disabled="disabled"
          @click="$emit('click', $event, item[itemValue])"
          @change="onChange"
        >
          <slot v-for="slot of Object.keys($slots)" :slot="slot" :name="slot" />
        </v-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {}
}
</script>

<style></style>
