<template>
  <button
    @click="top"
    class="bg-[#f7841f] rounded-full text-white p-2 fixed right-2 w-10 bottom-1"
    v-if="showTop"
  >
    <i class="bi bi-chevron-up"></i>
  </button>
</template>

<script setup>
import { ref } from "vue";

const showTop = ref(false);

window.addEventListener("scroll", (e) => {
  const quater = document.body.scrollHeight * 0.25;
  if (window.scrollY > quater) {
    showTop.value = true;
  } else {
    showTop.value = false;
  }
  //   console.log(window.scrollY);
});
const top = () => {
  window.scrollTo(0, 0);
};
</script>
