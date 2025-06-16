<template>
  <main class="bg-gray-300 min-h-screen">
    <div class="lg:px-lg p-4 flex items-center pt-14 flex-col gap-4">
      <div class="w-full bg-white p-4 shadow flex items-center gap-3">
        <div>
          <h2 class="font-semibold text-slight-dark text-sm">
            {{ store.userInfo.name }}
          </h2>
          <p class="font-medium text-slight-dark text-sm">
            {{ store.userInfo.email }}
          </p>
        </div>
      </div>
      <div
        class="w-full bg-white p-4 shadow grid lg:grid-cols-2 grid-cols-1 gap-3"
      >
        <BaseInput
          label="Account number"
          type="text"
          :show-icon="false"
          disabled
          v-model="store.userInfo.acc_no"
        />
        <BaseInput
          label="Account type"
          type="text"
          :show-icon="false"
          disabled
          v-model="store.userInfo.acc_type"
        />
        <BaseInput
          label="Email"
          type="text"
          :show-icon="false"
          disabled
          v-model="store.userInfo.email"
        />
        <BaseInput
          label="Phone number"
          type="tel"
          :show-icon="false"
          disabled
          v-model="store.userInfo.tel"
        />
        <BaseInput
          label="Gender"
          type="text"
          :show-icon="false"
          disabled
          v-model="store.userInfo.gender"
        />
      </div>
      <div class="w-full min-h-40 grid lg:grid-cols-2 grid-cols-1 gap-4">
        <div class="h-fit bg-white p-4 shadow flex flex-col gap-3">
          <h2 class="font-semibold text-base text-slight-dark mb-4">
            Change password
          </h2>
          <BaseInput
            label="Current password"
            placeholder="Enter your current password"
            type="password"
            :show-icon="false"
            v-model="password"
          />
          <BaseInput
            label="New password"
            placeholder="Enter your new password"
            :show-icon="false"
            type="password"
            v-model="newpassword"
          />
          <BaseInput
            label="Confirm new password"
            placeholder="Confirm new password"
            :show-icon="false"
            type="password"
            v-model="confirmNewPassword"
          />
          <Error v-if="errPass" :err-m-s-g="errMsg" />
          <div class="lg:col-span-2 w-full grid">
            <button
              @click="changePassword"
              class="lg:w-1/2 w-full h-fit bg-Lightblue text-white text-sm p-2 rounded-md place-content-center"
            >
              Change password
            </button>
          </div>
        </div>
        <div class="h-fit bg-white p-4 shadow flex flex-col gap-3">
          <h2 class="font-semibold text-base text-slight-dark mb-4">
            Change pin
          </h2>
          <BaseInput
            label="Current pin"
            placeholder="Enter your current pin"
            type="password"
            :show-icon="false"
            v-model="pin"
          />
          <BaseInput
            label="New pin"
            placeholder="Enter your new pin"
            :show-icon="false"
            type="password"
            v-model="newpin"
          />
          <BaseInput
            label="Confirm new pin"
            placeholder="Confirm new pin"
            :show-icon="false"
            type="password"
            v-model="confirmNewPin"
          />
          <Error v-if="errPin" :err-m-s-g="errMsg" />
          <div class="lg:col-span-2 w-full grid">
            <button
              @click="changePin"
              class="lg:w-1/2 w-full h-fit bg-Lightblue text-white text-sm p-2 rounded-md place-content-center"
            >
              Change pin
            </button>
          </div>
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
const store = useCounterStore();
import { ref, watch } from "vue";

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
  loading.value = true;
  try {
    const { data } = await npcAPI.patch(
      "/change_password",
      {
        new_password: newpassword.value,
        old_password: password.value,
      },
      {
        headers: {
          Authorization: getToken("user"),
        },
      }
    );
    success.value = true;
    successMsg.value = "Passwords have been change successfully";
    console.log(data);
  } catch (e) {
    errPass.value = true;
    errMsg.value = e.response.data.msg || "Something went wrong";
    console.log(data);
  } finally {
    loading.value = false;
  }
};
const changePin = async () => {
  loading.value = true;
  try {
    const { data } = await npcAPI.patch(
      "/change_pin",
      {
        new_pin: newpin.value,
        old_pin: pin.value,
      },
      {
        headers: {
          Authorization: getToken("user"),
        },
      }
    );
    success.value = true;
    successMsg.value = "Passwords have been change successfully";
    console.log(data);
  } catch (e) {
    errPin.value = true;
    errMsg.value = e.response.data.msg || "Something went wrong";
    console.log(data);
  } finally {
    loading.value = false;
  }
};

watch(confirmNewPassword, (newSSN) => {
  if (newSSN !== newpassword.value) {
    errPass.value = true;
    errMsg.value = "Passwords do not match";
  } else {
    errPass.value = false;
  }
});

watch(confirmNewPin, (newSSN) => {
  if (newSSN !== newpin.value) {
    errPin.value = true;
    errMsg.value = "Pins do not match";
  } else {
    errPin.value = false;
  }
});
</script>
