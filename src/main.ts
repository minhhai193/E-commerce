import { createApp } from "vue";
import { toastContainers } from "vue3-toastify";
import "@fortawesome/fontawesome-free/css/all.css";
import "vue3-toastify/dist/index.css";
import "./style.css";
import router from "@/router";
import { createPinia } from "pinia";
import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

app.component("ToastContainer", toastContainers);
app.use(pinia);
app.use(router);
app.mount("#app");
