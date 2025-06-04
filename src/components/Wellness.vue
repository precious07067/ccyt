<template>
  <section
    class="lg:px-lg p-4 h-fit bg-[url('@/assets/wellness.webp')] bg-no-repeat bg-cover flex-col flex items-center justify-center"
  >
    <div class="w-[80%] h-fit bg-white rounded-md p-7">
      <h2 class="lg:text-3xl text-2xl font-bold text-center text-slight-dark">
        Financial Wellness
      </h2>
      <p class="text-center lg:text-2xl text-xl text-slight-dark mt-4">
        We can help you get a clear picture of where you are today and help you
        plan for the future you want.
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const tracking = ref("");
</script>
