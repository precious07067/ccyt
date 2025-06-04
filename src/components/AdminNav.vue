<template>
  <nav class="bg-amber-500 p-4 shadow-md sticky top-0 left-0 z-50 w-full">
    <div class="w-full flex items-center justify-between">
      <div class="flex items-center gap-2">
        <!-- <i class="bi bi-list text-4xl" @click="open = true"></i> -->
        <h2 class="font-syne text-xl">Citi Bank</h2>
      </div>
      <i class="bi bi-list text-4xl" @click="open = true"></i>
    </div>
    <Transition>
      <div
        class="absolute top-0 left-0 w-[70vw] h-screen p-4 bg-gray-100 flex flex-col gap-y-4 items-start"
        v-if="open"
      >
        <i class="bi bi-x text-4xl self-end" @click="open = false"></i>
        <RouterLink to="/admin" class="flex items-center gap-x-2">
          <i class="bi bi-grid-1x2-fill text-lg"></i> Dashboard
        </RouterLink>
        <RouterLink to="/admin/transactions" class="flex items-center gap-x-2">
          <i class="bi bi-send text-xl"></i> Transactions
        </RouterLink>
        <RouterLink to="/admin/adminList" class="flex items-center gap-x-2">
          <i class="bi bi-people-fill text-xl"></i> Admin List
        </RouterLink>
        <RouterLink to="/admin/password" class="flex items-center gap-x-2">
          <i class="bi bi-key text-xl"></i> Change Password
        </RouterLink>
        <RouterLink to="/admin/requests" class="flex items-center gap-x-2">
          <i class="bi bi-credit-card-2-front text-xl"></i> Card request
        </RouterLink>
        <button
          class="flex items-center gap-x-2 justify-self-end"
          @click="logout"
        >
          <i class="bi bi-box-arrow-left"></i>
          Log out
        </button>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const open = ref(false);

const logout = () => {
  localStorage.removeItem("admintoken");
  router.push("/adminLogin");
};
</script>

<style lang="scss" scoped>
a.router-link-exact-active {
  color: purple;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(-60px);
}
</style>
