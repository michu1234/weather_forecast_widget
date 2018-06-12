<template>
  <div class="weather">
    <h2>Weather Forecast</h2>
    <WeatherWidget/>
  </div>
</template>

<script>
// @ is an alias to /src
import WeatherWidget from '@/components/WeatherWidget.vue'

export default {
  name: 'weather',
  components: {
    WeatherWidget
  }
}
</script>
