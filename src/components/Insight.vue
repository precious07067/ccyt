<template>
  <section class="lg:px-lg p-4 pt-7">
    <h2 class="lg:text-3xl text-2xl font-bold text-center text-slight-dark">
      Insights
    </h2>
    <p class="text-center lg:text-2xl text-xl text-slight-dark mt-4">
      Make today the day you take the next step toward your financial goals.
    </p>
    <div class="grid lg:grid-cols-3 grid-cols-1 mt-4 gap-4">
      <div
        class="flex flex-col gap-3"
        v-for="(blog, index) in news"
        :key="index"
      >
        <img :src="blog.img" />
        <h2 class="text-[#004c97] underline font-semibold text-xl">
          {{ blog.title }}
        </h2>
        <p class="text-base">
          {{ blog.excerpt }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const news = ref([
  {
    img: "https://www.pnc.com/content/dam/pnc-thought-leadership/personal-finance/borrow/pnc_insights_p_does-personal-loan-make-sense-for-you.jpg",
    title: "Does personal loan make sense for you ?",
    excerpt:
      "Personal loans may offer advantages for the financially savvy. However, it’s important to weigh the pros and cons.",
  },
  {
    img: "https://www.pnc.com/content/dam/pnc-thought-leadership/personal-finance/save/pnc_insights_p_what-is-health-savings-account.jpg",
    title: "What is a health savings account ?",
    excerpt:
      "HSAs are an increasingly popular option to save for medical expenses while also receiving tax benefits. But what exactly is an HSA, and how does it work?",
  },
  {
    img: "https://www.pnc.com/content/dam/pnc-thought-leadership/personal-finance/borrow/pnc_insights_personal-can-you-refi-heloc.jpg",
    title: "Can You Refinance A HELOC ?",
    excerpt:
      "HELOC refinance can offer a variety of benefits, such as lower interest rates and monthly payments, but it's important to know the intricacies of the process.",
  },
]);
</script>
