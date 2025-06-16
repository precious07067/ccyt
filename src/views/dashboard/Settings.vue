<template>
  <main class="p-4 lg:p-8">
    <div class="max-w-7xl mx-auto space-y-8">
      <h1 class="text-3xl font-bold text-gray-800">Profile & Settings</h1>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold text-gray-700 border-b pb-4 mb-4">Personal Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BaseInput
            label="Full Name"
            type="text"
            :show-icon="false"
            disabled
            :model-value="store.fullName"
          />
          <BaseInput
            label="Account Number"
            type="text"
            :show-icon="false"
            disabled
            :model-value="store.userInfo.acc_no"
          />
          <BaseInput
            label="Email"
            type="email"
            :show-icon="false"
            disabled
            :model-value="store.userInfo.email"
          />
          <BaseInput
            label="Phone Number"
            type="tel"
            :show-icon="false"
            disabled
            :model-value="store.userInfo.tel"
          />
           <BaseInput
            label="Account Type"
            type="text"
            :show-icon="false"
            disabled
            :model-value="store.userInfo.acc_type"
          />
          <BaseInput
            label="Gender"
            type="text"
            :show-icon="false"
            disabled
            :model-value="store.userInfo.gender"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Change Password</h2>
          <form @submit.prevent="changePassword" class="space-y-4">
            <BaseInput
              label="Current Password"
              placeholder="Enter your current password"
              type="password"
              :show-icon="false"
              v-model="password"
            />
            <BaseInput
              label="New Password"
              placeholder="Enter your new password"
              :show-icon="false"
              type="password"
              v-model="newpassword"
            />
            <BaseInput
              label="Confirm New Password"
              placeholder="Confirm new password"
              :show-icon="false"
              type="password"
              v-model="confirmNewPassword"
            />
            <Error v-if="errPass" :errMSG="errMsg" />
            <button
              type="submit"
              class="w-full h-fit bg-slate-600 text-white text-sm p-3 rounded-md hover:bg-slate-700 transition-colors"
            >
              Update Password
            </button>
          </form>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 class="text-xl font-semibold text-gray-700 mb-4">Change PIN</h2>
          <form @submit.prevent="changePin" class="space-y-4">
            <BaseInput
              label="Current PIN"
              placeholder="Enter your current PIN"
              type="password"
              :show-icon="false"
              v-model="pin"
            />
            <BaseInput
              label="New PIN"
              placeholder="Enter your new PIN"
              :show-icon="false"
              type="password"
              v-model="newpin"
            />
            <BaseInput
              label="Confirm New PIN"
              placeholder="Confirm new PIN"
              :show-icon="false"
              type="password"
              v-model="confirmNewPin"
            />
            <Error v-if="errPin" :errMSG="errMsg" />
            <button
              type="submit"
              class="w-full h-fit bg-slate-600 text-white text-sm p-3 rounded-md hover:bg-slate-700 transition-colors"
            >
              Update PIN
            </button>
          </form>
        </div>
      </div>
    </div>
    <SuccessModal v-if="success" :msg="successMsg" @close="success = false" />
    <Loader v-if="loading" />
  </main>
</template>

<script setup>
import { npcAPI, getToken } from "@/axios/api";
import BaseInput from "@/components/BaseInput.vue";
import Error from "@/components/Error.vue";
import Loader from "@/components/Loader.vue";
import SuccessModal from "@/components/SuccessModal.vue";
import { useCounterStore } from "@/stores/counter";
import { ref, watch } from "vue";

const store = useCounterStore();
const password = ref("");
const newpassword = ref("");
const confirmNewPassword = ref("");
const pin = ref("");
const newpin = ref("");
const confirmNewPin = ref("");
const errMsg = ref("");
const successMsg = ref("");
const loading = ref(false);
const success = ref(false);
const errPin = ref(false);
const errPass = ref(false);

const changePassword = async () => {
  if (newpassword.value !== confirmNewPassword.value) {
    errPass.value = true;
    errMsg.value = "Passwords do not match.";
    return;
  }
  loading.value = true;
  errPass.value = false;
  try {
    await npcAPI.patch(
      "/change_password",
      { new_password: newpassword.value, old_password: password.value },
      { headers: { Authorization: getToken("user") } }
    );
    success.value = true;
    successMsg.value = "Password changed successfully.";
    password.value = "";
    newpassword.value = "";
    confirmNewPassword.value = "";
  } catch (e) {
    errPass.value = true;
    errMsg.value = e.response?.data?.msg || "Failed to change password.";
  } finally {
    loading.value = false;
  }
};

const changePin = async () => {
  if (newpin.value !== confirmNewPin.value) {
    errPin.value = true;
    errMsg.value = "PINs do not match.";
    return;
  }
  loading.value = true;
  errPin.value = false;
  try {
    await npcAPI.patch(
      "/change_pin",
      { new_pin: newpin.value, old_pin: pin.value },
      { headers: { Authorization: getToken("user") } }
    );
    success.value = true;
    successMsg.value = "PIN changed successfully.";
    pin.value = "";
    newpin.value = "";
    confirmNewPin.value = "";
  } catch (e) {
    errPin.value = true;
    errMsg.value = e.response?.data?.msg || "Failed to change PIN.";
  } finally {
    loading.value = false;
  }
};

watch(confirmNewPassword, (newValue) => {
  if (newValue && newValue !== newpassword.value) {
    errPass.value = true;
    errMsg.value = "Passwords do not match.";
  } else {
    errPass.value = false;
  }
});

watch(confirmNewPin, (newValue) => {
  if (newValue && newValue !== newpin.value) {
    errPin.value = true;
    errMsg.value = "PINs do not match.";
  } else {
    errPin.value = false;
  }
});
</script>
