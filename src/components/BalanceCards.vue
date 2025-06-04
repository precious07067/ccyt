<template>
  <div
    class="bg-white h-24 w-full rounded-md p-4 flex flex-col justify-between border border-gray-300"
  >
    <span class="flex items-center justify-between">
      <h4 class="font-bold text-base text-slight-dark" v-if="open">
        {{ $filters.formatCurrency(balance) }}
      </h4>
      <h2 class="font-bold text-sm flex gap-1" v-else>
        <i class="bi bi-asterisk"></i>
        <i class="bi bi-asterisk"></i>
        <i class="bi bi-asterisk"></i>
        <i class="bi bi-asterisk"></i>
        <i class="bi bi-asterisk"></i>
      </h2>
      <img :src="images[coin]" alt="coin" class="h-8" />
    </span>
    <!-- <hr /> -->
    <span class="flex gap-2">
      <h3 class="font-medium text-sm text-gray-500">
        {{ coin }}
      </h3>
    </span>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Loan from "@/assets/loan.png";
// import Total from "@/assets/images/total.png";
import Expenses from "@/assets/spending.png";
defineProps({
  coin: String,
  balance: {
    type: [Number, String],
    required: true,
  },
  open: Boolean,
});

const images = ref({
  "Loan balance": Loan,
  "Overdraft limit": Loan,
  Expenses,
});

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    // copied.value = true;
    // setTimeout(() => {
    //   copied.value = false;
    // }, 3000);
  } catch (e) {
    console.log(e);
  }
}
</script>
