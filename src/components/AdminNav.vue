<template>
  <nav class="h-screen w-64 bg-slate-800 p-4 text-white flex flex-col">
    <div class="flex items-center justify-between mb-8">
        <router-link to="/admin" class="font-syne text-xl font-bold">Citi Bank Admin</router-link>
        <button @click="$emit('close-sidebar')" class="lg:hidden p-2">
            <i class="bi bi-x text-2xl"></i>
        </button>
    </div>

    <div class="flex flex-col gap-y-2">
        <RouterLink to="/admin" class="flex items-center gap-x-2 p-2 rounded-md hover:bg-slate-700">
          <i class="bi bi-grid-1x2-fill text-lg"></i> Dashboard
        </RouterLink>
        <RouterLink to="/admin/transactions" class="flex items-center gap-x-2 p-2 rounded-md hover:bg-slate-700">
          <i class="bi bi-send text-xl"></i> Transactions
        </RouterLink>
        <RouterLink to="/admin/adminList" class="flex items-center gap-x-2 p-2 rounded-md hover:bg-slate-700">
          <i class="bi bi-people-fill text-xl"></i> Admin List
        </RouterLink>
        <RouterLink to="/admin/password" class="flex items-center gap-x-2 p-2 rounded-md hover:bg-slate-700">
          <i class="bi bi-key text-xl"></i> Change Password
        </RouterLink>
        <RouterLink to="/admin/requests" class="flex items-center gap-x-2 p-2 rounded-md hover:bg-slate-700">
          <i class="bi bi-credit-card-2-front text-xl"></i> Card request
        </RouterLink>
    </div>
    
    <button
      class="flex items-center gap-x-2 justify-self-end mt-auto pt-4 border-t border-slate-700 w-full p-2 rounded-md hover:bg-slate-700"
      @click="logout"
    >
      <i class="bi bi-box-arrow-left"></i>
      Log out
    </button>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

defineEmits(['close-sidebar']);

const logout = () => {
  localStorage.removeItem("admintoken");
  router.push("/adminLogin");
};
</script>

<style scoped>
a.router-link-exact-active {
  background-color: #f7841f;
  color: white;
}
</style>
