<template>
  <div class="p-4 lg:px-48">
    <h2 class="font-semibold flex items-center gap-x-1">Request details</h2>
    <div class="flex flex-col gap-1 mt-2">
      <label for="first_name" class="text-sm text-gray-950"> Status </label>
      <input
        type="text"
        id="first_name"
        class="text-sm p-2 border border-solid focus:outline-none"
        name="status"
        v-model="request_details.status"
      />
    </div>
    <button
      class="p-2 bg-slate-500 rounded-md w-full text-white mt-3"
      @click="updRequest"
    >
      Update request
    </button>
    <Loader v-if="loading" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { adminAPI, getToken } from "@/axios/api";
import Loader from "@/components/Loader.vue";
import { useRoute } from "vue-router";
import router from "@/router";
const loading = ref(true);
const request_details = ref({
  status: "",
});
const route = useRoute();

const getRequest = async () => {
  const token = localStorage.getItem("admintoken");
  try {
    const { data } = await adminAPI.get(`/requests/${route.params.id}`, {
      headers: {
        Authorization: getToken("admin"),
      },
    });
    request_details.value.status = data[0].status;
    // console.log(data);
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};

const updRequest = async () => {
  loading.value = true;
  try {
    const { data } = await adminAPI.patch(
      `/request/${route.params.id}`,
      { ...request_details.value },
      {
        headers: {
          Authorization: getToken("admin"),
        },
      }
    );
    router.back();
    // request_details.value.status = data[0].status;
    // console.log(data);
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};

getRequest();
</script>
