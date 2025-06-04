<template>
  <div class="lg:px-48 bg-white w-full min-h-screen p-4">
    <h3
      class="underline decoration-slate-500 decoration-solid decoration-4 mt-4"
    >
      Requests
    </h3>
    <Loader v-if="loading" />
    <div class="mt-3 w-full" v-else>
      <RouterLink
        v-for="(request, index) in requests"
        :to="`/admin/request/${request._id}`"
        :key="index"
      >
        <div
          class="w-full bg-white h-fit rounded-md shadow-md p-3 flex justify-between my-2 flex-col"
        >
          <span class="py-3">
            <h3 class="font-semibold text-sm">{{ request.tracking_no }}</h3>
            <p class="text-gray-800 text-xs mt-1">
              {{ request.customer.first_name }} {{ request.customer.last_name }}
            </p>
            <p class="text-gray-800 text-xs mt-1">
              {{ new Date(request.createdAt).toDateString() }}
            </p>
          </span>
          <hr />
          <p class="py-3">{{ request.status }}</p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { adminAPI, getToken } from "@/axios/api";
import { ref } from "vue";
import Loader from "@/components/Loader.vue";

const requests = ref([]);
const loading = ref(true);

const getRequests = async () => {
  try {
    const { data } = await adminAPI.get("/requests", {
      headers: {
        Authorization: getToken("admin"),
      },
    });
    requests.value = data;
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};
getRequests();
</script>
