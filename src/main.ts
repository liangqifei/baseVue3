import 'ant-design-vue/dist/reset.css';
import { createApp } from 'vue';
import App from './App.vue';
import { setupLanguage } from './language';
import './mock';
import router from './router';
import { setupStore } from './store';
const app=createApp(App)
app.use(router)
setupStore(app)
setupLanguage(app)
app.mount('#app')



 