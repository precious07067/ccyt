<template>
  <div class="p-4 pt-16">
    <h2 class="font-semibold flex items-center gap-x-1">
      <i class="bi bi-person-lines-fill text-lg"></i> User details
    </h2>
    <div class="flex flex-col gap-1 mt-2">
      <label for="first_name" class="text-sm text-gray-950"> First name </label>
      <input
          type="text"
          id="first_name"
          class="text-sm p-2 border border-solid focus:outline-none"
          name="first_name"
          v-model="user_details.first_name"
          />
    </div>
    <div class="flex flex-col gap-1 mt-2">
      <label for="last_name" class="text-sm text-gray-950"> Last name </label>
      <input
          type="text"
          id="last_name"
          name="last_name"
          class="text-sm p-2 border border-solid focus:outline-none"
          v-model="user_details.last_name"
          />
    </div>
    <div class="flex flex-col gap-1 mt-2">
      <label for="phone_number" class="text-sm text-gray-950">
        Phone Number
      </label>
      <input
          type="text"
          id="phone_number"
          class="text-sm p-2 border border-solid focus:outline-none"
          name="tel"
          v-model="user_details.tel"
          />
    </div>
    <div class="flex flex-col gap-1 mt-2">
      <label for="balance" class="text-sm text-gray-950"> Balance </label>
      <input
          type="text"
          id="balance"
          class="text-sm p-2 border border-solid focus:outline-none"
          name="balance"
          v-model="user_details.balance"
          />
    </div>
    <div class="flex flex-col gap-1 mt-2">
      <label for="balance" class="text-sm text-gray-950">Loan Balance </label>
      <input
          type="text"
          id="balance"
          class="text-sm p-2 border border-solid focus:outline-none"
          name="balance"
          v-model="user_details.loan_balance"
          />
    </div>
    <div class="flex flex-col gap-1 mt-2">
      <label for="pin" class="text-sm text-gray-950"> Pin </label>
      <input
          type="text"
          id="pin"
          class="text-sm p-2 border border-solid focus:outline-none"
          inputmode="numeric"
          name="pin"
          v-model="user_details.pin"
          />
    </div>
    <div class="flex flex-col gap-1 mt-2 mb-3">
      <label for="amount" class="text-sm text-gray-950"> Account number </label>
      <input
          type="text"
          id="amount"
          class="text-sm p-2 border border-solid focus:outline-none"
          name="acc_no"
          v-model="user_details.acc_no"
          />
    </div>
    <div class="flex flex-col gap-1 mt-2 mb-3">
      <label for="amount" class="text-sm text-gray-950"> Tax code </label>
      <input
          type="text"
          id="amount"
          class="text-sm p-2 border border-solid focus:outline-none"
          name="acc_no"
          v-model="user_details.tax_code"
          />
    </div>
    <div class="flex flex-col gap-1 mt-2 mb-3">
      <label for="amount" class="text-sm text-gray-950"> OTP code </label>
      <input
          type="text"
          id="amount"
          class="text-sm p-2 border border-solid focus:outline-none"
          name="acc_no"
          v-model="user_details.otp_code"
          />
    </div>
    <button
        v-if="!user_details.blocked"
        class="p-2 bg-red-700 rounded-md w-full text-white mb-2"
        @click="banUser"
        >
        Ban user
    </button>

      <button
          v-else
          class="p-2 bg-blue-700 rounded-md w-full text-white mb-2"
          @click="banUser"
          >
          Unban user
      </button>

        <button
            class="p-2 bg-slate-500 rounded-md w-full text-white"
            @click="updateUser"
            >
            Update user
        </button>

          <!-- Ban/Unban Button -->

          <Loader v-if="loading" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Loader from "../../components/Loader.vue";
import { adminAPI, getToken } from "@/axios/api";
import { useRouter, useRoute } from "vue-router";

const loading = ref(false);

const user_details = ref({
  first_name: "",
  last_name: "",
  email: "",
  tel: "",
  pin: "",
  acc_no: "",
  balance: 0,
  loan_balance: 0,
  tax_code: "",
  otp_code: "",
  blocked: false,
});

const router = useRouter();
const route = useRoute();

const getUser = async () => {
  loading.value = true;
  try {
    const { data } = await adminAPI.get(`/users/${route.params.id}`, {
      headers: {
        Authorization: getToken("admin"),
      },
    });

    loading.value = false;
    user_details.value = data;
    // console.log(data);
  } catch (e) {
    loading.value = false;
    console.log(e);
  }
};

getUser();

const updateUser = async () => {
  loading.value = true;
  const token = localStorage.getItem("admintoken");
  try {
    const { data } = await adminAPI.patch(
      `/user/${route.params.id}`,
      {
        ...user_details.value,
      },
      {
        headers: {
          Authorization: getToken("admin"),
        },
      }
    );
    loading.value = false;
    router.push("/admin");
    // console.log(data);
  } catch (e) {
    loading.value = false;
    console.log(e);
  }
};

const banUser = async () => {
  loading.value = true;
  try {
    const { data } = await adminAPI.post(
      `/block/${route.params.id}`,
      {
        blocked: true,
      },
      {
        headers: {
          Authorization: getToken("admin"),
        },
      }
    );
    loading.value = false;
    console.log(data, route.params.id, user_details.value.blocked);
    router.push("/admin");
  } catch (e) {
    loading.value = false;
    console.log(e);
  }
};
</script>
