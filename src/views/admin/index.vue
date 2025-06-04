<template>
  <div class="flex">
    <!-- <AdminNav /> -->
    <div class="view w-full">
      <admin-wrapper>
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </admin-wrapper>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";
import AdminNav from "@/components/AdminNav.vue";
import AdminWrapper from "../../components/AdminWrapper.vue";
</script>
