<template>
  <main class="min-h-screen bg-gray-100 p-4 lg:p-8">
    <div v-if="loading && !requestDetails" class="flex justify-center items-center h-96">
      <Loader />
    </div>

    <div v-else-if="error" class="text-center p-10 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-red-500">Error Fetching Request</h2>
      <p class="mt-2 text-gray-600">{{ error }}</p>
    </div>

    <div v-else-if="requestDetails" class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <div class="lg:col-span-2">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h1 class="text-2xl font-bold text-gray-800 mb-4">Manage Card Request</h1>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
            <div>
              <p class="text-gray-500">Tracking Number</p>
              <p class="font-semibold text-gray-800 font-mono">{{ requestDetails.tracking_no }}</p>
            </div>
            <div>
              <p class="text-gray-500">Current Status</p>
              <p class="font-semibold text-gray-800">{{ requestDetails.status }}</p>
            </div>
            <div>
              <p class="text-gray-500">Customer</p>
              <p class="font-semibold text-gray-800">{{ requestDetails.customer.first_name }} {{ requestDetails.customer.last_name }}</p>
            </div>
            <div>
              <p class="text-gray-500">Shipping Address</p>
              <p class="font-semibold text-gray-800">{{ requestDetails.address }}</p>
            </div>
          </div>

          <form @submit.prevent="updateRequest" class="space-y-4 border-t border-gray-200 pt-6">
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
            
            <div v-if="isLocationRequired" key="location-input">
              <label for="location" class="block text-sm font-medium text-gray-700">
                Location <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="location"
                v-model="updatePayload.location"
                placeholder="E.g., 'In Transit, New York, NY'"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>

            <div>
              <label for="description" class="block text-sm font-medium text-gray-700">Description (Optional)</label>
              <textarea
                id="description"
                v-model="updatePayload.description"
                rows="3"
                placeholder="Add any relevant notes for this update."
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              ></textarea>
            </div>
            
            <div v-if="apiError" class="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {{ apiError }}
            </div>

            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              :disabled="loadingUpdate"
            >
              <Loader v-if="loadingUpdate" class="h-5 w-5" />
              <span v-else>Update Request</span>
            </button>
          </form>
        </div>
      </div>

      <div class="space-y-8">
        <CreditCard 
          :name="`${requestDetails.customer.first_name} ${requestDetails.customer.last_name}`"
          :card-number="requestDetails.cardNumber"
          :expiry-date="requestDetails.expiryDate"
          :cvv="requestDetails.cvv"
          logo-image="/visa-logo.png"
        />

        <div class="bg-white p-6 rounded-lg shadow-md">
           <h2 class="text-xl font-semibold text-gray-800 mb-6">Request History</h2>
            <ol class="relative border-l border-gray-200">                  
                <li v-for="(event, index) in timelineEvents" :key="index" class="mb-10 ml-6">            
                    <span class="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white" :class="getIconBgColor(event.status)">
                        <component :is="getIcon(event.status)" class="w-4 h-4 text-white" />
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
                          <component :is="MapPinIcon" class="w-4 h-4 mr-1.5 flex-shrink-0" />
                          <span>{{ event.location }}</span>
                        </div>
                    </div>
                </li>
            </ol>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed, h } from "vue";
import { useRoute } from "vue-router";
import { adminAPI, getToken } from "@/axios/api";
import Loader from "@/components/Loader.vue";
import CreditCard from "@/components/CreditCard.vue";

const MapPinIcon = { render: () => h('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor"}, [h('path', { "stroke-linecap":"round", "stroke-linejoin":"round", d:"M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" }), h('path', { "stroke-linecap":"round", "stroke-linejoin":"round", d:"M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" })]) };
const CheckIcon = { render: () => h('svg', { xmlns: "http://www.w3.org/2000/svg", fill:"none", viewBox:"0 0 24 24", "stroke-width":"1.5", stroke:"currentColor" }, [h('path', { "stroke-linecap":"round", "stroke-linejoin":"round", d:"M4.5 12.75l6 6 9-13.5" })]) };
const DocumentTextIcon = { render: () => h('svg', { xmlns:"http://www.w3.org/2000/svg", fill:"none", viewBox:"0 0 24 24", "stroke-width":"1.5", stroke:"currentColor" }, [h('path', { "stroke-linecap":"round", "stroke-linejoin":"round", d:"M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" })]) };
const TruckIcon = { render: () => h('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor" }, [h('path', { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v.958m12.026 11.177a48.554 48.554 0 01-10.026 0" })]) };
const ClockIcon = { render: () => h('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor" }, [h('path', { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" })]) };
const XCircleIcon = { render: () => h('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor" }, [h('path', { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })]) };
const BuildingOfficeIcon = { render: () => h('svg', { xmlns:"http://www.w3.org/2000/svg", fill:"none", viewBox:"0 0 24 24", "stroke-width":"1.5", stroke:"currentColor" }, [h('path', { "stroke-linecap":"round", "stroke-linejoin":"round", d:"M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 11.25h6M9 15.75h6M4.5 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21m-4.5 0h4.5m-4.5 0h-3.75m16.5 0h-3.75m-12.75 0h12.75" })]) };

const route = useRoute();
const loading = ref(false);
const loadingUpdate = ref(false);
const error = ref(null);
const apiError = ref(null);

const requestDetails = ref(null);
const updatePayload = ref({
  status: "",
  description: "",
  location: "",
});

const statusOptions = ['Pending', 'In Progress', 'Approved', 'Shipped', 'Arrived at', 'Delivered', 'Denied'];

const isLocationRequired = computed(() => ['Shipped', 'Arrived at'].includes(updatePayload.value.status));

const timelineEvents = computed(() => {
    if (!requestDetails.value) return [];
    const initialEvent = {
        status: 'Pending',
        description: 'Card request submitted by customer.',
        date: requestDetails.value.createdAt,
    };
    return [initialEvent, ...requestDetails.value.timeline].sort((a, b) => new Date(a.date) - new Date(b.date));
});

const getRequest = async () => {
  loading.value = true;
  error.value = null;
  try {
    const { data } = await adminAPI.get(`/requests/${route.params.id}`, {
      headers: { Authorization: getToken("admin") },
    });
    requestDetails.value = data;
    updatePayload.value.status = data.status;
  } catch (e) {
    error.value = e.response?.data?.msg || "Failed to load request details.";
  } finally {
    loading.value = false;
  }
};

const updateRequest = async () => {
  loadingUpdate.value = true;
  apiError.value = null;
  try {
    await adminAPI.patch(
      `/request/${route.params.id}`,
      updatePayload.value,
      {
        headers: { Authorization: getToken("admin") },
      }
    );
    updatePayload.value.description = "";
    updatePayload.value.location = "";
    await getRequest();
  } catch (e) {
    apiError.value = e.response?.data?.errors?.[0]?.msg || e.response?.data?.msg || "An error occurred during update.";
  } finally {
    loadingUpdate.value = false;
  }
};

const getIcon = (status) => {
    const s = status?.toLowerCase();
    if (s === 'delivered') return CheckIcon;
    if (s === 'shipped') return TruckIcon;
    if (s === 'arrived at') return BuildingOfficeIcon;
    if (s === 'approved') return CheckIcon;
    if (s === 'in progress') return ClockIcon;
    if (s === 'denied') return XCircleIcon;
    return DocumentTextIcon;
};

const getIconBgColor = (status) => {
    const s = status?.toLowerCase();
    if (s === 'delivered') return 'bg-emerald-500';
    if (s === 'approved') return 'bg-green-500';
    if (s === 'shipped') return 'bg-blue-500';
    if (s === 'arrived at') return 'bg-purple-500';
    if (s === 'in progress') return 'bg-orange-500';
    if (s === 'denied') return 'bg-red-500';
    return 'bg-gray-400';
};

onMounted(getRequest);
</script>
