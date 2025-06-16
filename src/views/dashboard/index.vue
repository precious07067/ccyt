<template>
  <div class="relative flex min-h-screen">
    <div
      :class="[
        'fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <DashboardNav @close-sidebar="isSidebarOpen = false" />
    </div>

    <div
      v-if="isSidebarOpen"
      @click="isSidebarOpen = false"
      class="fixed inset-0 z-30 bg-black/50 lg:hidden"
    ></div>

    <div class="flex-1 flex flex-col">
      <TopBar class="lg:hidden" @toggle-sidebar="isSidebarOpen = true" />
      <main class="flex-1">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import DashboardNav from "@/components/DashboardNav.vue";
import TopBar from "@/components/TopBar.vue";
import { useCounterStore } from "@/stores/counter";

const store = useCounterStore();
const isSidebarOpen = ref(false);
const route = useRoute();

watch(route, () => {
  isSidebarOpen.value = false;
});

onMounted(() => {
  if (!store.userInfo.first_name) {
    store.getUserDetails();
  }
});
</script>
