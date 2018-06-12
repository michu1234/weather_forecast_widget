<template>
  <div id="e3" style="max-width: 400px; margin: auto;" class="grey lighten-3">

    <v-toolbar class="mt-3" color="pink">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">Weather Widget</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card>
      <v-container fluid style="min-height: 0;" grid-list-lg>
        <v-layout row wrap>
          <transition-group name="fade">
            <v-flex v-for="(w, index) in weatherData" :key="index" xs12>
              <v-card color="blue-grey lighten-2" class="white--text">
                <v-container fluid grid-list-lg>
                  <v-layout row>
                    <v-flex xs7>
                      <div>
                        <div class="headline">{{w.name | upperCase}}</div>
                        <div>{{w.temp | roundNumber | addCelsius}}</div>
                      </div>
                    </v-flex>
                    <v-flex xs5>
                      <v-card-media :src="w.image" height="125px" contain></v-card-media>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
          </transition-group>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'WeatherWidget',
    data() {
      return {
        city: ['warsaw', 'lodz', 'berlin', 'london', 'new york'],
        weatherData: []
      }
    },
    created() {
      this.fetchWeatherForecast();
      setInterval(this.fetchWeatherForecast, 10000);
    },
    filters: {
      roundNumber(d) {
        return Math.round(parseInt(d));
      },
      upperCase(d) {
        return d.toUpperCase();
      },
      addCelsius(d) {
        return `${d} °C`
      }
    },
    methods: {
      fetchWeatherForecast() {

        let biggestCityIndex = this.city.length,
            threeIndexes = [];

        // get three random numbers
        while (threeIndexes.length < 3) {
          let randomnumber = Math.floor(Math.random() * biggestCityIndex);
          if (threeIndexes.indexOf(randomnumber) > -1) continue;
          threeIndexes[threeIndexes.length] = randomnumber;
        }

        // clear current temperature
        this.weatherData = this.weatherData.slice(3);

        threeIndexes.map((d) => {
          this.$jsonp(

            // fetching data
            `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${this.city[d]}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`
          ).then(json => {

            // fetch weather image 
            let queryDescription = json.query.results.channel.item.description;
            let imageRegex = /(https?:\/\/.*\.(?:png|gif))/i;
            let findUri = imageRegex.exec(queryDescription);
            let imageUri = findUri[1];

            // fetch temperature and convert to celsius
            let tempInFahrenheit = json.query.results.channel.item.condition.temp;
            let tempToCelsius = (tempInFahrenheit - 32) * 5 / 9;
            this.weatherData.push({
              name: this.city[d],
              temp: tempToCelsius,
              image: imageUri
            })

          });
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  span[data-v-186b8d10] {
    width: 100%;
  }
</style>
