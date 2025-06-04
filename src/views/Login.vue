<template>
  <div
    class="flex items-center justify-center min-h-screen flex-col text-slight-dark lg:px-lg px-4"
  >
    <h2 class="font-semibold text-xl text-center">
      Login to your bank account
    </h2>
    <p class="text-base text-center">
      Don't have an account yet ?
      <router-link to="/register" class="text-amber-600">Register</router-link>
    </p>
    <form
      class="mt-5 lg:w-1/3 w-full flex flex-col gap-4"
      @submit.prevent="login"
    >
      <BaseInput
        label="Account number"
        type="text"
        placeholder="Enter your account number"
        :showIcon="false"
        v-model="userDetails.acc_no"
        inputmode="numeric"
      />
      <BaseInput
        label="Password"
        type="password"
        placeholder="Enter your password"
        :showIcon="false"
        v-model="userDetails.password"
      />
      <div class="w-full flex items-center justify-between">
        <span class="flex items-center gap-2">
          <label for="rem">Remember me</label>
          <input type="checkbox" v-model="checked" id="rem"
        /></span>
        <!-- <router-link to="/forgotpassword" class="text-amber-600">
          <span>Forgot password ?</span>
        </router-link> -->
      </div>
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
import { npcAPI } from "../axios/api";
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
    const { data } = await npcAPI.post("/login", {
      ...userDetails.value,
    });
    localStorage.setItem("token", data.token);
    router.push("/dashboard");
  } catch (e) {
    // console.log(e);
    err.value = true;
    errMSG.value = e.response.data.msg || e;
  } finally {
    loading.value = false;
  }
};
</script>
