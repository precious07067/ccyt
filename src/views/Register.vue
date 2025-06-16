<template>
  <main class="lg:px-lg py-5 flex flex-col items-center sm:px-4 md:px-4">
    <h3 class="font-bold text-xl text-slight-dark pt-6 text-center">
      Create your account
    </h3>
    <p class="text-slight-dark text-sm font-semibold text-center">
    Let's get you ready for the best financial experience
    </p>
    <form
        class="lg:w-1/2 w-full flex flex-col gap-3 p-4"
        @submit.prevent="submit"
        >
        <BaseInput
            label="First name"
            placeholder="Enter first name"
            :show-icon="false"
            type="text"
            required
            v-model="userDetails.first_name"
            />
        <BaseInput
            label="Last name"
            placeholder="Enter first name"
            :show-icon="false"
            type="text"
            required
            v-model="userDetails.last_name"
            />
        <Select
            label="Gender"
            placeholder="Select your gender"
            :options="genders"
            required
            :show-icon="false"
            v-model="userDetails.gender"
            />
          <BaseInput
              label="Email"
              placeholder="Enter your email"
              :show-icon="false"
              type="email"
              required
              v-model="userDetails.email"
              />
          <BaseInput
              label="Phone number"
              placeholder="Enter your phone number"
              :show-icon="false"
              type="tel"
              required
              v-model="userDetails.tel"
              />
          <BaseInput
              label="Password"
              placeholder="Enter your password"
              :show-icon="false"
              type="password"
              required
              v-model="userDetails.password"
              />
          <BaseInput
              label="Account pin"
              placeholder="Enter your account pin"
              :show-icon="false"
              type="password"
              required
              v-model="userDetails.pin"
              />
          <Select
              label="Country"
              placeholder="Select your country"
              :options="countries"
              required
              :show-icon="false"
              v-model="userDetails.country"
              />
            <BaseInput
                label="State"
                placeholder="Enter your state"
                :show-icon="false"
                type="text"
                required
                v-model="userDetails.state"
                />
            <BaseInput
                label="City"
                placeholder="Enter your city"
                :show-icon="false"
                type="text"
                required
                v-model="userDetails.city"
                />
            <BaseInput
                label="Address"
                placeholder="Enter your address"
                :show-icon="false"
                type="text"
                required
                v-model="userDetails.address"
                />
            <Select
                label="Account type"
                placeholder="Select account type"
                :options="accountTypes"
                required
                :show-icon="false"
                v-model="userDetails.acc_type"
                />
              <Error v-if="err" :errMSG="errMSG" />
              <button class="w-full p-3 rounded-lg border-none bg-[#f7841f] text-white">
                Register
              </button>
    </form>
    <Loader v-if="loading" />
  </main>
</template>

<script setup>
import { ref } from "vue";
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";
import BaseInput from "@/components/BaseInput.vue";
import Select from "@/components/Select.vue";
import { useRoute, useRouter } from "vue-router";
import { npcAPI } from "../axios/api";
const router = useRouter();
const route = useRoute();
const loading = ref(false);
const success = ref(false);
const checked = ref(false);
const err = ref(false);
const errMSG = ref("");
const userDetails = ref({
  ref_by: route.query.ref,
});
const submit = async () => {
  loading.value = true;
  try {
    console.log(userDetails.value);
    const { data } = await npcAPI.post("/register", {
      ...userDetails.value,
    });
    console.log(data)
    localStorage.setItem("token", data.token);
    router.push("/dashboard");
    console.log("Submitted ✅");
  } catch (e) {
    err.value = true;
    errMSG.value = e.response?.data.msg || e.response?.data || e;
  } finally {
    loading.value = false;
  }
};

const genders = ref(["Male", "Female", "Others"]);

const countries = ref([]);

const accountTypes = ref([
  "Savings account",
  "Checking account",
  "Fixed deposit account",
  "Checking account",
  "Non-resident account",
  "Online banking",
  "Joint account",
  "Domiciliary account",
]);

const getCountries = async () => {
  try {
    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/flag/images"
    );
    const { data } = await res.json();
    countries.value = data.map((count) => count.name);
  } catch (e) {
    console.log(e);
  }
};

getCountries();
</script>
