<template>
  <div class="w-full bg-white min-h-40 shadow p-4 overflow-x-scroll">
    <table class="w-full overflow-x-scroll">
      <thead class="bg-[#5c1ac32b] p-2 font-semibold text-[#805dca] rounded-t">
        <tr>
          <td class="p-2">S/N</td>
          <td class="p-2">Amount</td>
          <td class="p-2">Type</td>
          <td class="p-2">Sender / receiver</td>
          <td class="p-2">Description</td>
          <td class="p-2">Swift code</td>
          <td class="p-2">Routing no</td>
          <td class="p-2">Date</td>
          <td class="p-2">Status</td>
        </tr>
      </thead>
      <tbody>
        <tr
          class="even:bg-gray-200 odd:bg-white text-sm font-medium"
          v-for="(transactions, index) in trxns"
          :key="index"
        >
          <td class="p-2">{{ index + 1 }}</td>
          <td class="p-2">${{ transactions.amount }}</td>
          <td class="p-2">{{ transactions.type }}</td>
          <td class="p-2">{{ transactions.recipient }}</td>
          <td class="p-2">
            {{ transactions.desc }}
          </td>
          <td class="p-2">
            {{ transactions.swift_code }}
          </td>
          <td class="p-2">
            {{ transactions.routing_no }}
          </td>
          <td class="p-2">
            {{ new Date(transactions.createdAt).toLocaleDateString() }}
          </td>
          <td>
            <button
              class="lg:w-fit w-full p-1 bg-[#00968830] text-sm text-[#009688] rounded font-semibold"
            >
              <!-- {{ transactions.status }} -->
              completed
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Loader v-if="loading" />
  </div>
</template>

<script setup>
import { npcAPI, getToken } from "@/axios/api";
import Loader from "./Loader.vue";
import { ref } from "vue";
const trxns = ref([]);
const loading = ref(true);
const props = defineProps({
  limit: {
    type: [Number, String],
    default: 10,
  },
});

const getDomesticTrxns = async () => {
  try {
    const { data } = await npcAPI.get(
      `/transactions?type=International transfer&limit=${props.limit}`,
      {
        headers: {
          Authorization: getToken("user"),
        },
      }
    );
    trxns.value = data;
    // console.log(data);
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};

getDomesticTrxns();
</script>
