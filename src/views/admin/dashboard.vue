<template>
  <div class="p-4 bg-white w-full min-h-screen outline lg:px-48 pt-16">
    <div class="mt-4">
      <h3 class="text-base font-semibold">Welcome Admin</h3>
    </div>
    <h3
      class="underline decoration-slate-500 decoration-solid decoration-4 mt-4"
    >
      Users
    </h3>
    <p>{{ origin }}/register?ref={{ test }}</p>
    <div class="mt-3 w-full">
      <RouterLink
        :to="`/admin/users/${user._id}`"
        v-for="(user, index) in users"
        :key="index"
      >
        <div
          class="w-full bg-white h-fit rounded-md shadow-md p-3 flex justify-between items-center my-2"
        >
          <span>
            <h3 class="font-semibold text-sm">
              {{ user.first_name }} {{ user.last_name }}
            </h3>
            <p class="text-gray-800 text-xs mt-1">
              {{ user.city }},{{ user.state }} {{ user.country }}
            </p>
          </span>
          <p>${{ user.balance }}</p>
        </div>
      </RouterLink>
    </div>
    <Loader v-if="loading" />
  </div>
</template>

<script setup>
import { adminAPI, getToken } from "@/axios/api";
import { ref } from "vue";
import Loader from "@/components/Loader.vue";
// import { getToken } from "@/axios/api";
import SuccessModal from "@/components/SuccessModal.vue";

const test = ref(localStorage.getItem("ref") ?? "");
const users = ref([]);
const loading = ref(true);
const { origin } = location;

const getUsers = async () => {
  loading.value = true;
  try {
    const { data } = await adminAPI.get("/users", {
      headers: {
        Authorization: getToken("admin"),
      },
    });
    loading.value = false;
    users.value = data;
  } catch (e) {
    loading.value = false;
    console.log(e);
  }
};

getUsers();
</script>
