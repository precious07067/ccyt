<template>
  <nav
    class="w-full sticky top-0 z-20 p-2 flex items-center justify-between bg-white shadow-md lg:hidden"
  >
    <router-link to="/dashboard">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeTiCUOEW67XL413XtXTOc8MLXuvJQzKEGAC9lzsHlJqI1zzUerW86eigLAbMn_YZn3R0&usqp=CAU" alt="logo" class="h-[40px]" />
    </router-link>
    <button @click="$emit('toggle-sidebar')" class="p-2">
        <i class="bi bi-list text-2xl"></i>
    </button>
  </nav>
</template>

<script setup>
defineEmits(['toggle-sidebar']);
</script>
