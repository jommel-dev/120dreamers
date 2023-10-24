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
  data () {
    return {
      // series: [{
      //   name: 'Profit Value',
      //   type: 'column',
      //   data: [-2, 3, -6, 2, 1]
      // }], // Your data series
      series: [],
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
        },
        plotOptions: {
          bar: {
            columnWidth: '50%',
            colors: {
              ranges: [
                {
                  from: -Infinity,
                  to: 0,
                  color: '#FF0000' // Red for negative values
                },
                {
                  from: 0,
                  to: Infinity,
                  color: '#00FF00' // Green for positive values
                }
              ]
            }
          }
        }
      }
    }
  },
  created () {
    this.calculateChartData()
    console.log(this.series)
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
