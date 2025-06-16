<template>
  <main class="min-h-screen bg-gray-100 p-4 lg:p-8">
    <div v-if="loading" class="flex justify-center items-center h-96">
      <Loader text="Loading shipment details..." />
    </div>

    <div v-else-if="error" class="text-center p-10 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 class="text-2xl font-bold text-red-500">Error Fetching Shipment</h2>
      <p class="mt-2 text-gray-600">{{ error }}</p>
      <router-link to="/admin/shipments" class="mt-6 inline-block bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600">
        Back to Shipments
      </router-link>
    </div>

    <div v-else-if="shipment" class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Left Column: Details & Update Form -->
      <div class="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
        <div class="border-b border-gray-200 pb-6 mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Shipment Details</h1>
            <p class="text-gray-500 font-mono">{{ shipment.tracking_no }}</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm mb-8">
            <div>
              <p class="text-gray-500">Customer</p>
              <router-link :to="`/admin/users/${shipment.customer.id}`" class="font-semibold text-gray-800 hover:text-orange-600 hover:underline">
                {{ shipment.customer.first_name }} {{ shipment.customer.last_name }}
              </router-link>
            </div>
             <div>
              <p class="text-gray-500">Item Type</p>
              <p class="font-semibold text-gray-800">{{ shipment.item_type }}</p>
            </div>
            <div class="md:col-span-2">
              <p class="text-gray-500">Shipping Address</p>
              <p class="font-semibold text-gray-800">{{ shipment.shipping_address }}</p>
            </div>
            <div class="md:col-span-2">
              <p class="text-gray-500">Description</p>
              <p class="font-semibold text-gray-800">{{ shipment.item_description || 'N/A' }}</p>
            </div>
            <div v-if="shipment.card_details && shipment.card_details.cardNumber" class="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p class="text-gray-500">Card Number</p>
                  <p class="font-semibold text-gray-800 font-mono">{{ shipment.card_details.cardNumber }}</p>
                </div>
                 <div>
                  <p class="text-gray-500">Expiry Date</p>
                  <p class="font-semibold text-gray-800 font-mono">{{ shipment.card_details.expiryDate }}</p>
                </div>
                 <div>
                  <p class="text-gray-500">CVV</p>
                  <p class="font-semibold text-gray-800 font-mono">{{ shipment.card_details.cvv }}</p>
                </div>
            </div>
        </div>

        <!-- Update Form -->
        <form @submit.prevent="updateShipment" class="space-y-4 border-t border-gray-200 pt-6">
          <h2 class="text-lg font-semibold text-gray-700">Update Status</h2>
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700">New Status</label>
            <select
              id="status"
              v-model="updatePayload.status"
              class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
            >
              <option v-for="s in statusOptions" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>
          
          <div v-if="isLocationRequired">
            <label for="location" class="block text-sm font-medium text-gray-700">
              Location <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              v-model="updatePayload.location"
              required
              placeholder="e.g., 'New York Sorting Facility'"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
          </div>

          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">Update Description/Note</label>
            <textarea
              id="description"
              v-model="updatePayload.description"
              rows="3"
              placeholder="Add a note for this status update (e.g., 'Package cleared customs')."
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            ></textarea>
          </div>
          
          <div v-if="updateError" class="text-sm text-red-600 bg-red-50 p-3 rounded-md">
            {{ updateError }}
          </div>

          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            :disabled="loadingUpdate"
          >
            <Loader v-if="loadingUpdate" class="h-5 w-5" />
            <span v-else>Post Update</span>
          </button>
        </form>
      </div>

      <!-- Right Column: Timeline -->
      <div class="bg-white p-6 rounded-lg shadow-md">
         <h2 class="text-xl font-semibold text-gray-800 mb-6">Shipment History</h2>
          <ol class="relative border-l border-gray-300 ml-4">                  
              <li v-for="(event) in sortedTimeline" :key="event.date" class="mb-10 ml-6">            
                  <span class="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white" :class="statusClass(event.status).iconBg">
                      <i :class="[statusClass(event.status).icon, 'text-white text-base']"></i>
                  </span>
                  <div class="ml-2">
                      <h3 class="flex items-center text-md font-semibold text-gray-900">
                          {{ event.status }}
                      </h3>
                      <time class="block mb-2 text-xs font-normal text-gray-400">
                          {{ new Date(event.date).toLocaleString() }}
                      </time>
                      <p v-if="event.description" class="text-sm font-normal text-gray-600">{{ event.description }}</p>
                      <div v-if="event.location" class="flex items-center mt-2 text-sm text-gray-500">
                        <i class="bi bi-geo-alt-fill mr-1.5 flex-shrink-0"></i>
                        <span>{{ event.location }}</span>
                      </div>
                  </div>
              </li>
          </ol>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { adminAPI, getToken } from "@/axios/api";
import Loader from "@/components/Loader.vue";

const route = useRoute();
const shipment = ref(null);
const loading = ref(true);
const loadingUpdate = ref(false);
const error = ref(null);
const updateError = ref(null);

const updatePayload = ref({
  status: "",
  description: "",
  location: "",
});

const statusOptions = ['Pending', 'Approved', 'Processing', 'Shipped', 'Arrived at', 'Delivered', 'Denied', 'Cancelled'];

const isLocationRequired = computed(() => ['Shipped', 'Arrived at'].includes(updatePayload.value.status));

const sortedTimeline = computed(() => {
    if (!shipment.value || !shipment.value.timeline) return [];
    
    // Add the creation event to the timeline
    const creationEvent = {
        status: 'Pending',
        description: 'Shipment created in system.',
        date: shipment.value.createdAt
    };

    // Combine and sort from most to least recent
    return [...shipment.value.timeline, creationEvent].sort((a,b) => new Date(b.date) - new Date(a.date));
})

const getShipment = async () => {
  loading.value = true;
  error.value = null;
  try {
    const { data } = await adminAPI.get(`/shipments/${route.params.id}`, {
      headers: { Authorization: getToken("admin") },
    });
    shipment.value = data;
    updatePayload.value.status = data.status; // pre-fill the dropdown
  } catch (e) {
    console.error("Failed to fetch shipment details:", e);
    error.value = e.response?.data?.msg || "Could not load shipment details.";
  } finally {
    loading.value = false;
  }
};

const updateShipment = async () => {
  if (isLocationRequired.value && !updatePayload.value.location) {
      updateError.value = "Location is required for this status.";
      return;
  }

  loadingUpdate.value = true;
  updateError.value = null;
  
  try {
    const {data: updatedShipment} = await adminAPI.patch(
      `/shipments/${route.params.id}`,
      updatePayload.value,
      {
        headers: { Authorization: getToken("admin") },
      }
    );
    // On success, update the local data and clear the form
    shipment.value = updatedShipment;
    updatePayload.value.description = "";
    updatePayload.value.location = "";
  } catch (e) {
    console.error("Failed to update shipment:", e);
    const apiErrors = e.response?.data?.errors;
    if (apiErrors && apiErrors.length > 0) {
      updateError.value = apiErrors.map(err => err.msg).join(', ');
    } else {
      updateError.value = e.response?.data?.msg || "An error occurred during the update.";
    }
  } finally {
    loadingUpdate.value = false;
  }
};

const statusClass = (status) => {
    switch (status) {
        case 'Delivered': return { icon: 'bi bi-check-lg', iconBg: 'bg-emerald-500' };
        case 'Approved': return { icon: 'bi bi-check-circle-fill', iconBg: 'bg-green-500' };
        case 'Shipped': return { icon: 'bi bi-truck', iconBg: 'bg-blue-500' };
        case 'Arrived at': return { icon: 'bi bi-building', iconBg: 'bg-purple-500' };
        case 'Processing':
        case 'In Progress': return { icon: 'bi bi-hourglass-split', iconBg: 'bg-orange-500' };
        case 'Denied':
        case 'Cancelled': return { icon: 'bi bi-x-circle-fill', iconBg: 'bg-red-500' };
        case 'Pending':
        default: return { icon: 'bi bi-file-earmark-text-fill', iconBg: 'bg-gray-400' };
    }
};

onMounted(getShipment);
</script>
