<template>
  <div class="min-h-screen bg-white mt-5 lg:px-48 px-4">
    <NavBar />
    <Loader v-if="loading" />
    <div class="mt-20 pl-4" v-else>
      <div
        v-for="(time, index) in timeline"
        class="flex items-center gap-x-2 mb-10 timeline relative"
        key="{index}"
      >
        <div class="dot h-2 w-2 rounded-full"></div>
        <span>
          <h6>{{ time.status }}</h6>
          <p>{{ new Date(time.date).toDateString() }}</p>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NavBar from "../components/NavBar.vue";
import { npcAPI } from "../axios/api";
import Loader from "@/components/Loader.vue";
import { useRoute } from "vue-router";
const loading = ref(true);
const route = useRoute();

const timeline = ref([]);

const track = async () => {
  try {
    const { data } = await npcAPI.get(`/track-order/${route.params.id}`);
    timeline.value = data.timeline;
    // console.log(data);
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};

track();
</script>
