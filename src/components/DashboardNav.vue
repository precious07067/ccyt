<template>
  <nav class="h-screen w-[250px] bg-gray-100 p-4">
    <!-- <h1 class="text-4xl font-black text-slight-dark">LOGO</h1> -->
    <img src="@/assets/logo.jpg" alt="logo" class="lg:h-[30px] h-[30px]" />

    <div class="flex flex-col gap-1 mt-10">
      <router-link
        v-for="(link, index) in links"
        :to="link.to"
        :key="index"
        class="text-slight-dark p-2 sm:text-sm lg:text-base font-medium"
        exact-active-class="bg-[#f7841f] white rounded font-bold"
      >
        <span class="flex items-center gap-2">
          <i :class="link.icon" class="text-lg"></i>
          <p class="text-sm">{{ link.name }}</p>
        </span>
      </router-link>
    </div>
    <div class="mt-7 flex gap-2">
      <div>
        <h2 class="font-semibold text-slight-dark text-sm">
          {{ store.userInfo.first_name }} {{ store.userInfo.last_name }}
        </h2>
        <p class="font-medium text-slight-dark text-sm">
          {{ store.userInfo.email }}
        </p>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { ref } from "vue";
const store = useCounterStore();
interface link {
  name: string;
  icon: string;
  to: string;
}

const links = ref<link[]>([
  {
    name: "Dashboard",
    icon: "bi bi-house",
    to: "/dashboard",
  },
  {
    name: "Domestic transfer",
    icon: "bi bi-send",
    to: "/dashboard/transfer",
  },
  {
    name: "International transfer",
    icon: "bi bi-wifi",
    to: "/dashboard/wire-transfer",
  },
  {
    name: "Transactions",
    icon: "bi bi-arrow-left-right",
    to: "/dashboard/transactions",
  },
  {
    name: "Request card",
    icon: "bi bi-card-heading",
    to: "/dashboard/request",
  },
  {
    name: "Profile",
    icon: "bi bi-gear",
    to: "/dashboard/profile",
  },
]);
</script>

<style scoped>
.white {
  color: white !important;
}
</style>
