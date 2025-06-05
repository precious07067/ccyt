<template>
  <section className="overflow-x-hidden">
    <Swiper
      :modules="[Autoplay, Navigation]"
      :slidesPerView="1"
      :centeredSlides="true"
      :loop="true"
      :spaceBetween="20"
      :navigation="true"
      :autoplay="{
        delay: 2500,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }"
    >
      <SwiperSlide>
        <div className="hero1 flex justify-center items-center flex-col px-1 rounded-md">
          <p className="text-xl text-gray-300">CITI BANK GROUP</p>
          <h2 className="font-extrabold text-4xl text-center bg-clip-text bg-gradient-to-r from-white to-cyan-500 text-transparent">
            ONLINE BANKING REDEFINED
          </h2>
          <button className="bg-blue-500 w-fit p-3 mt-3 rounded-md">
            <router-link to="/register">Create account</router-link>
          </button>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="hero2 flex justify-center items-center flex-col px-1 rounded-md">
          <h2 className="font-extrabold text-4xl text-center bg-clip-text bg-gradient-to-r from-white to-rose-500 text-transparent">
            RESULT ORIENTED BANKING SERVICES
          </h2>
          <button className="bg-blue-500 w-fit p-3 mt-3 rounded-md">
            <router-link to="/register">Create account</router-link>
          </button>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="hero3 flex justify-center items-center flex-col px-1 rounded-md">
          <h2 className="text-stroke font-bold text-4xl text-center bg-clip-text bg-gradient-to-r from-white to-rose-500 text-transparent">
            SIMPLE. TRANSPARENT. SECURE
          </h2>
          <p className="text-xl text-white text-center">
            Sign up today and experience the convenience of online banking!
          </p>
          <button className="bg-blue-500 w-fit p-3 mt-3 rounded-md">
            <router-link to="/register">Create account</router-link>
          </button>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
</script>

<style scoped>
p {
  color: white;
}
</style>
