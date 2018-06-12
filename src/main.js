import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueJsonp from 'vue-jsonp'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
 
Vue.use(Vuetify)
Vue.use(VueJsonp)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
