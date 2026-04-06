import { createApp } from 'vue'
import router from "@/app/router/router";
import App from "@/app/App.vue"

import "@/shared/styles/style.css";
import "@/shared/styles/_fonts.css";
import "@/shared/styles/_global.scss";
import "@/shared/styles/_variables.css";

import Input from "@/shared/ui/input/Input.vue";
import Button from "@/shared/ui/button/Button.vue";
import UserIcon from "@/presentation/components/userIcon/UserIcon.vue";
import Checkbox from "@/shared/ui/checkbox/Checkbox.vue";

import {loadAuth} from "@/infastracture/stores/authStore";
import {createPinia} from "pinia";

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

loadAuth()

app.component("Input", Input)
app.component("Button", Button)
app.component("UserIcon", UserIcon)
app.component("Checkbox", Checkbox)

app.mount('#app')
