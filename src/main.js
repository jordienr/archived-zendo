import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vue2TouchEvents from 'vue2-touch-events'
import '@/utils/UIConsole.js'
Vue.use(Vue2TouchEvents)

document.addEventListener('contextmenu', event => event.preventDefault());

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')