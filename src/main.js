import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {plugin,defaultConfig} from "@formkit/vue";
import App from './App.vue'
import router from './router'
import config from '../formkit.config';
import { firebaseApp } from './firebase/firebase';
import { VueFire, VueFireAuth } from 'vuefire';
const app = createApp(App)
app.use(plugin,defaultConfig(config));
app.use(createPinia())
app.use(router);
app.use(VueFire,{
    firebaseApp,
    modules:[
        VueFireAuth()
    ]
})


app.mount('#app')
