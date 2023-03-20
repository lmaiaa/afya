<template>
  <label>{{ props.label }}</label>
  <input type="text" v-model="value" v-bind="$attrs" v-maska:[maskOptions] />
  <span class="message-error" v-if="messageError">{{ messageError }}</span>
</template>
<script setup lang="ts">
import { MaskOptions } from 'maska';
import { computed, PropType, watch, ref } from 'vue';

const props = defineProps({
  label: String,
  modelValue: String,
  maskOptions: Object as PropType<MaskOptions>,
  messageError: String,
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});
</script>
<style lang="scss" scoped>
.message-error {
  font-size: 12px;
  color: #d43232;
}
</style>
