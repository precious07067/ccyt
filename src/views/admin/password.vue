<template>
  <div class="p-4">
    <h2 class="font-semibold flex items-center gap-x-1">
      Change Login password
    </h2>
    <div class="flex flex-col gap-1 mt-2">
      <label for="new_password" class="text-sm text-gray-950">
        New Password
      </label>
      <input
        type="password"
        id="new_password"
        placeholder="Enter new password"
        class="text-sm p-2 border border-solid focus:outline-none"
        v-model="password"
      />
    </div>

    <div class="flex flex-col gap-1 mt-2 mb-3">
      <label for="confirm_password" class="text-sm text-gray-950">
        Confirm New password
      </label>
      <input
        type="password"
        id="confirm_password"
        placeholder="Confirm new password"
        class="text-sm p-2 border border-solid focus:outline-none"
        v-model="confirmPassword"
      />
    </div>
    <!-- <p class="text-red-600">{{ error }}</p> -->
    <hr />
    <Error v-if="error" :errMSG="errMSG" />
    <SuccessModal
      v-if="success"
      @close="success = false"
      msg="Password changed successfully"
    />
    <button
      class="p-2 bg-slate-500 rounded-md w-full text-white"
      @click="changePassword"
    >
      Update Password
    </button>
    <Loader v-if="loading" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { adminAPI, getToken } from "@/axios/api";
import Loader from "@/components/Loader.vue";
import SuccessModal from "@/components/SuccessModal.vue";
import Error from "../../components/Error.vue";
// import { getToken } from "@/axios/api";

const loading = ref(false);
const password = ref("");
const confirmPassword = ref("");
const errMSG = ref("");
const success = ref(false);
const error = ref(false);

const changePassword = async () => {
  if (password.value !== confirmPassword.value) {
    errMSG.value = "passwords do not match";
    error.value = true;
    return;
  }
  loading.value = true;
  try {
    const { data } = await adminAPI.patch(
      "/update_admin",
      {
        password: password.value,
      },
      {
        headers: {
          Authorization: getToken("admin"),
        },
      }
    );
    error.value = "";
    loading.value = false;
    password.value = "";
    confirmPassword.value = "";
    success.value = true;
    // setTimeout(() => (success.value = false), 3000);
    // console.log(data);
  } catch (e) {
    loading.value = false;
    errMSG.value = e.response.data;
    error.value = true;
    // console.log(e);
  }
};
</script>
