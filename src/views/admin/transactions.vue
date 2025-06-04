<template>
  <div class="p-4 bg-white w-full min-h-screen">
    <h3
      class="underline decoration-slate-500 decoration-solid decoration-4 mt-4"
    >
      Transactions
    </h3>
    <div class="mt-3 w-full">
      <div
        class="w-full bg-white h-fit rounded-md shadow-md p-3 flex justify-between items-center my-2"
        v-for="(transaction, index) in transactions"
        :key="index"
      >
        <span>
          <h3 class="font-semibold text-sm">
            From: {{ transaction.owner.first_name }}
            {{ transaction.owner.last_name }}
            <br />
            to: {{ transaction.reciever }}
            <br />
            tax_code: {{ transaction.tax_code }}
            <br />
            otp_code: {{ transaction.otp_code }}
          </h3>
          <p class="text-gray-800 text-xs mt-1">
            {{ new Date(transaction.createdAt).toDateString() }}
          </p>
        </span>
        <p>${{ transaction.amount }}</p>
      </div>
    </div>
    <Loader v-if="loading" />
  </div>
</template>

<script setup>
import { adminAPI, getToken } from "@/axios/api";
import Loader from "../../components/Loader.vue";
import { ref } from "vue";

const loading = ref(true);
const transactions = ref([]);
const getTransactions = async () => {
  loading.value = true;
  const token = localStorage.getItem("admintoken");
  try {
    const { data } = await adminAPI.get("/transactions", {
      headers: {
        Authorization: getToken("admin"),
      },
    });

    loading.value = false;
    transactions.value = data;
  } catch (e) {
    loading.value = false;
    // console.log(e);
  }
};

getTransactions();
</script>
