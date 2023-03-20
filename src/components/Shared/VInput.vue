<template>
  <label>{{ props.label }}</label>
  <input v-model="value" v-maska:[maskOptions] type="text" v-bind="$attrs" />
  <span v-if="messageError" class="message-error">{{ messageError }}</span>
</template>
<script setup lang="ts">
  import { MaskOptions } from 'maska'
  import { computed, PropType } from 'vue'

  const props = defineProps({
    label: { type: String, default: '' },
    modelValue: { type: String, default: '' },
    maskOptions: Object as PropType<MaskOptions>,
    messageError: { type: String, default: '' },
  })

  const emit = defineEmits(['update:modelValue'])

  const value = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })
</script>
<style lang="scss" scoped>
  .message-error {
    font-size: 12px;
    color: #d43232;
  }
</style>
