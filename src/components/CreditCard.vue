<template>
  <div
    class="w-full max-w-96 aspect-[1.586/1]"
    :style="{ perspective: '1000px' }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleCardClick"
  >
    <div
      class="relative w-full h-full cursor-pointer transition-transform duration-700"
      :style="{
        transformStyle: 'preserve-3d',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }"
    >
      <!-- FRONT SIDE -->
      <div
        class="absolute inset-0 w-full h-full rounded-2xl shadow-2xl p-4 md:p-6 flex flex-col"
        :style="{
          background: `linear-gradient(135deg, ${backgroundColor}, ${adjustBrightness(backgroundColor, -20)})`,
          backfaceVisibility: 'hidden',
        }"
      >
        <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-30"></div>
        <div class="flex justify-end">
          <img
            v-if="logoImage"
            :src="logoImage"
            alt="Card Logo"
            class="h-6 md:h-8 w-auto object-contain"
          />
        </div>
        <div class="flex-1 flex items-center justify-center text-center">
          <div>
            <div class="text-white text-lg md:text-2xl font-semibold uppercase tracking-wide mb-1 md:mb-2">
              {{ name }}
            </div>
            <div class="text-white/70 text-xs md:text-sm uppercase tracking-wide">
              Cardholder Name
            </div>
          </div>
        </div>
        <div class="absolute bottom-4 left-0 right-0">
          <p class="text-white/50 text-xs text-center">
            {{ isMobile ? 'Click to see details' : 'Hover or Click to see details' }}
          </p>
        </div>
        <div class="absolute bottom-1 right-1 w-24 h-24 md:w-32 md:h-32 opacity-10">
          <svg viewBox="0 0 100 100" class="w-full h-full text-white">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="0.5"/>
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" stroke-width="0.5"/>
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="0.5"/>
          </svg>
        </div>
      </div>

      <!-- BACK SIDE -->
      <div
        class="absolute inset-0 w-full h-full rounded-2xl shadow-2xl"
        :style="{
          background: `linear-gradient(135deg, ${backgroundColor}, ${adjustBrightness(backgroundColor, -20)})`,
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
        }"
      >
        <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-30"></div>
        <div class="absolute top-6 left-0 right-0 h-10 md:h-12 bg-black"></div>
        <div class="absolute top-[38%] right-4 left-4 md:right-6 md:left-6">
          <div class="bg-white h-7 md:h-8 rounded flex items-center justify-end px-3 mb-1">
            <span class="text-black font-mono text-xs md:text-sm">{{ cvv }}</span>
          </div>
          <div class="text-white/70 text-[10px] md:text-xs uppercase tracking-wide text-right">
            CVV
          </div>
        </div>
        <div class="absolute top-[65%] left-4 right-4 md:left-6 md:right-6">
          <div class="text-white text-base md:text-lg font-mono tracking-wider mb-2 md:mb-4">
            {{ cardNumber }}
          </div>
          <div class="flex justify-between items-center">
            <div class="text-right ml-auto">
              <div class="text-white text-xs md:text-sm font-mono mb-1">
                {{ expiryDate }}
              </div>
              <div class="text-white/70 text-[10px] md:text-xs uppercase tracking-wide">
                Valid Thru
              </div>
            </div>
          </div>
        </div>
        <div class="absolute bottom-4 left-6 right-6">
          <div v-if="!isMobile" class="text-white/70 text-xs text-center transition-opacity" :class="{'opacity-0': !isHovering}">
            {{ isLocked ? 'View is Locked' : 'Click to lock view' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

defineProps({
  backgroundColor: { type: String, default: '#1a1a2e' },
  logoImage: String,
  name: { type: String, default: 'CARD HOLDER' },
  cardNumber: { type: String, default: '**** **** **** ****' },
  expiryDate: { type: String, default: 'MM/YY' },
  cvv: { type: String, default: '***' }
});

const isHovering = ref(false);
const isLocked = ref(false);
const isFlippedMobile = ref(false);
const screenWidth = ref(window.innerWidth);

const isMobile = computed(() => screenWidth.value < 768);

const isFlipped = computed(() => {
  if (isMobile.value) {
    return isFlippedMobile.value;
  }
  return isHovering.value || isLocked.value;
});

const handleMouseEnter = () => {
  if (!isMobile.value) {
    isHovering.value = true;
  }
};

const handleMouseLeave = () => {
  if (!isMobile.value) {
    isHovering.value = false;
  }
};

const handleCardClick = () => {
  if (isMobile.value) {
    isFlippedMobile.value = !isFlippedMobile.value;
  } else {
    isLocked.value = !isLocked.value;
  }
};

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth);
});

function adjustBrightness(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  let R = (num >> 16) + amt;
  let G = (num >> 8 & 0x00FF) + amt;
  let B = (num & 0x0000FF) + amt;
  R = R < 255 ? (R < 1 ? 0 : R) : 255;
  G = G < 255 ? (G < 1 ? 0 : G) : 255;
  B = B < 255 ? (B < 1 ? 0 : B) : 255;
  return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}
</script>
