<template>
  <main class="p-4 lg:p-6 bg-gray-100 min-h-screen">
    <div class="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Create New Shipment</h1>

      <form @submit.prevent="createShipment" class="space-y-6">
        <div>
          <label for="customer" class="block text-sm font-medium text-gray-700">Customer</label>
          <select
            id="customer"
            v-model="shipmentDetails.customer_id"
            required
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
          >
            <option disabled value="">Select a customer</option>
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.first_name }} {{ user.last_name }} ({{ user.email }})
            </option>
          </select>
          <p v-if="loadingUsers" class="text-xs text-gray-500 mt-1">Loading customers...</p>
        </div>

        <div>
          <label for="item_type" class="block text-sm font-medium text-gray-700">Item Type</label>
          <input
            type="text"
            id="item_type"
            v-model="shipmentDetails.item_type"
            required
            placeholder="e.g., Debit Card, Urgent Documents"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
           <p class="text-xs text-gray-500 mt-1">Note: Common types are 'Debit Card', 'Cheque Book', 'Account Statement'.</p>
        </div>
        
        <div>
          <label for="address" class="block text-sm font-medium text-gray-700">Shipping Address</label>
          <textarea
            id="address"
            v-model="shipmentDetails.shipping_address"
            required
            rows="3"
            placeholder="Enter the full delivery address"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          ></textarea>
        </div>
        
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Item Description (Optional)</label>
          <input
            type="text"
            id="description"
            v-model="shipmentDetails.item_description"
            placeholder="e.g., Replacement Visa Debit Card"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </div>

        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative">
          <p>{{ error }}</p>
        </div>

        <div class="flex items-center justify-end gap-4 pt-4 border-t">
           <router-link to="/admin/shipments" class="text-sm font-medium text-gray-600 hover:text-gray-900">
            Cancel
          </router-link>
          <button
            type="submit"
            class="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            :disabled="loading"
          >
            <Loader v-if="loading" class="h-5 w-5" />
            <span v-else>Create</span>
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { adminAPI, getToken } from '@/axios/api';
import Loader from '@/components/Loader.vue';

const router = useRouter();
const shipmentDetails = ref({
  customer_id: '',
  item_type: '',
  shipping_address: '',
  item_description: '',
});

const users = ref([]);
const loading = ref(false);
const loadingUsers = ref(true);
const error = ref(null);

const fetchUsers = async () => {
  loadingUsers.value = true;
  try {
    const { data } = await adminAPI.get('/users', {
      headers: { Authorization: getToken('admin') },
    });
    users.value = data;
  } catch (e) {
    console.error('Failed to fetch users:', e);
    error.value = 'Could not load the list of customers.';
  } finally {
    loadingUsers.value = false;
  }
};

const createShipment = async () => {
  loading.value = true;
  error.value = null;
  try {
    const { data: newShipment } = await adminAPI.post('/shipments', shipmentDetails.value, {
      headers: { Authorization: getToken('admin') },
    });
    // Redirect to the new shipment's detail page
    router.push(`/admin/shipments/${newShipment.id}`);
  } catch (e) {
    console.error('Failed to create shipment:', e);
    const apiErrors = e.response?.data?.errors;
    if (apiErrors && apiErrors.length > 0) {
      error.value = apiErrors.map(err => err.msg).join(', ');
    } else {
      error.value = e.response?.data?.msg || 'An error occurred. Please check your input and try again.';
    }
  } finally {
    loading.value = false;
  }
};

onMounted(fetchUsers);
</script>
