import { createPinia } from 'pinia'
const store=createPinia()
export const setupStore=(App)=>{
    App?.use(store)
}