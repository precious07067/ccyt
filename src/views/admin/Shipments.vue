<template>
  <main class="p-4 lg:p-6 bg-gray-100 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 class="text-3xl font-bold text-gray-800">Shipment Management</h1>
        <router-link
          to="/admin/shipments/create"
          class="w-full md:w-auto bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center justify-center"
        >
          <i class="bi bi-plus-circle mr-2"></i>
          <span>Create Shipment</span>
        </router-link>
      </div>

      <div v-if="loading" class="text-center p-10 bg-white rounded-lg shadow">
        <Loader text="Loading shipments..." />
      </div>

      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">{{ error }}</span>
      </div>

      <div v-else-if="shipments.length === 0" class="text-center p-10 bg-white rounded-lg shadow">
        <p class="text-gray-500">No shipments found.</p>
      </div>

      <div v-else class="bg-white rounded-lg shadow overflow-x-auto">
        <table class="w-full min-w-[640px] text-sm text-left text-gray-700">
          <thead class="text-xs text-gray-800 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">Tracking No</th>
              <th scope="col" class="px-6 py-3">Customer</th>
              <th scope="col" class="px-6 py-3">Item</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3">Date</th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only">View</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="shipment in shipments" :key="shipment.id" class="bg-white border-b hover:bg-gray-50">
              <td class="px-6 py-4 font-mono font-medium text-gray-900">
                {{ shipment.tracking_no }}
              </td>
              <td class="px-6 py-4">
                {{ shipment?.customer?.first_name }} {{ shipment?.customer?.last_name }}
              </td>
              <td class="px-6 py-4">
                {{ shipment.item_type }}
              </td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 font-semibold text-xs leading-tight rounded-full" :class="statusClass(shipment.status)">
                  {{ shipment.status }}
                </span>
              </td>
              <td class="px-6 py-4">
                {{ new Date(shipment.createdAt).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 text-right">
                <router-link :to="`/admin/shipments/${shipment.id}`" class="font-medium text-orange-600 hover:underline">View</router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { adminAPI, getToken } from '@/axios/api';
import Loader from '@/components/Loader.vue';

const shipments = ref([]);
const loading = ref(true);
const error = ref(null);

const getShipments = async () => {
  loading.value = true;
  error.value = null;
  try {
    const { data } = await adminAPI.get('/shipments', {
      headers: { Authorization: getToken('admin') },
    });
    // Sort by most recent
    shipments.value = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (e) {
    console.error('Failed to fetch shipments:', e);
    error.value = e.response?.data?.msg || 'An error occurred while fetching shipments.';
  } finally {
    loading.value = false;
  }
};

const statusClass = (status) => {
  switch (status) {
    case 'Delivered':
    case 'Approved':
      return 'bg-green-100 text-green-800';
    case 'Shipped':
    case 'Processing':
    case 'In Progress':
      return 'bg-blue-100 text-blue-800';
    case 'Arrived at':
        return 'bg-purple-100 text-purple-800'
    case 'Denied':
    case 'Cancelled':
      return 'bg-red-100 text-red-800';
    case 'Pending':
    default:
      return 'bg-yellow-100 text-yellow-800';
  }
};

onMounted(getShipments);
</script>
