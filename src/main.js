import Vue from 'vue'
import axios from './http'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import vueFilters from './assets/fliters/filters'

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)

for (let key in vueFilters) {
  Vue.filter(key, vueFilters[key])
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
