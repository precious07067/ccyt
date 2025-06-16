<template>
  <nav class="h-full w-64 bg-gray-100 p-4 flex flex-col">
    <div class="flex items-center justify-between mb-8">
        <router-link to="/dashboard">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeTiCUOEW67XL413XtXTOc8MLXuvJQzKEGAC9lzsHlJqI1zzUerW86eigLAbMn_YZn3R0&usqp=CAU" alt="logo" class="h-[30px]" />
        </router-link>
        <button @click="$emit('close-sidebar')" class="lg:hidden p-2">
            <i class="bi bi-x text-2xl"></i>
        </button>
    </div>

    <div class="flex flex-col gap-1">
      <router-link
        v-for="(link, index) in links"
        :to="link.to"
        :key="index"
        class="text-slight-dark p-2 rounded-md font-medium"
        exact-active-class="bg-[#f7841f] text-white font-bold"
      >
        <span class="flex items-center gap-2">
          <i :class="link.icon" class="text-lg"></i>
          <p class="text-sm">{{ link.name }}</p>
        </span>
      </router-link>
    </div>
    <div class="mt-auto pt-4 border-t border-gray-200">
      <div class="flex gap-2">
          <div>
            <h2 class="font-semibold text-slight-dark text-sm truncate">
              {{ store.userInfo.first_name }} {{ store.userInfo.last_name }}
            </h2>
            <p class="font-medium text-slight-dark text-xs truncate">
              {{ store.userInfo.email }}
            </p>
          </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
import { ref } from "vue";

defineEmits(['close-sidebar']);

const store = useCounterStore();

const links = ref([
  { name: "Dashboard", icon: "bi bi-house", to: "/dashboard" },
  { name: "Domestic transfer", icon: "bi bi-send", to: "/dashboard/transfer" },
  { name: "International transfer", icon: "bi bi-wifi", to: "/dashboard/wire-transfer" },
  { name: "Transactions", icon: "bi bi-arrow-left-right", to: "/dashboard/transactions" },
  { name: "Request card", icon: "bi bi-card-heading", to: "/dashboard/request" },
  { name: "Profile", icon: "bi bi-gear", to: "/dashboard/profile" },
]);
</script>
