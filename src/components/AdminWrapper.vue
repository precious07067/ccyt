<template>
  <main>
    <AdminNav />
    <slot></slot>
  </main>
</template>

<script setup>
import NavBar from "./NavBar.vue";
import AdminNav from "./AdminNav.vue";
</script>
