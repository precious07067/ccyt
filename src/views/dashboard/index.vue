<template>
  <div class="">
    <DashboardNav class="lg:fixed top-0 left-0 hidden lg:block" />
    <div
      class="view relative lg:left-[250px] lg:w-[calc(100vw-268px)] w-full bg-gray-100"
    >
      <TopBar class="lg:hidden" />
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>

<script setup>
import DashboardNav from "@/components/DashboardNav.vue";
import TopBar from "@/components/TopBar.vue";
import { useCounterStore } from "@/stores/counter";
const store = useCounterStore();
store.getUserDetails();
</script>
