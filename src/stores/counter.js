import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { npcAPI, getToken } from "@/axios/api";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  // const userInfo = ref({});
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }
  const loading = ref(true);
  const userInfo = ref({
    expenses: {
      totalAmount: 0,
    },
  });

  const getUserDetails = async () => {
    loading.value = true;
    try {
      const { data } = await npcAPI.get(`/user-details`, {
        headers: {
          Authorization: getToken("user"),
        },
      });
      console.log(data);
      userInfo.value = data;
      loading.value = false;
    } catch (error) {
      // router.push("/signin");
      console.log(error);
      loading.value = false;
    }
  };

  return { count, userInfo, increment, loading, getUserDetails };
});
