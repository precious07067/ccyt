<template>
  <main class="bg-gray-300 min-h-screen">
    <div class="lg:px-lg p-4 flex items-center pt-14">
      <!-- Initial transfer form -->
      <div class="w-full bg-white min-h-40 shadow p-4" v-if="!tx_code && !vat_code && !otp_code">
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-2 h-fit">
          <BaseInput
              label="Amount"
              placeholder="Enter the amount that you want to send"
              type="text"
              inputmode="numeric"
              :show-icon="false"
              v-model="transferDetails.amount"
          />
          <BaseInput
              label="Account name"
              placeholder="Enter beneficiary account name"
              :show-icon="false"
              type="text"
              v-model="transferDetails.receiver_name"
          />
          <BaseInput
              label="Bank name"
              placeholder="Enter beneficiary bank name"
              :show-icon="false"
              type="text"
              v-model="transferDetails.receiver_bank"
          />
          <BaseInput
              label="Account number"
              placeholder="Enter beneficiary account number"
              :show-icon="false"
              type="text"
              inputmode="numeric"
              v-model="transferDetails.reciever"
          />
          <Select
              label="Select account type"
              placeholder="Select account type"
              :options="accountTypes"
              v-model="transferDetails.receiver_acc_type"
          />
          <BaseInput
              label="Description / purpose"
              placeholder="Enter transfer description"
              :show-icon="false"
              type="text"
              v-model="transferDetails.desc"
          />
          <Error v-if="err" :err-m-s-g="errMsg" />
          <div class="lg:col-span-2 w-full grid">
            <button
                @click="startTransferProcess"
                class="lg:w-1/2 w-full h-fit bg-[#f7841f] text-white text-sm p-2 rounded-md place-content-center"
            >
              Transfer
            </button>
          </div>
        </div>
      </div>

      <!-- Tax clearance code form -->
      <div class="w-full bg-white min-h-40 shadow p-4" v-else-if="tx_code && !vat_code && !otp_code">
        <h2 class="font-semibold mb-6">
          Enter the following details to complete your transfer
        </h2>
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-2 h-fit">
          <BaseInput
              label="Tax clearance code"
              placeholder="Enter tax clearance code"
              :show-icon="false"
              type="text"
              v-model="transferDetails.tax_code"
          />
          <Error v-if="err" :err-m-s-g="errMsg" />
          <div class="lg:col-span-2 w-full grid">
            <button
                @click="validateTaxCode"
                class="lg:w-1/2 w-full h-fit bg-[#f7841f] text-white text-sm p-2 rounded-md place-content-center"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      <!-- VAT code form -->
      <div class="w-full bg-white min-h-40 shadow p-4" v-else-if="vat_code && !otp_code">
        <h2 class="font-semibold mb-6">
          Enter the following details to complete your transfer
        </h2>
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-2 h-fit">
          <BaseInput
              label="VAT code"
              placeholder="Enter VAT code"
              :show-icon="false"
              type="text"
              v-model="transferDetails.vat_code"
          />
          <Error v-if="err" :err-m-s-g="errMsg" />
          <div class="lg:col-span-2 w-full grid">
            <button
                @click="validateVatCode"
                class="lg:w-1/2 w-full h-fit bg-[#f7841f] text-white text-sm p-2 rounded-md place-content-center"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      <!-- OTP code form -->
      <div class="w-full bg-white min-h-40 shadow p-4" v-else-if="otp_code">
        <h2 class="font-semibold mb-6">
          Enter the following details to complete your transfer
        </h2>
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-2 h-fit">
          <BaseInput
              label="OTP code"
              placeholder="Enter OTP code"
              :show-icon="false"
              type="text"
              v-model="transferDetails.last_code"
          />
          <Error v-if="err" :err-m-s-g="errMsg" />
          <div class="lg:col-span-2 w-full grid">
            <button
                @click="validateOtpAndTransfer"
                class="lg:w-1/2 w-full h-fit bg-[#f7841f] text-white text-sm p-2 rounded-md place-content-center"
            >
              Complete Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
    <SuccessModal
        v-if="success"
        @close="success = false"
        message="Your transfer is successful"
        :bank-name="transferDetails.receiver_bank"
        :amount="transferDetails.amount"
        :showDownload="false"
        :account-number="transferDetails.reciever"
    />
    <Loader v-if="loading" />
  </main>
</template>

<script setup>
import BaseInput from "@/components/BaseInput.vue";
import Select from "@/components/Select.vue";
import { ref } from "vue";
import { npcAPI, getToken } from "@/axios/api";
import Error from "@/components/Error.vue";
import Loader from "@/components/Loader.vue";
import SuccessModal from "@/components/TransferSuccessModal.vue";

const transferDetails = ref({
  amount: "",
  receiver_bank: "",
  receiver_name: "",
  reciever: "",
  receiver_acc_type: "",
  desc: "",
  tax_code: "",
  last_code: "",
  vat_code: "",
  transaction_type: "debit",
  route: "inter-bank",
});

const loading = ref(false);
const tx_code = ref(false);
const vat_code = ref(false);
const otp_code = ref(false);
const err = ref(false);
const success = ref(false);
const errMsg = ref("");

/**
 * A generic function to validate a code against the backend.
 * @param {string} codeType - The type of code being validated ('tax_code', 'vat_code', 'last_code').
 * @param {string} codeValue - The code entered by the user.
 * @returns {Promise<boolean>} - True if valid, false otherwise.
 */
const validateCode = async (codeType, codeValue) => {
  if (!codeValue) {
    err.value = true;
    errMsg.value = "Code cannot be empty.";
    return false;
  }

  loading.value = true;
  err.value = false;
  errMsg.value = "";

  try {
    await npcAPI.post(
      "/validate",
      {
        type: codeType,
        code: codeValue,
      },
      {
        headers: {
          Authorization: getToken("user"),
        },
      }
    );
    // If the API call succeeds (doesn't throw an error), the code is valid.
    return true;
  } catch (e) {
    err.value = true;
    errMsg.value = e.response?.data?.msg || "Invalid Code. Please try again.";
    console.error(e);
    return false;
  } finally {
    loading.value = false;
  }
};

// Step 1: Kicks off the process, showing the first code input form.
const startTransferProcess = () => {
  // Basic validation before starting the code entry process
  if (!transferDetails.value.amount || !transferDetails.value.reciever || !transferDetails.value.receiver_bank) {
    err.value = true;
    errMsg.value = "Please fill in all required transfer details.";
    return;
  }
  err.value = false;
  errMsg.value = "";
  tx_code.value = true;
};

// Step 2: Validates the Tax Code and proceeds to the VAT code form.
const validateTaxCode = async () => {
  const isValid = await validateCode('tax_code', transferDetails.value.tax_code);
  if (isValid) {
    vat_code.value = true; // Proceed to next step
  }
};

// Step 3: Validates the VAT Code and proceeds to the OTP code form.
const validateVatCode = async () => {
  const isValid = await validateCode('vat_code', transferDetails.value.vat_code);
  if (isValid) {
    otp_code.value = true; // Proceed to next step
  }
};

// Step 4: Validates the final OTP code and then executes the transfer.
const validateOtpAndTransfer = async () => {
  const isValid = await validateCode('last_code', transferDetails.value.last_code);
  if (isValid) {
    await executeTransfer();
  }
};

/**
 * The final function that sends all transfer data to the backend.
 * This is only called after all codes have been successfully validated.
 */
const executeTransfer = async () => {
  loading.value = true;
  try {
    await npcAPI.post(
      "/send-funds",
      { ...transferDetails.value },
      {
        headers: {
          Authorization: getToken("user"),
        },
      }
    );
    success.value = true;
    // Reset state after successful transfer
    tx_code.value = false;
    vat_code.value = false;
    otp_code.value = false;
  } catch (e) {
    err.value = true;
    errMsg.value = e.response?.data?.msg || e.response?.data || e.message || "An error occurred during the final transfer.";
    console.log(e);
  } finally {
    loading.value = false;
  }
};

const accountTypes = ref([
  "Savings account",
  "Checking account",
  "Fixed deposit account",
  "Non-resident account",
  "Online banking",
  "Joint account",
  "Domiciliary account",
]);
</script>
