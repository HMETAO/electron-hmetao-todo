import {createApp} from 'vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/css/globel.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import mitt from 'mitt'
import pinia from "@/pinia";
import router from "./router";

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
const Mit = mitt()
declare module 'vue' {
    export interface ComponentCustomProperties {
        $bus: typeof Mit
    }
}
app.config.globalProperties.$bus = Mit

app.use(pinia)
app.use(router)
app.mount('#app')

