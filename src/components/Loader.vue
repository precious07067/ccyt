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
    // border: 4px solid rgba(0, 0, 0, 0.1);
    // border-left-color: blue;
    // border-radius: 50%;
    // width: 40px;
    // height: 40px;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
