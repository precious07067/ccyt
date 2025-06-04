<template>
  <section class="lg:px-lg pt-12 bg-[#f1f4f6]">
    <div className=" w-full my-4 flex flex-col items-center justify-center">
      <h3 className="mb-2 text-xl text-black">Track your shipment</h3>
      <span className="w-full flex items-center">
        <input
          type="text"
          className="font-space h-10  rounded-l-md px-3 focus:outline-none bg-white focus:border-black focus:border-y focus:border-l w-full"
          placeholder="Enter tracking number"
          inputMode="numeric"
          v-model="tracking_no"
        />

        <button
          className=" bg-[#584E94] h-10 p-1 text-sm  rounded-r-md text-white"
          @click="$router.push(`/tracking/${tracking_no}`)"
        >
          Track
        </button>
      </span>
    </div>
    <h2 class="text-center lg:text-3xl text-xl font-bold text-[#484848] py-4">
      Product and Services
    </h2>
    <div
      class="w-full bg-transparent lg:h-[150px] rounded-md text-black grid lg:grid-cols-6 grid-cols-1 p-4"
    >
      <div
        class="flex items-center justify-center flex-col lg:border-b-0 border-b p-4 lg:border-r gap-3"
      >
        <i class="bi bi-credit-card-2-front text-3xl"></i>
        <h6 class="font-semibold">Credit cards</h6>
      </div>
      <div
        class="flex items-center justify-center flex-col lg:border-b-0 border-b p-4 lg:border-r gap-3"
      >
        <i class="bi bi-bank2 text-3xl"></i>
        <h6 class="font-semibold">Checking</h6>
      </div>
      <div
        class="flex items-center justify-center flex-col lg:border-b-0 border-b p-4 lg:border-r gap-3"
      >
        <i class="bi bi-piggy-bank-fill text-3xl"></i>
        <h6 class="font-semibold">Savings</h6>
      </div>
      <div
        class="flex items-center justify-center flex-col lg:border-b-0 border-b lg:border-r gap-3 p-4"
      >
        <i class="bi bi-houses-fill text-3xl"></i>
        <h6 class="font-semibold">Home loans</h6>
      </div>
      <div
        class="flex items-center justify-center flex-col lg:border-b-0 border-b lg:border-r gap-3 p-4"
      >
        <i class="bi bi-person-down text-3xl"></i>
        <h6 class="font-semibold">Retirement</h6>
      </div>
      <div class="flex items-center justify-center flex-col gap-3 p-4">
        <i class="bi bi-car-front-fill text-3xl"></i>
        <h6 class="font-semibold">Auto loans</h6>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const tracking_no = ref("");
</script>
