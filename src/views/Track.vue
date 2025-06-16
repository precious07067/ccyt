<template>
  <main class="min-h-screen bg-gray-100 mt-5 py-10 px-4">
    <NavBar />
    
    <div class="max-w-4xl mx-auto mt-16">
      
      <div v-if="loading" class="text-center p-10 bg-white rounded-lg shadow-md">
        <Loader />
        <p class="mt-4 text-gray-600">Fetching tracking details...</p>
      </div>
      
      <div v-else-if="error" class="text-center p-10 bg-white rounded-lg shadow-md">
         <h2 class="text-2xl font-bold text-red-500">Request Not Found</h2>
         <p class="mt-2 text-gray-600">{{ error }}</p>
         <router-link to="/" class="mt-6 inline-block bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600">
           Go to Home
         </router-link>
      </div>

      <div v-else-if="requestDetails" class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-6 border-b border-gray-200">
            <h1 class="text-2xl font-bold text-gray-800">Tracking Details</h1>
            <p class="text-gray-500">Tracking Number: <strong class="font-mono">{{ requestDetails.tracking_no }}</strong></p>
            <div class="mt-4 p-4 bg-gray-50 rounded-md">
                <h3 class="font-semibold text-gray-700">Shipping Address</h3>
                <p class="text-gray-600">{{ requestDetails.address }}</p>
            </div>
        </div>

        <div class="p-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-6">Request History</h2>
            <ol class="relative border-l border-gray-200 dark:border-gray-700">                  
                <li v-for="(event, index) in timelineEvents" :key="index" class="mb-10 ml-6">            
                    <span class="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white" :class="getIconBgColor(event.status)">
                        <component :is="getIcon(event.status)" class="w-4 h-4 text-white" />
                    </span>
                    <div class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm ml-2">
                        <h3 class="flex items-center mb-1 text-lg font-semibold text-gray-900">
                            {{ event.status }}
                        </h3>
                        <time class="block mb-2 text-sm font-normal leading-none text-gray-400">
                            {{ new Date(event.date).toLocaleString() }}
                        </time>
                        <p v-if="event.description" class="text-base font-normal text-gray-600">{{ event.description }}</p>
                        <div v-if="event.location" class="flex items-center mt-3 text-sm text-gray-500">
                          <component :is="MapPinIcon" class="w-4 h-4 mr-2" />
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
import NavBar from "../components/NavBar.vue";
import { npcAPI } from "../axios/api";
import Loader from "@/components/Loader.vue";

const MapPinIcon = { render: () => h('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor"}, [h('path', { "stroke-linecap":"round", "stroke-linejoin":"round", d:"M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" }), h('path', { "stroke-linecap":"round", "stroke-linejoin":"round", d:"M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" })]) };
const CheckIcon = { render: () => h('svg', { xmlns: "http://www.w3.org/2000/svg", fill:"none", viewBox:"0 0 24 24", "stroke-width":"1.5", stroke:"currentColor" }, [h('path', { "stroke-linecap":"round", "stroke-linejoin":"round", d:"M4.5 12.75l6 6 9-13.5" })]) };
const DocumentTextIcon = { render: () => h('svg', { xmlns:"http://www.w3.org/2000/svg", fill:"none", viewBox:"0 0 24 24", "stroke-width":"1.5", stroke:"currentColor" }, [h('path', { "stroke-linecap":"round", "stroke-linejoin":"round", d:"M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" })]) };
const TruckIcon = { render: () => h('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor" }, [h('path', { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v.958m12.026 11.177a48.554 48.554 0 01-10.026 0" })]) };
const ClockIcon = { render: () => h('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor" }, [h('path', { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" })]) };
const XCircleIcon = { render: () => h('svg', { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor" }, [h('path', { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })]) };

const route = useRoute();
const loading = ref(true);
const error = ref(null);
const requestDetails = ref(null);

const timelineEvents = computed(() => {
    if (!requestDetails.value || !requestDetails.value.timeline) return [];
    
    const initialRequestEvent = {
        status: 'Pending',
        description: 'Your card request has been submitted and is awaiting review.',
        date: requestDetails.value.createdAt,
    };
    
    return [initialRequestEvent, ...requestDetails.value.timeline].sort((a, b) => new Date(a.date) - new Date(b.date));
});


const track = async () => {
  try {
    const { data } = await npcAPI.get(`/track-order/${route.params.id}`);
    requestDetails.value = data;
  } catch (e) {
    error.value = e.response?.data?.msg || "Could not retrieve tracking details.";
    console.log(e);
  } finally {
    loading.value = false;
  }
};

const getIcon = (status) => {
    switch (status?.toLowerCase()) {
        case 'approved': return CheckIcon;
        case 'shipped': return TruckIcon;
        case 'in progress': return ClockIcon;
        case 'denied': return XCircleIcon;
        case 'pending':
        default: return DocumentTextIcon;
    }
};

const getIconBgColor = (status) => {
    switch (status?.toLowerCase()) {
        case 'approved': return 'bg-green-500';
        case 'shipped': return 'bg-blue-500';
        case 'in progress': return 'bg-orange-500';
        case 'denied': return 'bg-red-500';
        case 'pending':
        default: return 'bg-gray-400';
    }
};

onMounted(track);
</script>
