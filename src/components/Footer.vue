<template>
  <footer
    class="bg-[#414e58] mt-7 px-4 lg:px-lg py-[50px] grid lg:grid-cols-4 grid-cols-1 gap-5 text-white"
  >
    <div class="flex items-center text-red-500 gap-4">
      <router-link to="/login">
        <i class="bi bi-facebook"></i>
      </router-link>
      <router-link to="/login">
        <i class="bi bi-twitter-x"></i>
      </router-link>
      <router-link to="/login">
        <i class="bi bi-instagram"></i>
      </router-link>
      <router-link to="/login">
        <i class="bi bi-linkedin"></i>
      </router-link>
    </div>
    <div class="flex flex-col">
      <h3 class="font-bold text-base">Company</h3>
      <span class="flex flex-col text-sm">
        <router-link to="/about">About us</router-link>
        <router-link to="/privacypolicy">Privacy policy</router-link>
      </span>
    </div>
          </footer>
</template>

<script setup></script>
