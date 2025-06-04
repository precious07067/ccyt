<template>
  <div class="lg:px-48 p-4 min-h-screen">
    <h3 class="decoration-solid decoration-4 my-4">Card Request</h3>
    <div class="w-full bg-white shadow-md p-4">
      <p class="text-sm">
        Enter Your address to request for a credit card <br />
      </p>
      <input
        type="text"
        class="focus:outline-none border w-full border-solid mt-2 text-sm p-2"
        v-model="address"
      />
      <button
        class="mt-3 bg-slate-500 text-white p-2 rounded-md text-sm"
        @click="requestCard"
      >
        Request card
      </button>
      <button
        class="mt-3 bg-transparent text-black p-2 rounded-md text-sm ml-3"
        @click="getRequests"
      >
        View requests
      </button>
    </div>
    <div class="mt-3 w-full">
      <div
        v-for="(request, index) in requests"
        class="w-full bg-white h-fit rounded-md shadow-md p-3 flex justify-between flex-col my-2"
        :key="index"
      >
        <span class="py-3">
          <h3 class="font-semibold text-sm">
            Tracking number {{ request.tracking_no }}
          </h3>
          <p class="text-gray-800 text-xs mt-1">
            requested on {{ new Date(request.createdAt).toDateString() }}
          </p>
        </span>
        <hr />
        <p class="py-3">{{ request.status }}</p>
      </div>
    </div>
    <Loader v-if="loading" />
    <SuccessModal
      msg="Card request successful"
      v-if="success"
      @close="success = false"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Loader from "@/components/Loader.vue";
import { npcAPI, getToken } from "@/axios/api";
import SuccessModal from "@/components/SuccessModal.vue";
const requests = ref([]);
const address = ref("");
const loading = ref(false);
const success = ref(false);

const getRequests = async () => {
  loading.value = true;
  try {
    const { data } = await npcAPI.get("/view-requests", {
      headers: {
        Authorization: getToken("user"),
      },
    });
    requests.value = data;
  } catch (e) {
  } finally {
    loading.value = false;
  }
};

// toast.success("Card request successful");

const requestCard = async () => {
  loading.value = true;
  try {
    const { data } = await npcAPI.post(
      "/request-card",
      {
        address: address.value,
      },
      {
        headers: {
          Authorization: getToken("user"),
        },
      }
    );
    success.value = true;
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};
</script>
