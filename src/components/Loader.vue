<template>
  <div class="container-x">
    <div class="spinner">
      <img :src="Spinner" alt="loader" class="h-20 w-20" />
    </div>
    <p>{{ text }}</p>
  </div>
</template>

<script setup>
import Spinner from "../assets/spinner.png";
defineProps({
  text: {
    type: String,
    default: "loading...",
  },
});
</script>

<style lang="scss" scoped>
.container-x {
  background-color: #ffffffa2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 999;
  width: 100%;

  .spinner {
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
