<template>
  <main class="p-4 lg:p-6 bg-gray-100 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Transactions</h1>

      <!-- Loading State -->
      <div v-if="loading" class="text-center p-10 bg-white rounded-lg shadow">
        <Loader text="Loading transactions..." />
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
        <p class="font-bold">An error occurred:</p>
        <p>{{ error }}</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="transactions.length === 0" class="text-center p-10 bg-white rounded-lg shadow">
        <p class="text-gray-500">No transactions found for your account.</p>
      </div>

      <!-- Data Table -->
      <div v-else class="bg-white rounded-lg shadow overflow-x-auto">
        <table class="w-full min-w-[720px] text-sm text-left text-gray-700">
          <thead class="text-xs text-gray-800 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">Date</th>
              <th scope="col" class="px-6 py-3">Owner</th>
              <th scope="col" class="px-6 py-3">Type</th>
              <th scope="col" class="px-6 py-3 text-right">Amount</th>
              <th scope="col" class="px-6 py-3">Description</th>
              <th scope="col" class="px-6 py-3">Receiver</th>
              <th scope="col" class="px-6 py-3">Reference</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions" :key="transaction.id" class="bg-white border-b hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                {{ new Date(transaction.createdAt).toLocaleString() }}
              </td>
              <td class="px-6 py-4 font-medium text-gray-900">
                {{ transaction.owner ? `${transaction.owner.first_name} ${transaction.owner.last_name}` : 'N/A' }}
              </td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 font-semibold text-xs leading-tight rounded-full capitalize"
                  :class="transaction.transaction_type === 'credit' ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'">
                  {{ transaction.transaction_type }}
                </span>
              </td>
              <td class="px-6 py-4 font-mono font-semibold text-right"
                  :class="transaction.transaction_type === 'credit' ? 'text-green-600' : 'text-red-600'">
                {{ transaction.transaction_type === 'credit' ? '+' : '-' }} {{ $filters.formatCurrency(transaction.amount) }}
              </td>
              <td class="px-6 py-4">
                {{ transaction.desc || '-' }}
              </td>
              <td class="px-6 py-4 font-mono">
                {{ transaction.reciever }}
              </td>
              <td class="px-6 py-4 font-mono text-gray-500">
                {{ transaction.transaction_ref }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import { adminAPI, getToken } from "@/axios/api";
import Loader from "@/components/Loader.vue";

const transactions = ref([]);
const loading = ref(true);
const error = ref(null);

const getTransactions = async () => {
  loading.value = true;
  error.value = null;
  try {
    const { data } = await adminAPI.get("/transactions", {
      headers: { Authorization: getToken("admin") },
    });
    transactions.value = data;
  } catch (e) {
    console.error("Failed to fetch transactions:", e);
    error.value = e.response?.data?.msg || "Could not load transactions.";
  } finally {
    loading.value = false;
  }
};

onMounted(getTransactions);
</script>
