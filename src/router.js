import Vue from 'vue'
import Router from 'vue-router'
import Weather from './views/WeatherNews.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/weather',
      name: 'weather',
      component: Weather
    }
  ],
  mode: 'history'
})
