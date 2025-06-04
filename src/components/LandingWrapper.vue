<template>
  <main>
    <NavBar />
    <slot />
    <Top />
    <Footer />
  </main>
</template>

<script setup>
import NavBar from "./NavBar.vue";
import Top from "./Top.vue";
import Footer from "@/components/Footer.vue";
</script>
