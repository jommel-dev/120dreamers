<template>
  <div class="q-pa-md" style="width: 100%;">
      <div id="chart">
          <apexchart type="candlestick" height="450" :options="chartOptions" :series="series"></apexchart>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'CandleStick',
  data () {
    return {
      series: [],
      chartOptions: {
        chart: {
          height: 350,
          type: 'candlestick'
        },
        title: {
          text: '',
          align: 'left'
        },
        tooltip: {
          enabled: true
        },
        xaxis: {
          type: 'category',
          labels: {
            formatter: function (val) {
              return moment(val).format('MMM DD')
            }
          }
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      try {
        const polygonKey = process.env.POLYGON_KEY
        // Other symbols, GOOGL, AMZN, MSFT, AAPL
        // TODO: make it dynamic, pass symbol as prop
        const symbol = 'AAPL'
        const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/2023-09-01/2023-09-30?apiKey=${polygonKey}`)

        const candles = response.data.results
        const formattedData = candles.map(candle => ({
          x: new Date(candle.t), // time
          y: [candle.o, candle.h, candle.l, candle.c] // open, high, low, close
        }))

        this.series = [{
          name: 'candle',
          data: formattedData
        }]
      } catch (error) {
        console.error('Error fetching data from Polygon.io: ', error)
      }
    }
  }
}
</script>
