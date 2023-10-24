<template>
  <div class="q-pa-md" style="width: 100%;">
      <div id="chart">
          <apexchart type="bar" height="450" :options="chartOptions" :series="series"></apexchart>
      </div>
  </div>
</template>

<script>

export default {
  name: 'MixLineBar',
  props: {
    profits: Array
  },
  // data () {
  //   return {
  //     series: [],
  //     chartOptions: {
  //       stroke: {
  //         width: [0, 4]
  //       },
  //       title: {
  //         text: 'Profits Analysis'
  //       },
  //       dataLabels: {
  //         enabled: true
  //       },
  //       xaxis: {
  //         type: 'datetime'
  //       },
  //       yaxis: [{
  //         title: {
  //           text: 'Profit Value'
  //         }
  //       }]
  //     }
  //   }
  // },
  data () {
    return {
      series: [], // Your data series
      chartOptions: {
        chart: {
          type: 'bar' // Specify the chart type as 'bar'
        },
        dataLabels: {
          enabled: true
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: [
          {
            title: {
              text: 'Profit Value'
            }
          }
        ],
        title: {
          text: 'Profits Analysis'
        }
      }
    }
  },
  created () {
    this.calculateChartData()
  },
  watch: {
    profits: {
      immediate: true,
      handler () {
        this.calculateChartData()
      }
    }
  },
  methods: {
    calculateChartData () {
      const dates = this.profits.map(item => item.date)
      const profitValues = this.profits.map((item, index) => {
        if (index === 0 || item.profit === this.profits[index - 1].profit) {
          return 0
        }
        return parseFloat(item.profit)
      })

      this.chartOptions.labels = dates

      this.series = [{
        name: 'Profit Value',
        type: 'column',
        data: profitValues
      }]
    }
  }
}

</script>
