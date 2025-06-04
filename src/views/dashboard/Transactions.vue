<template>
  <main class="bg-gray-300 min-h-screen">
    <!-- <TopBar /> -->
    <div class="lg:px-[50px] p-4 flex pt-14 w-full flex-col">
      <div class="flex bg-white shadow mb-3 p-4 gap-4 lg:flex-row flex-col">
        <Select
          label="No. of transactions to display"
          placeholder="Select transaction limit"
          :options="[5, 10, 15, 20, 25, 50, 100]"
          v-model="limit"
        />
        <Select
          label="Filter transactions"
          placeholder="Select transaction type"
          :options="options"
          icon-class="bi bi-funnel-fill"
          :show-icon="true"
          v-model="filter"
        />
      </div>
      <!-- <WithdrawalTable v-if="filter == 'Withdrawals'" :limit="limit" /> -->
      <DomesticTable v-if="filter == 'Domestic transactions'" :limit="limit" />
      <InternationalTable
        v-if="filter == 'International transactions'"
        :limit="limit"
      />
    </div>
  </main>
</template>

<script setup>
import BaseInput from "@/components/BaseInput.vue";
import TopBar from "@/components/TopBar.vue";
import Select from "@/components/Select.vue";
import { ref } from "vue";
import DomesticTable from "@/components/DomesticTable.vue";
import InternationalTable from "@/components/InternationalTable.vue";

const filter = ref("");
const limit = ref("");

const options = ref(["International transactions", "Domestic transactions"]);
</script>
