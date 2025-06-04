<template>
  <div class="font-manrope w-full flex flex-col gap-1">
    <label
      v-if="label"
      class="font-semibold lg:text-sm text-xs text-slight-dark"
      >{{ label }}</label
    >
    <div
      class="border-gray-200 w-full outline-none focus-within:border-l-4 border focus-within:border-[#f7841f] bg-white p-3 flex gap-3 items-center"
    >
      <i :class="iconClass" class="text-slight-dark" v-if="showIcon"></i>
      <input
        v-bind="$attrs"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        class="focus:outline-none w-full text-sm disabled:text-gray-400 disabled:bg-white bg-white"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: [String, Boolean],
    default: false,
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  iconClass: {
    type: String,
  },
  showIcon: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped></style>
