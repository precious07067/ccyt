<template>
  <div class="relative flex min-h-screen bg-gray-100">
    <div
      :class="[
        'fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <AdminNav @close-sidebar="isSidebarOpen = false" />
    </div>

    <div
      v-if="isSidebarOpen"
      @click="isSidebarOpen = false"
      class="fixed inset-0 z-30 bg-black/50 lg:hidden"
    ></div>

    <div class="flex-1 flex flex-col">
       <header class="sticky top-0 z-20 flex items-center justify-between bg-white p-2 shadow-md lg:hidden">
         <router-link to="/admin">
           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeTiCUOEW67XL413XtXTOc8MLXuvJQzKEGAC9lzsHlJqI1zzUerW86eigLAbMn_YZn3R0&usqp=CAU" alt="logo" class="h-10">
         </router-link>
         <button @click="isSidebarOpen = true" class="p-2">
           <i class="bi bi-list text-2xl"></i>
         </button>
       </header>
      <main class="flex-1">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import AdminNav from "@/components/AdminNav.vue";

const isSidebarOpen = ref(false);
const route = useRoute();

watch(route, () => {
  isSidebarOpen.value = false;
});
</script>
