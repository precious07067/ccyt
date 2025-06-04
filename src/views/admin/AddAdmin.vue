<template>
  <div class="p-4 pt-16">
    <h2 class="font-semibold flex items-center gap-x-1">
      <i class="bi bi-person-lines-fill text-lg"></i> Admin details
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
      <label for="phone_number" class="text-sm text-gray-950"> Email </label>
      <input
        type="text"
        id="phone_number"
        class="text-sm p-2 border border-solid focus:outline-none"
        name="tel"
        v-model="user_details.email"
      />
    </div>
    <div class="flex flex-col gap-1 my-2">
      <label for="balance" class="text-sm text-gray-950"> Password </label>
      <input
        type="password"
        id="balance"
        class="text-sm p-2 border border-solid focus:outline-none"
        name="password"
        v-model="user_details.password"
      />
    </div>
    <div class="flex flex-col gap-1 my-2">
      <label for="role" class="text-sm text-gray-950"> Role </label>
      <select
        name="role"
        id="role"
        class="text-sm p-2 border border-solid focus:outline-none"
        v-model="user_details.role"
      >
        <option value="" disabled>Select admin role</option>
        <option>Admin</option>
        <option>Super Admin</option>
      </select>
      <!-- <input
        type="password"
        id="balance"
        class="text-sm p-2 border border-solid focus:outline-none"
        name="password"
      /> -->
    </div>

    <button
      class="p-2 bg-slate-500 rounded-md w-full text-white"
      @click="updateUser"
    >
      Add admin
    </button>
    <Loader v-if="loading" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Loader from "../../components/Loader.vue";
import { adminAPI, getToken } from "@/axios/api";
import { useRouter, useRoute } from "vue-router";
// import { getToken } from "@/axios/api";
const loading = ref(false);

const user_details = ref({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  role: "",
});

const router = useRouter();
const route = useRoute();

const updateUser = async () => {
  loading.value = true;
  const token = localStorage.getItem("admintoken");
  try {
    const { data } = await adminAPI.post(
      `/register`,
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
    router.push("/admin/adminList");
    // console.log(data);
  } catch (e) {
    loading.value = false;
    console.log(e);
  }
};
</script>
