<template>
  <div
    class="fixed top-0 left-0 z-10 grid h-screen w-screen place-content-center bg-[#00000079] backdrop-blur"
  >
    <div
      class="relative flex h-auto w-96 flex-col items-center justify-center gap-4 rounded-md bg-white p-6 shadow"
    >
      <i
        class="bi bi-x-circle-fill absolute top-[-11px] right-[-9px] cursor-pointer text-xl text-text-black"
        @click="$emit('close')"
      ></i>
      <i class="bi bi-check-circle-fill text-5xl text-green-700"></i>
      <h3 class="text-lg font-semibold text-[#222222] text-center">
        {{ message }}
      </h3>
      
      <div class="w-full space-y-3 mt-2">
        <div class="bg-green-50 border border-green-200 p-4 rounded-md">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium text-gray-600">Transfer To:</span>
            <span class="text-sm font-semibold text-[#222222]">{{ bankName }}</span>
          </div>
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm font-medium text-gray-600">Account:</span>
            <span class="text-sm font-semibold text-[#222222] font-mono">{{ accountNumber }}</span>
          </div>
          <div v-if="amount" class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-600">Amount:</span>
            <span class="text-lg font-bold text-green-600">{{ $filters.formatCurrency(amount) }}</span>
          </div>
        </div>
        
        <div class="text-center text-sm text-gray-600">
          <p>Your transfer has been processed successfully.</p>
          <p v-if="transactionId" class="mt-1">
            Transaction ID: <span class="font-mono font-medium">{{ transactionId }}</span>
          </p>
        </div>
      </div>
      
      <div class="flex gap-3 w-full mt-4">
        <button
          v-if="showDownload"
          @click="downloadReceipt"
          class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Download Receipt
        </button>
        <button
          @click="$emit('close')"
          class="flex-1 bg-green-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message?: string;
  bankName: string;
  accountNumber: string;
  amount?: string | number;
  showDownload?: boolean;
  transactionId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  message: "Transfer Successful!",
  showDownload: true,
});

const emit = defineEmits<{
  close: [];
  downloadReceipt: [];
}>();

const downloadReceipt = () => {
  emit('downloadReceipt');
};
</script>
