<template>
  <nav
    class="w-full sticky top-0 p-2 flex items-center gap-2 bg-gray-100 overflow-auto"
  >
    <RouterLink
      v-for="(link, index) in routes"
      :key="index"
      :to="link.path"
      class="text-xs font-semibold text-slight-dark"
      exact-active-class="p-2  bg-white rounded-xl border border-amber-500 active"
    >
      <p class="whitespace-nowrap">{{ link.name }}</p>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DashboardNav from "./DashboardNav.vue";
import { useRoute } from "vue-router";
const route = useRoute();
const open = ref(false);
interface routes {
  path: string;
  name: string;
}
const routes = ref<routes[]>([
  {
    path: "/dashboard",
    name: "Dashboard",
  },
  {
    path: "/dashboard/transfer",
    name: "Domestic transfer",
  },
  {
    path: "/dashboard/wire-transfer",
    name: "Wire transfer",
  },
  {
    path: "/dashboard/transactions",
    name: "Transactions",
  },
  {
    path: "/dashboard/request",
    name: "Request card",
  },
  {
    path: "/dashboard/profile",
    name: "Profile",
  },
]);
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: all 0.8s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(-120px);
}

.active {
  font-weight: bold !important;
  color: black !important;
}
</style>
