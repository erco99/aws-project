import "./assets/main.css";

import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import router from "./router";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

/*Icons*/
import { aliases, mdi } from "vuetify/lib/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  components,
  directives,
  display: {
    thresholds: {
      xs: 0,
      sm: 340,
      md: 540,
      lg: 800,
      xl: 1280,
    },
  }
});

// -------VUEX STORE---------
const store = createStore({
  state() {
    return {};
  },
  mutations: {},
  getters: {},
  actions: {},
});

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(store);

app.mount("#app");
