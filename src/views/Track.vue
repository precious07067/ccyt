<template>
  <main class="min-h-screen bg-gray-50">
    <NavBar />

    <div class="container mx-auto max-w-5xl px-4 py-8 pt-24 md:py-12 md:pt-28">
      <!-- Loading State -->
      <div v-if="loading" class="text-center p-10 bg-white rounded-xl shadow-lg">
        <Loader text="Searching for your shipment..." />
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center p-10 bg-white rounded-xl shadow-lg">
        <div class="mx-auto w-16 h-16 flex items-center justify-center bg-red-100 rounded-full">
          <i class="bi bi-x-lg text-3xl text-red-500"></i>
        </div>
        <h2 class="mt-5 text-2xl font-bold text-gray-800">Shipment Not Found</h2>
        <p class="mt-2 text-gray-600 max-w-md mx-auto">{{ error }}</p>
        <router-link to="/" class="mt-8 inline-block bg-orange-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors">
          Return to Home
        </router-link>
      </div>

      <!-- Main Content -->
      <div v-else-if="shipmentDetails" class="space-y-8">
        
        <!-- Status Header Card -->
        <div class="rounded-xl shadow-lg p-6 md:p-8" :class="overallStatus.cardBg">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p class="text-sm font-semibold uppercase tracking-wider" :class="overallStatus.textOpacity">Current Status</p>
              <h1 class="text-3xl md:text-4xl font-bold text-white mt-1">{{ overallStatus.text }}</h1>
              <p class="font-mono mt-3" :class="overallStatus.textOpacity">
                Tracking #{{ shipmentDetails.tracking_no }}
              </p>
            </div>
            <div class="w-20 h-20 flex-shrink-0 flex items-center justify-center bg-white/20 rounded-full">
              <i :class="[overallStatus.icon, 'text-5xl text-white']"></i>
            </div>
          </div>
        </div>
        
        <!-- Progress Bar -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <div class="flex justify-between items-center text-xs md:text-sm font-medium text-gray-500">
            <span>Pending</span>
            <span>Processing</span>
            <span>Shipped</span>
            <span>Delivered</span>
          </div>
          <div class="mt-2 h-2.5 w-full rounded-full bg-gray-200">
            <div class="h-2.5 rounded-full" :class="progressInfo.color" :style="{ width: progressInfo.width }"></div>
          </div>
        </div>

        <!-- Details & Timeline Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Shipment Details (Left/Top) -->
          <div class="lg:col-span-1 space-y-6">
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="font-bold text-lg text-gray-800 mb-4">Item Details</h3>
                <div class="space-y-3 text-sm">
                    <div>
                        <p class="text-gray-500">Item Type</p>
                        <p class="text-gray-800 font-semibold">{{ shipmentDetails.item_type }}</p>
                    </div>
                    <div>
                        <p class="text-gray-500">Description</p>
                        <p class="text-gray-700">{{ shipmentDetails.item_description || 'No description available.' }}</p>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6">
                <h3 class="font-bold text-lg text-gray-800 mb-4">Destination</h3>
                <p class="text-gray-700 text-sm leading-relaxed">{{ shipmentDetails.shipping_address }}</p>
            </div>
          </div>

          <!-- Timeline (Right/Bottom) -->
          <div class="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-800 mb-8">Shipment History</h2>
            <ol class="relative border-l-2 border-gray-200">                  
                <li v-for="(event, index) in sortedTimeline" :key="index" class="mb-10 ml-6">            
                    <span class="absolute flex items-center justify-center w-10 h-10 rounded-full -left-5 ring-4 ring-white" :class="statusClass(event.status).iconBg">
                        <i :class="[statusClass(event.status).icon, 'text-white text-xl']"></i>
                    </span>
                    <div class="bg-gray-50 rounded-lg p-4 ml-4">
                        <h3 class="text-md font-semibold text-gray-900">
                            {{ event.status }}
                        </h3>
                        <time class="block mb-2 text-xs font-normal text-gray-500">
                            {{ new Date(event.date).toLocaleString() }}
                        </time>
                        <p v-if="event.description" class="text-sm font-normal text-gray-700">{{ event.description }}</p>
                        <div v-if="event.location" class="flex items-center mt-2 text-sm text-gray-600 font-medium">
                          <i class="bi bi-geo-alt-fill mr-2 flex-shrink-0 text-gray-400"></i>
                          <span>{{ event.location }}</span>
                        </div>
                    </div>
                </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import NavBar from "../components/NavBar.vue";
import { npcAPI } from "../axios/api";
import Loader from "@/components/Loader.vue";

const route = useRoute();
const loading = ref(true);
const error = ref(null);
const shipmentDetails = ref(null);

const sortedTimeline = computed(() => {
    if (!shipmentDetails.value || !shipmentDetails.value.timeline) return [];
    
    const creationEvent = {
        status: 'Pending',
        description: 'Shipment record created in system.',
        date: shipmentDetails.value.createdAt
    };

    return [...shipmentDetails.value.timeline, creationEvent]
        .sort((a, b) => new Date(b.date) - new Date(a.date));
});

const overallStatus = computed(() => {
    if (!shipmentDetails.value) return {};
    const currentStatus = sortedTimeline.value[0]?.status || 'Pending';
    const statusInfo = statusClass(currentStatus);
    return {
        text: currentStatus,
        ...statusInfo,
    };
});

const progressInfo = computed(() => {
    if (!shipmentDetails.value) return { width: '0%', color: 'bg-gray-200' };
    const status = overallStatus.value.text;
    
    const stages = {
        'Pending': { width: '10%', color: 'bg-yellow-400' },
        'Approved': { width: '25%', color: 'bg-yellow-400' },
        'Processing': { width: '40%', color: 'bg-blue-500' },
        'Shipped': { width: '65%', color: 'bg-blue-500' },
        'Arrived at': { width: '85%', color: 'bg-purple-500' },
        'Delivered': { width: '100%', color: 'bg-green-500' },
        'Denied': { width: '100%', color: 'bg-red-500' },
        'Cancelled': { width: '100%', color: 'bg-red-500' },
    };
    
    return stages[status] || stages['Pending'];
});


const track = async () => {
  try {
    const { data } = await npcAPI.get(`/track-order/${route.params.id}`);
    shipmentDetails.value = data;
  } catch (e) {
    error.value = e.response?.data?.msg || "Could not retrieve tracking details. Please check the tracking number and try again.";
  } finally {
    loading.value = false;
  }
};

const statusClass = (status) => {
    const baseClasses = "text-white/80";
    switch (status) {
        case 'Delivered': return { icon: 'bi bi-check2-circle', cardBg: 'bg-gradient-to-br from-green-500 to-emerald-600', textOpacity: baseClasses };
        case 'Approved': return { icon: 'bi bi-patch-check', cardBg: 'bg-gradient-to-br from-green-500 to-emerald-600', textOpacity: baseClasses };
        case 'Shipped': return { icon: 'bi bi-truck', cardBg: 'bg-gradient-to-br from-blue-500 to-indigo-600', textOpacity: baseClasses };
        case 'Arrived at': return { icon: 'bi bi-building-check', cardBg: 'bg-gradient-to-br from-purple-500 to-violet-600', textOpacity: baseClasses };
        case 'Processing':
        case 'In Progress': return { icon: 'bi bi-hourglass-split', cardBg: 'bg-gradient-to-br from-orange-500 to-amber-600', textOpacity: baseClasses };
        case 'Denied':
        case 'Cancelled': return { icon: 'bi bi-x-octagon', cardBg: 'bg-gradient-to-br from-red-500 to-rose-600', textOpacity: baseClasses };
        case 'Pending':
        default: return { icon: 'bi bi-file-earmark-text', cardBg: 'bg-gradient-to-br from-gray-500 to-slate-600', textOpacity: baseClasses };
    }
};

onMounted(track);
</script>
