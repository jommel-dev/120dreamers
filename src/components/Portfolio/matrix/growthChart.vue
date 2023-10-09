<template>
  <div class="q-pa-md" style="width: 100%;">
    <div id="growthChart" style="width: 100%; height: 450px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'MixLineBar',
  props: {
    growthValues: Array
  },
  data () {
    return {
      growthTrades: [],
      chartOptions: null
    }
  },
  computed: {
    growthTimeData () {
      return this.growthTrades.map(item => item.date)
    },
    growthPercentageData () {
      return this.growthTrades.map(item => parseFloat(item.growth))
    }
  },
  watch: {
    // growthValues(newVal){
    //   console.log(newVal)
    // }
    growthValues: {
      immediate: true,
      async handler (newVal) {
        if (newVal && newVal.length) {
          this.growthTrades = newVal
          this.createChartOptions()
          await this.$nextTick()
          this.init()
        }
      }
    }
  },
  methods: {
    createChartOptions () {
      this.chartOptions = {
      // ... other chart configurations ...

        xAxis: [
          {
            type: 'category',
            data: this.growthTimeData,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Growth'
          // ... other yAxis properties ...
          },
          {
            type: 'value',
            name: 'Equity Growth'
          // ... other yAxis properties ...
          }
        ],
        series: [
          {
            name: 'Evaporation',
            type: 'bar',
            yAxisIndex: 0,
            // ... other series properties ...
            data: [/* ... data ... */]
          },
          {
            name: 'Growth',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %'
              }
            },
            data: this.growthPercentageData
          }
        // ... other series configurations ...
        ]
      }
    },
    init () {
      const chartDom = document.getElementById('growthChart')
      if (chartDom) {
        const myChart = echarts.init(chartDom)
        this.chartOptions && myChart.setOption(this.chartOptions)
      } else {
        console.error('DOM element not available')
      }
    }
  }
}
</script>
