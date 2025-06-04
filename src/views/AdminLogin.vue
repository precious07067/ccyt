<template>
  <div
    class="flex items-center justify-center min-h-screen flex-col text-slight-dark lg:px-lg px-4"
  >
    <h2 class="font-semibold text-xl text-center">Admin Login</h2>
    <form
      class="mt-5 lg:w-1/3 w-full flex flex-col gap-4"
      @submit.prevent="login"
    >
      <BaseInput
        label="Email"
        type="email"
        placeholder="Enter your email"
        :showIcon="false"
        v-model="userDetails.email"
      />
      <BaseInput
        label="Password"
        type="password"
        placeholder="Enter your password"
        :showIcon="false"
        v-model="userDetails.password"
      />

      <Error v-if="err" :errMSG="errMSG" />
      <button class="w-full p-3 rounded-lg border-none bg-[#f7841f] text-white">
        Login
      </button>
    </form>
    <Loader v-if="loading" />
  </div>
</template>

<script setup>
import Cookies from "js-cookie";
import BaseInput from "@/components/BaseInput.vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { adminAPI } from "../axios/api";
const router = useRouter();
const route = useRoute();
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";
const loading = ref(false);
const success = ref(false);
const checked = ref(false);
const err = ref(false);
const errMSG = ref("");
const userDetails = ref({
  email: "",
  password: "",
});

const login = async () => {
  loading.value = true;
  try {
    const { data } = await adminAPI.post("/login", {
      ...userDetails.value,
    });
    localStorage.setItem("admin", data.token);
    localStorage.setItem("ref", data.ref);
    router.push("/admin");
  } catch (e) {
    // console.log(e);
    err.value = true;
    errMSG.value = e.response.data.msg || e;
  } finally {
    loading.value = false;
  }
};
</script>
