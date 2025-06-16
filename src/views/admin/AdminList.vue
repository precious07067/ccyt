<template>
  <div class="p-4 bg-white w-full min-h-screen outline lg:px-48 pt-16">
    <div class="mt-4 w-full flex justify-end">
      <button
        class="p-2 text-sm bg-amber-600 text-white rounded-md"
        @click="$router.push('/admin/addAdmin')"
      >
        <i class="bi bi-plus"></i>Add Admin
      </button>
    </div>
    <h3
      class="underline decoration-slate-500 decoration-solid decoration-4 mt-4"
    >
      Admins
    </h3>
    <div class="mt-3 w-full">
      <RouterLink
        :to="`/admin/users/${user.id}`"
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
              {{ user.email }}
            </p>
          </span>
          <p>{{ user.role }}</p>
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

const users = ref([]);
const loading = ref(true);

const getUsers = async () => {
  loading.value = true;
  try {
    const { data } = await adminAPI.get("/list_admin", {
      headers: {
        Authorization: getToken("admin"),
      },
    });
    loading.value = false;
    users.value = data;
    // console.log(res.data);
  } catch (e) {
    loading.value = false;
    console.log(e);
  }
};

getUsers();
</script>
