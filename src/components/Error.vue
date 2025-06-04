<template>
  <div class="error-wrapper">
    <i class="bi bi-x-octagon-fill"></i>
    <p>{{ errMSG }}</p>
  </div>
</template>

<script setup>
defineProps({
  errMSG: {
    type: String,
    default: "Something went wrong",
  },
});
</script>

<style lang="scss" scoped>
.error-wrapper {
  width: 100%;
  background-color: rgb(254 226 226);
  height: 60px;
  border-radius: 6px;
  border: 1px solid rgba(220, 38, 38, 0.363);
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 12px 0;

  i {
    color: rgb(220 38 38);
    font-size: 18px;
  }

  p {
    font-size: 14px;
    margin: 0;
    font-weight: 600;
  }
}
</style>
