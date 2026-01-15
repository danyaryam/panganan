import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toast-notification'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/css/main.css'

createApp(App)
    .use(router)
    .use(Toast)
    .mount('#app')
