import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import store from './store'
import router from "./router";
import axios from "./plugins/axios";
import mitt from 'mitt';

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
      xs: 600,
      sm: 960,
      md: 1280,
      lg: 1920,
      xl: 2560,
    },
  }
});

const emitter = mitt();

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(store);

// Axios
app.use(axios);

app.config.globalProperties.emitter = emitter;

app.mount("#app");
