<template>
  <div
    class="fixed top-0 left-0 z-10 grid h-screen w-screen place-content-center bg-[#00000079] font-inter backdrop-blur"
  >
    <div class="lg:w-[500px] w-full h-fit bg-white p-4 rounded-md relative">
      <h2 class="text-base font-semibold text-slight-dark">Banking details</h2>
      <i
        class="bi bi-x-circle-fill absolute top-[-11px] right-[-9px] cursor-pointer text-xl text-text-black"
        @click="$emit('close')"
      ></i>
      <div class="grid lg:grid-cols-2 grid-cols-1 mt-4 gap-4">
        <span class="flex items-center">
          <BaseInput
            label="Bank name"
            :show-icon="false"
            disabled
            v-model="depositDetails.name"
            type="text"
          />
          <button
            class="p-3 bg-amber-600 text-white mt-auto"
            @click="copy(depositDetails.name)"
          >
            <i class="bi bi-copy"></i>
          </button>
        </span>
        <span class="flex items-center">
          <BaseInput
            label="Account number"
            :show-icon="false"
            disabled
            v-model="depositDetails.acc_no"
            type="text"
          />
          <button
            class="p-3 bg-amber-600 text-white mt-auto"
            @click="copy(depositDetails.acc_no)"
          >
            <i class="bi bi-copy"></i>
          </button>
        </span>
        <!-- <span class="flex items-center">
          <BaseInput
            label="Routing number"
            :show-icon="false"
            disabled
            v-model="depositDetails.routing_no"
            type="text"
          />
          <button
            class="p-3 bg-Lightblue text-white mt-auto"
            @click="copy(depositDetails.routing_no)"
          >
            <i class="bi bi-copy"></i>
          </button>
        </span> -->
        <!-- <span class="flex items-center">
          <BaseInput
            label="Swift code"
            :show-icon="false"
            disabled
            v-model="depositDetails.swift_code"
            type="text"
          />
          <button
            class="p-3 bg-Lightblue text-white mt-auto"
            @click="copy(depositDetails.swift_code)"
          >
            <i class="bi bi-copy"></i>
          </button>
        </span> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseInput from "./BaseInput.vue";
import { useCounterStore } from "@/stores/counter";
const store = useCounterStore();

const depositDetails = ref({
  name: "Citi Bank",
  acc_no: store.userInfo.acc_no
});

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    console.log(e);
  }
}
</script>
