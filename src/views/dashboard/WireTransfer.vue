<template>
  <main class="bg-white min-h-screen">
    <!-- <TopBar /> -->
    <div class="lg:px-lg p-4 flex items-center pt-14">
      <div class="w-full bg-white min-h-40 shadow p-4" v-if="!tx_code">
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-2 h-fit">
          <BaseInput
            label="Amount"
            placeholder="Enter the amount that you want to send"
            type="text"
            inputmode="numeric"
            :show-icon="false"
            v-model="tranferDetails.amount"
          />
          <BaseInput
            label="Account name"
            placeholder="Enter beneficiary account name"
            :show-icon="false"
            type="text"
            v-model="tranferDetails.reciever"
          />
          <BaseInput
            label="Bank name"
            placeholder="Enter beneficiary bank name"
            :show-icon="false"
            type="text"
            v-model="tranferDetails.reciever_bank"
          />
          <BaseInput
            label="Account number"
            placeholder="Enter beneficiary account number"
            :show-icon="false"
            type="text"
            inputmode="numeric"
            v-model="tranferDetails.reciever_acc"
          />
          <BaseInput
            label="Swift code"
            placeholder="Enter swift code"
            :show-icon="false"
            type="text"
            v-model="tranferDetails.swift_code"
          />
          <BaseInput
            label="Routing number"
            placeholder="Enter routing number"
            :show-icon="false"
            type="text"
            inputmode="numeric"
            v-model="tranferDetails.routing_no"
          />
          <Select
            label="Select account type"
            placeholder="Select account type"
            :options="accountTypes"
            v-model="tranferDetails.reciever_acc_type"
          />
          <Select
            label="Select country"
            placeholder="Select country"
            :options="countries"
            v-model="tranferDetails.reciever_country"
          />
          <BaseInput
            label="Description / purpose"
            placeholder="Enter tranfer description"
            :show-icon="false"
            type="text"
            v-model="tranferDetails.desc"
          />
          <Error v-if="err" :err-m-s-g="errMsg" />
          <div class="lg:col-span-2 w-full grid">
            <button
              @click="shadow_tx_code"
              class="lg:w-1/2 w-full h-fit bg-[#f7841f] text-white text-sm p-2 rounded-md place-content-center"
            >
              Transfer
            </button>
          </div>
        </div>
      </div>
      <div class="w-full bg-white min-h-40 shadow p-4" v-else>
        <h2 class="font-semibold mb-6">
          Enter the following details to complete your transfer
        </h2>
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-2 h-fit">
          <BaseInput
            label="Tax clearance code"
            placeholder="Enter tax clearance code"
            :show-icon="false"
            type="text"
            v-model="tranferDetails.tax_code"
          />
          <BaseInput
            label="OTP code"
            placeholder="Enter OTP code"
            :show-icon="false"
            type="text"
            v-model="tranferDetails.otp_code"
          />
          <Error v-if="err" :err-m-s-g="errMsg" />
          <div class="lg:col-span-2 w-full grid">
            <button
              @click="tranfer"
              class="lg:w-1/2 w-full h-fit bg-[#f7841f] text-white text-sm p-2 rounded-md place-content-center"
            >
              Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
    <SuccessModal
      v-if="success"
      @close="success = false"
      msg="Transfer successful"
    />
    <Loader v-if="loading" />
  </main>
</template>

<script setup>
import BaseInput from "@/components/BaseInput.vue";
import TopBar from "@/components/TopBar.vue";
import Select from "@/components/Select.vue";
import { ref } from "vue";

import { npcAPI, getToken } from "@/axios/api";
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";
import SuccessModal from "@/components/SuccessModal.vue";
// import PendingModal from "@/components/PendingModal.vue";

const tranferDetails = ref({
  amount: "",
  reciever_bank: "",
  reciever: "",
  reciever_acc: "",
  reciever_acc_type: "",
  desc: "",
  transaction_type: "debit",
  route: "International transfer",
});
const loading = ref(false);
const tx_code = ref(false);
const err = ref(false);
const success = ref(false);
const errMsg = ref("");

const tranfer = async () => {
  loading.value = true;
  try {
    const { data } = await npcAPI.post(
      "/send-funds",
      {
        ...tranferDetails.value,
      },
      {
        headers: {
          Authorization: getToken("user"),
        },
      }
    );
    success.value = true;
    tranferDetails.value = {};
  } catch (e) {
    err.value = true;
    errMsg.value = e.response.data.msg || e;
    console.log(e);
  } finally {
    loading.value = false;
  }
};

const shadow_tx_code = async () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    tx_code.value = true;
  }, 3000);
};
const accountTypes = ref([
  "Savings account",
  "Checking account",
  "Fixed deposit account",
  "Checking account",
  "Non-resident account",
  "Online banking",
  "Joint account",
  "Domiciliary account",
]);
const countries = ref([]);

const getCountries = async () => {
  try {
    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/flag/images"
    );
    const { data } = await res.json();
    countries.value = data.map((count) => count.name);
  } catch (e) {
    console.log(e);
  }
};
getCountries();
</script>
