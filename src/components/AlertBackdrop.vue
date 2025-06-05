<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop/overlay -->
    <div class="absolute inset-0 bg-blue-700 opacity-90"></div>
    
    <!-- Modal -->
    <div class="relative bg-white rounded-md shadow-lg w-11/12 max-w-md p-6 z-10">
      <!-- Error icon -->
      <div class="flex justify-center mb-4">
        <div class="w-16 h-16 rounded-full border-4 border-red-600 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      
      <!-- Title -->
      <h2 class="text-2xl font-bold text-center mb-4">{{ title }}</h2>
      
      <!-- Message -->
      <p class="text-gray-800 mb-6">{{ message }}</p>
      
      <!-- OK Button -->
      <div class="flex justify-end">
        <button
          @click="$emit('close')"
          class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Ok
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: "Account Suspended"
  },
  message: {
    type: String,
    default: "Dear Customer, we have discovered suspicious activities on your account. An unauthorized IP address attempted to carry out a transaction on your account. Consequently, your account has been flagged by our risk assessment department. kindly visit our nearest branch with your identification card and utility bill to confirm your identity before it can be reactivated. For more information, kindly contact our online customer care representative"
  }
})

const emit = defineEmits(['close'])
</script>
