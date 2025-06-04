import "./assets/main.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.config.globalProperties.$filters = {
  formatDate(date) {
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    }).format(new Date(date || ""));
  },
  formatCurrency(currency) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "usd",
      maximumFractionDigits: 0,
    }).format(currency);
  },
};

app.use(createPinia());
app.use(router);

app.mount("#app");
