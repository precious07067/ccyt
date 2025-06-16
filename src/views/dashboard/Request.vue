<template>
  <main class="lg:px-48 p-4 min-h-screen bg-gray-100">
    <h3 class="text-2xl font-bold my-4">Card Services</h3>
    
    <!-- Request New Card Form -->
    <div class="w-full bg-white shadow-md p-4 rounded-lg mb-8">
      <p class="text-sm text-gray-600 mb-2">
        Enter your address to request for a new CITI debit card.
      </p>
      <input
        type="text"
        placeholder="Enter your full delivery address"
        class="focus:outline-none border w-full border-gray-300 focus:border-orange-500 rounded-md mt-2 text-sm p-2"
        v-model="address"
      />
      <button
        class="mt-3 bg-slate-500 hover:bg-slate-600 text-white p-2 rounded-md text-sm transition-colors"
        @click="requestCard"
      >
        Request Card
      </button>
      <button
        class="mt-3 bg-transparent text-gray-700 hover:bg-gray-200 p-2 rounded-md text-sm ml-3 border border-gray-300 transition-colors"
        @click="getRequests"
      >
        Refresh Requests
      </button>
    </div>

    <!-- Existing Card Requests List -->
    <div class="mt-3 w-full">
       <h4 class="text-xl font-semibold mb-4">Your Card Requests</h4>
      
      <!-- Show this message if there are no requests -->
       <div v-if="!loading && requests.length === 0" class="bg-white p-6 rounded-lg text-center text-gray-500">
        You have no pending or completed card requests.
       </div>
      
      <!-- Loop through requests and display each one with the card component -->
       <div
        v-for="request in requests"
        :key="request.id"
        class="w-full bg-white h-fit rounded-lg shadow-md p-4 flex flex-col lg:flex-row items-center gap-6 my-4"
      >
        <!-- Credit Card Component -->
        <CreditCard 
          :name="cardholderName"
          :card-number="request.cardNumber || '**** **** **** ****'"
          :expiry-date="request.expiryDate || 'MM/YY'"
          :cvv="request.cvv || '***'"
          logo-image="/visa-logo.png" 
        />
        
        <!-- Request Details -->
        <div class="flex-1">
            <h3 class="font-semibold text-lg text-gray-800">
              Tracking Number: {{ request.tracking_no }}
            </h3>
            <p class="text-gray-500 text-sm mt-1">
              Requested on: {{ new Date(request.createdAt).toDateString() }}
            </p>
            <div class="mt-4">
              <span 
                class="text-sm font-medium px-3 py-1 rounded-full"
                :class="{
                  'bg-yellow-100 text-yellow-800': request.status === 'Pending',
                  'bg-blue-100 text-blue-800': request.status === 'In Progress',
                  'bg-green-100 text-green-800': request.status === 'Approved' || request.status === 'Shipped',
                  'bg-red-100 text-red-800': request.status === 'Denied'
                }"
              >
                Status: {{ request.status }}
              </span>
            </div>
             <p v-if="request.status === 'Approved' && request.cardNumber" class="text-green-600 text-xs mt-3">
              Your card has been issued! Click the card to view details.
            </p>
        </div>

      </div>
    </div>

    <Loader v-if="loading" />
    <SuccessModal
      message="Card request submitted successfully!"
      v-if="success"
      @close="success = false"
    />
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Loader from "@/components/Loader.vue";
import { npcAPI, getToken } from "@/axios/api";
import SuccessModal from "@/components/SuccessModal.vue";
import CreditCard from "@/components/CreditCard.vue"; // Import the component

const requests = ref([]);
const user = ref(null);
const address = ref("");
const loading = ref(false);
const success = ref(false);

// A computed property to format the user's name for the card
const cardholderName = computed(() => {
  if (!user.value) return 'CARD HOLDER';
  return `${user.value.first_name} ${user.value.last_name}`.toUpperCase();
});

const getUserDetails = async () => {
    try {
        const { data } = await npcAPI.get("/user-details", {
            headers: { Authorization: getToken("user") },
        });
        user.value = data;
    } catch (e) {
        console.error("Failed to fetch user details:", e);
    }
}

const getRequests = async () => {
  loading.value = true;
  try {
    const { data } = await npcAPI.get("/view-requests", {
      headers: {
        Authorization: getToken("user"),
      },
    });
    // Sort requests by most recent first
    requests.value = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (e) {
    console.error("Failed to fetch requests:", e);
  } finally {
    loading.value = false;
  }
};

const requestCard = async () => {
  if (!address.value) {
    alert("Please enter a delivery address.");
    return;
  }
  loading.value = true;
  try {
    await npcAPI.post(
      "/request-card",
      { address: address.value },
      {
        headers: {
          Authorization: getToken("user"),
        },
      }
    );
    success.value = true;
    address.value = ""; // Clear input after success
    await getRequests(); // Refresh the list to show the new request
  } catch (e) {
    console.error("Failed to request card:", e);
    alert(e.response?.data?.msg || "An error occurred.");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
    getUserDetails();
    getRequests();
});
</script>
