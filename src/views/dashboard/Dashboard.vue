<template>
  <main class="w-full bg-gray-100 min-h-screen p-4 lg:p-6">
    <div class="max-w-7xl mx-auto">
      
      <header class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800">Hello, {{ store.userInfo.first_name || 'User' }} 👋</h1>
          <p class="text-gray-500 mt-1">Welcome back to your dashboard.</p>
        </div>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div class="lg:col-span-2 space-y-6">
          
          <div class="relative p-6 rounded-2xl shadow-lg text-white overflow-hidden" style="background: linear-gradient(135deg, #f97316, #ea580c);">
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full opacity-50"></div>
            <div class="absolute -bottom-12 -left-10 w-48 h-48 bg-white/10 rounded-full opacity-50"></div>
            
            <div class="relative z-10">
              <div class="flex justify-between items-center">
                <span class="text-sm uppercase tracking-wider opacity-80">Total Balance</span>
                <button @click="toggleBalance" class="focus:outline-none">
                  <component :is="isBalanceVisible ? EyeIcon : EyeSlashIcon" class="h-6 w-6 opacity-80 hover:opacity-100 transition" />
                </button>
              </div>
              <div class="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
                {{ isBalanceVisible ? $filters.formatCurrency(store.userInfo.balance) : '*****' }}
              </div>
            </div>
          </div>

          <div class="bg-white p-4 md:p-6 rounded-2xl shadow-lg">
            <h2 class="font-semibold text-gray-700 mb-4">Quick Links</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <button @click="showDepositModal = true" class="p-3 md:p-4 rounded-lg hover:bg-gray-100 transition group">
                <div class="w-12 h-12 mx-auto rounded-full bg-orange-100 text-orange-500 flex items-center justify-center transition-transform group-hover:scale-110">
                  <component :is="PlusIcon" class="h-6 w-6" />
                </div>
                <p class="mt-2 text-xs md:text-sm font-medium text-gray-600">Deposit</p>
              </button>
              <router-link to="/dashboard/transfer" class="p-3 md:p-4 rounded-lg hover:bg-gray-100 transition group">
                 <div class="w-12 h-12 mx-auto rounded-full bg-orange-100 text-orange-500 flex items-center justify-center transition-transform group-hover:scale-110">
                  <component :is="PaperAirplaneIcon" class="h-6 w-6" />
                </div>
                <p class="mt-2 text-xs md:text-sm font-medium text-gray-600">Transfer</p>
              </router-link>
              <router-link to="/dashboard/transactions" class="p-3 md:p-4 rounded-lg hover:bg-gray-100 transition group">
                 <div class="w-12 h-12 mx-auto rounded-full bg-orange-100 text-orange-500 flex items-center justify-center transition-transform group-hover:scale-110">
                  <component :is="ArrowsRightLeftIcon" class="h-6 w-6" />
                </div>
                <p class="mt-2 text-xs md:text-sm font-medium text-gray-600">Transactions</p>
              </router-link>
               <router-link to="/dashboard/wire-transfer" class="p-3 md:p-4 rounded-lg hover:bg-gray-100 transition group">
                 <div class="w-12 h-12 mx-auto rounded-full bg-orange-100 text-orange-500 flex items-center justify-center transition-transform group-hover:scale-110">
                  <component :is="WifiIcon" class="h-6 w-6" />
                </div>
                <p class="mt-2 text-xs md:text-sm font-medium text-gray-600">Wire</p>
              </router-link>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="bg-white p-6 rounded-2xl shadow-lg">
             <h2 class="font-semibold text-gray-700 mb-4">Account Summary</h2>
             <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <p class="text-sm text-gray-600">Overdraft Limit</p>
                  <p class="text-sm font-semibold text-gray-800 flex items-center">
                    <img src="@/assets/limitcopy.png" alt="overdraft" class="h-5 inline-block mr-2" />
                    {{ isBalanceVisible ? $filters.formatCurrency(overdraftLimit) : '*****' }}
                  </p>
                </div>
                <div class="flex justify-between items-center">
                  <p class="text-sm text-gray-600">Monthly Expenses</p>
                  <p class="text-sm font-semibold text-red-500 flex items-center">
                    <img src="@/assets/limit.png" alt="expenses" class="h-5 inline-block mr-2" />
                    {{ isBalanceVisible ? $filters.formatCurrency(monthlyExpenses) : '*****' }}
                  </p>
                </div>
             </div>
          </div>
        </div>
      </div>
      
      <div class="mt-8 bg-white p-4 md:p-6 rounded-2xl shadow-lg">
        <h2 class="font-semibold text-gray-700 mb-4">Recent Transactions</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase" style="background-color: #f3e8ff;">
              <tr>
                <th scope="col" class="px-4 py-3 rounded-l-lg">Type</th>
                <th scope="col" class="px-4 py-3">Description</th>
                <th scope="col" class="px-4 py-3 hidden md:table-cell">Date</th>
                <th scope="col" class="px-4 py-3 text-right rounded-r-lg">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="loading">
                <td colspan="4" class="text-center py-8 text-gray-400">
                  <Loader text="Loading transactions..." />
                </td>
              </tr>
              <tr v-else-if="transactions.length === 0">
                <td colspan="4" class="text-center py-8 text-gray-400">No recent transactions found.</td>
              </tr>
              <tr v-for="tx in transactions" :key="tx.id" class="bg-white border-b last:border-b-0">
                <td class="px-4 py-4">
                  <span class="px-2 py-1 font-semibold text-xs leading-tight rounded-full" :class="tx.transaction_type === 'credit' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'">
                    {{ tx.transaction_type }}
                  </span>
                </td>
                <td class="px-4 py-4 font-medium text-gray-900">{{ tx.desc }}</td>
                <td class="px-4 py-4 hidden md:table-cell">{{ new Date(tx.createdAt).toLocaleDateString() }}</td>
                <td class="px-4 py-4 font-medium text-right" :class="tx.transaction_type === 'credit' ? 'text-green-600' : 'text-red-600'">
                  {{ tx.transaction_type === 'credit' ? '+' : '-' }} {{ $filters.formatCurrency(tx.amount) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <DepositModal v-if="showDepositModal" @close="showDepositModal = false" />
  </main>
</template>

<script setup>
import { ref, onMounted, h } from 'vue';
import { useCounterStore } from "@/stores/counter";
import { npcAPI, getToken } from '@/axios/api';
import Loader from '@/components/Loader.vue';
import DepositModal from '@/components/DepositModal.vue';

const EyeIcon = { render: () => h('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor" }, [ h('path', { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M2.036 12.322a1.012 1.012 0 010-.639l4.43-7.58a1.012 1.012 0 011.666 0l4.43 7.58a1.012 1.012 0 010 .639l-4.43 7.58a1.012 1.012 0 01-1.666 0l-4.43-7.58z" }), h('path', { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }) ]) };
const EyeSlashIcon = { render: () => h('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor" }, [ h('path', { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243l-4.243-4.243" }) ]) };
const PlusIcon = { render: () => h('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor" }, [ h('path', { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M12 4.5v15m7.5-7.5h-15" }) ]) };
const PaperAirplaneIcon = { render: () => h('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor" }, [ h('path', { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" }) ]) };
const ArrowsRightLeftIcon = { render: () => h('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor" }, [ h('path', { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M7.5 21L3 16.5m0 0L7.5 12M3 16.5h18m-7.5-14L21 7.5m0 0L16.5 12M21 7.5H3" }) ]) };
const WifiIcon = { render: () => h('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor" }, [ h('path', { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M8.288 15.038a5.25 5.25 0 017.424 0M5.136 12.006a8.25 8.25 0 0113.728 0M2.013 8.982a11.25 11.25 0 0119.974 0M10.5 18a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" }) ]) };

const store = useCounterStore();
const transactions = ref([]);
const loading = ref(true);
const isBalanceVisible = ref(true);
const showDepositModal = ref(false);
const overdraftLimit = ref(500);
const monthlyExpenses = ref(1234.56);

const toggleBalance = () => {
  isBalanceVisible.value = !isBalanceVisible.value;
};

const fetchTransactions = async () => {
  loading.value = true;
  try {
    const { data } = await npcAPI.get('/transactions?limit=5', { headers: { Authorization: getToken("user") } });
    transactions.value = data;
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (!store.userInfo.first_name) {
    store.getUserDetails();
  }
  fetchTransactions();
});
</script>
