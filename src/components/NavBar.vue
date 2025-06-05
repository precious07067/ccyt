<template>
  <nav
    class="fixed top-0 left-0 z-20 p-3 h-fit lg:px-48 w-full transition-all duration-1000"
    :class="['bg-white shadow-md']"
  >
    <div className="w-full flex items-center justify-between">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeTiCUOEW67XL413XtXTOc8MLXuvJQzKEGAC9lzsHlJqI1zzUerW86eigLAbMn_YZn3R0&usqp=CAU" alt="logo" class="lg:h-[50px] h-[50px]" />
      <RouterLink to="/">
      </RouterLink>
      <div className="flex items-center gap-3 text-black">
        <RouterLink to="/login" class="text-sm"> LOGIN </RouterLink>
        <!-- <RouterLink to="/register" class="text-sm"> REGISTER </RouterLink> -->
        <div
          className="p-2 w-fit text-xl self-end"
          @click="open = !open"
          v-if="!open"
        >
          <i class="bi bi-list text-xl"></i>
        </div>
        <div
          className="p-2 w-fit text-xl self-end"
          @click="open = !open"
          v-else
        >
          <i class="bi bi-x-lg"></i>
        </div>
      </div>
    </div>
    <nav
      className="shadow-md absolute left-0 text-black flex  flex-col border bg-white h-fit mt-2 transition-all w-full lg:px-48"
      v-if="open"
    >
      <RouterLink to="/" className="  p-2 text-sm py-2"> HOME </RouterLink>
      <RouterLink to="/about" className=" p-2 text-sm py-2">
        ABOUT US
      </RouterLink>
      <RouterLink to="/#features" className=" p-2 text-sm py-2">
        FEATURES
      </RouterLink>
    </nav>
  </nav>
</template>

<script setup>
import { ref } from "vue";

const open = ref(false);
const showNav = ref(false);

window.addEventListener("scroll", (e) => {
  if (window.scrollY > 0) {
    showNav.value = true;
  } else {
    showNav.value = false;
  }
});
</script>
