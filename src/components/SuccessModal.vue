<template>
  <div
    class="fixed top-0 left-0 z-10 grid h-screen w-screen place-content-center bg-[#00000079] backdrop-blur"
  >
    <div
      class="relative flex h-64 w-80 flex-col items-center justify-center gap-4 rounded-md bg-white p-4 shadow"
    >
      <i
        class="bi bi-x-circle-fill absolute top-[-11px] right-[-9px] cursor-pointer text-xl text-text-black"
        @click="$emit('close')"
      ></i>
      <i class="bi bi-check-circle-fill text-5xl text-green-700"></i>
      <h3 class="text-base font-medium text-[#222222] text-center">
        {{ msg }}
      </h3>
      <!-- <p v-if="showThanks" class="text-sm font-normal text-text-black">
        Thank you for sharing.
      </p> -->
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  msg?: string;
  showThanks?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  msg: "Your feedback has been shared.",
  showThanks: true,
});
</script>
