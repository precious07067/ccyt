<script setup>
import Features from "@/components/Features.vue";
import Header from "@/components/Header.vue";
import Wellness from "@/components/Wellness.vue";
import Impact from "@/components/Impact.vue";
import Insight from "@/components/Insight.vue";
import LandingWrapper from "@/components/LandingWrapper.vue";
import Carousel from "@/components/Carousel.vue";
</script>

<template>
  <LandingWrapper>
    <!-- <Header /> -->
    <Carousel />
    <Features />
    <Wellness />
    <Insight />
    <Impact />
    <!-- <a href="https://wa.me/+18058189894"> -->
    <!--   <div -->
    <!--     class="fixed bottom-[118px] right-[15px] z-50 bg-green-500 h-10 w-10 grid place-content-center rounded-full" -->
    <!--   > -->
    <!--     <i class="bi bi-whatsapp text-2xl text-white"></i> -->
    <!--   </div> -->
    <!-- </a> -->
  </LandingWrapper>
</template>
