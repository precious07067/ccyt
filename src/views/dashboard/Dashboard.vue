<template>
  <main class="bg-gray-100 min-h-screen">
    <!-- <TopBar /> -->
    <div class="p-4">
      <div class="w-full lg:w-fit rounded-md flex items-center gap-3 mb-4">
        <div></div>
      </div>
      <div
        class="lg:w-2/5 w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 h-fit rounded-md p-4 text-white flex flex-col justify-between gap-5"
      >
        <div class="flex items-center">
          <h2 class="font-semibold text-white text-sm flex items-center gap-2">
            Hello, {{ store.userInfo.first_name }}
            {{ store.userInfo.last_name }}
            <p class="text-xl">👋</p>
          </h2>
        </div>
        <div>
          <p class="lg:text-base text-xs text-gray-200 lg:mb-2">
            Total balance
          </p>

          <span class="flex w-full justify-between items-center">
            <h2 class="font-bold sm:text-xl" v-if="show_balance">
              {{ $filters.formatCurrency(store.userInfo.balance) }}
            </h2>
            <h2 class="font-bold text-base flex gap-1" v-else>
              <i class="bi bi-asterisk"></i>
              <i class="bi bi-asterisk"></i>
              <i class="bi bi-asterisk"></i>
              <i class="bi bi-asterisk"></i>
              <i class="bi bi-asterisk"></i>
            </h2>
            <i
              class="bi bi-eye-fill text-xl"
              v-if="show_balance"
              @click="show_balance = !show_balance"
            ></i>
            <i
              class="bi bi-eye-slash-fill"
              v-else
              @click="show_balance = !show_balance"
            ></i>
          </span>
        </div>
      </div>
      <div class="lg:w-2/5 h-fit mt-4">
        <h3 class="text-sm font-semibold p-2">Quick links</h3>
        <div class="flex justify-between p-2 w-full">
          <span
            class="flex flex-col items-center gap-2 w-10"
            @click="openDeposit = true"
          >
            <i
              class="bi bi-plus-lg text-amber-600 border border-amber-200 grid place-content-center rounded-lg p-2"
            ></i>
            <p class="text-sm font-medium">Deposit</p>
          </span>
          <router-link to="/dashboard/transfer" class="w-10">
            <span class="flex flex-col items-center gap-2 w-full">
              <i
                class="bi bi-send text-amber-600 border rounded-lg border-amber-200 p-2 grid place-content-center"
              ></i>
              <p class="text-sm font-medium">Transfer</p>
            </span>
          </router-link>
          <router-link to="/dashboard/transactions">
            <span class="flex flex-col items-center gap-2 w-10">
              <i
                class="bi bi-arrow-left-right text-amber-600 border rounded-lg border-amber-200 p-2 grid place-content-center"
              ></i>
              <p class="text-sm font-medium">Transactions</p>
            </span>
          </router-link>
          <router-link to="/dashboard/wire-transfer">
            <span class="flex flex-col items-center gap-2 w-10">
              <i
                class="bi bi-wifi text-amber-600 border rounded-lg p-2 border-amber-200 grid place-content-center"
              ></i>
              <p class="text-sm font-medium">Wire</p>
            </span>
          </router-link>
        </div>
      </div>
      <h2 class="font-semibold text-sm my-3 text-slight-dark">
        Balance summary
      </h2>
      <div
        class="grid lg:grid-cols-4 grid-cols-1 gap-2 w-full overflow-auto whitespace-nowrap"
      >
        <!-- <BalanceCards coin="Total balance" :balance="store.userInfo.balance" /> -->
        <BalanceCards
          coin="Overdraft limit"
          :balance="0"
          :open="show_balance"
        />
        <BalanceCards coin="Expenses" :balance="0" :open="show_balance" />
      </div>
    </div>
    <div class="p-4">
      <div class="bg-white shadow p-4 rounded overflow-x-scroll">
        <h2 class="font-semibold text-sm mb-3 text-slight-dark">
          Recent transactions
        </h2>
        <table class="w-full overflow-x-scroll lg:text-base text-xs">
          <thead
            class="bg-[#5c1ac32b] p-2 font-semibold text-[#805dca] rounded-t"
          >
            <tr>
              <td class="p-2">S/N</td>
              <td class="p-2">Amount</td>
              <td class="p-2">Type</td>
              <td class="p-2">Sender / reciever</td>
              <td class="p-2">Description</td>
              <td class="p-2">Date</td>
              <!-- <td class="p-2">Status</td> -->
            </tr>
          </thead>
          <tbody>
            <tr
              class="even:bg-gray-200 odd:bg-white lg:text-sm text-xs font-medium"
              v-for="(transactions, index) in trxns"
              :key="index"
            >
              <td class="p-2">{{ index + 1 }}</td>
              <td class="p-2">${{ transactions.amount }}</td>
              <td class="p-2">{{ transactions.transaction_type }}</td>
              <td class="p-2">{{ transactions.reciever }}</td>
              <td class="p-2">
                {{ transactions.desc }}
              </td>
              <td class="p-2">
                <p v-if="transactions.date">
                  {{ $filters.formatDate(transactions.date) }}
                </p>
                <p v-else>
                  {{ $filters.formatDate(transactions.createdAt) }}
                </p>
              </td>
              <!-- <td>
                <button
                  class="lg:w-fit w-full p-1 bg-[#00968830] text-sm text-[#009688] rounded font-semibold"
                  v-if="transactions.status == 'Completed'"
                >
                  completed
                </button>
                <button
                  v-else
                  class="lg:w-fit w-full p-1 bg-[#fab0051a] text-sm text-[#fab005] rounded font-semibold"
                >
                  pending
                </button>
              </td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Loader v-if="store.loading" />
    <DepositModal v-if="openDeposit" @close="openDeposit = false" />
  </main>
</template>

<script setup>
import TopBar from "@/components/TopBar.vue";
import BalanceCards from "@/components/BalanceCards.vue";
import DepositModal from "@/components/DepositModal.vue";
import { ref } from "vue";
import { useCounterStore } from "@/stores/counter";
import Loader from "@/components/Loader.vue";
import { npcAPI, getToken } from "@/axios/api";
const store = useCounterStore();

const openDeposit = ref(false);
const show_balance = ref(false);
const trxns = ref([]);
const getTrxns = async () => {
  try {
    const { data } = await npcAPI.get("/transactions?limit=5", {
      headers: {
        Authorization: getToken("user"),
      },
    });
    trxns.value = data;
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

getTrxns();
</script>

<style>
.vc {
  color: #5c1ac32b;
}
</style>
