<template>
  <section className="overflow-x-hidden font-inter">
    <Swiper
      :modules="[Autoplay, Navigation]"
      :slidesPerView="1"
      :centeredSlides="true"
      :loop="true"
      :spaceBetween="20"
      :navigation="true"
      :autoplay="{
        delay: 5000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }"
    >
      <SwiperSlide>
        <div
          className="hero1 p-4 min-h-screen flex flex-col justify-center gap-9 items-center"
        >
          <div className=" lg:w-3/4">
            <h2
              className="leading-normal font-syne text-4xl font-bold mt-4 bg-clip-text bg-gradient-to-r from-white via-[#CACACA] to-[#666161] text-transparent"
            >
              COMFORTABLE MANAGEMENT OF FINANCIAL SERVICES
            </h2>
            <p className=" font-space mt-3 text-base leading-loose">
              OUR TEAM OF PROFESSIONALS WORK WITH EACH CLIENT TO UNDERSTAND
              THEIR UNIQUE NEEDS AND CREATE A CUSTOMIZED PLAN THAT FITS THEIR
              GOAL AND BUDGET, WHETHER YOU ARE LOOKING TO INVEST FOR THE FUTURE
              SAVE FOR A BIG PURCHASE OR MANAGE YOUR DEBT. WE ARE HERE TO HELP
            </p>

            <router-link to="/register">
              <button
                className="bg-[#715952] w-full p-3 mt-3 h-14 font-space lg:w-1/2"
              >
                SIGN UP
              </button>
            </router-link>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className="hero2 p-4 min-h-screen flex flex-col justify-center gap-9 items-center"
        >
          <div className=" lg:w-3/4">
            <h2
              className="leading-normal font-syne text-4xl font-bold mt-4 bg-clip-text bg-gradient-to-r from-white via-[#CACACA] to-[#666161] text-transparent uppercase"
            >
              Financial Inclusion
            </h2>
            <p className=" font-space mt-3 text-base leading-loose uppercase">
              we have a goal to promote financial inclusion by offering services
              to underserved populations. we focus on providing accessible and
              affordable financial products to individuals and businesses that
              have limited access to traditional banking services
            </p>
            <router-link to="/register">
              <button
                className="bg-[#715952] w-full p-3 mt-3 h-14 font-space lg:w-1/2"
              >
                SIGN UP
              </button>
            </router-link>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          className="hero3 p-4 min-h-screen flex flex-col justify-center gap-9 items-center"
        >
          <div className=" lg:w-3/4">
            <h2
              className="leading-normal font-syne text-4xl font-bold mt-4 bg-clip-text bg-gradient-to-r from-white via-[#CACACA] to-[#666161] text-transparent uppercase"
            >
              Corporate Social Responsibility
            </h2>
            <p className=" font-space mt-3 text-base leading-loose uppercase">
              in recent years we have increasingly prioritize corporate social
              responsibility (CSR). we strive to contribute positively to
              society and the environment through philanthropic initiatives,
              ethical investments, sustainability practices, and community
              involvement
            </p>

            <router-link to="/register">
              <button
                className="bg-[#715952] w-full p-3 mt-3 h-14 font-space lg:w-1/2"
              >
                SIGN UP
              </button>
            </router-link>
          </div>
        </div>
      </SwiperSlide>
      <!-- <SwiperSlide>
        <Header />
      </SwiperSlide>
      <SwiperSlide>
        <Header2 />
      </SwiperSlide>
      <SwiperSlide>
        <Header />
      </SwiperSlide> -->
    </Swiper>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Header from "./Header.vue";
import Header2 from "./Header2.vue";
</script>

<style scoped>
p {
  color: white;
}
</style>
