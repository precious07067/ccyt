<template>
  <header
    class="hero2 text-white flex items-center lg:px-[150px] bg-center gap-3 px-4 justify-center flex-col relative"
  >
    <h2 class="lg:text-4xl text-xl font-bold">Banking Redefined</h2>
    <p class="text-center mt-2 text-sm lg:text-lg text-gray-300 font-semibold">
      Take your next step with Citi Bank Virtual Wallet - checking, savings and
      financial tools designed to go wherever you do.
    </p>
    <router-link to="/register" class="w-full flex justify-center items-center">
      <button
        class="lg:w-1/4 w-1/2 bg-[#f7841f] text-white p-2 mt-3 text-center rounded-md"
      >
        Online banking
      </button>
    </router-link>
    <Features
      class="absolute lg:-bottom-20 -bottom-80 left-[7px] lg:left-[150px]"
    />
  </header>
</template>

<script setup>
// import Features from "./Features.vue";
</script>
