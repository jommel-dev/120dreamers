<template>
  <div class="q-pa-md" style="width: 100%;">
      <div id="chart">
          <apexchart type="line" height="450" :options="chartOptions" :series="series"></apexchart>
      </div>
  </div>
</template>

<script>

export default {
  name: 'MixLineBar',
  props: {
    balances: Array
  },
  data () {
    return {
      series: [],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line'
        },
        stroke: {
          width: [0, 4]
        },
        title: {
          text: 'Balance Analysis'
        },
        dataLabels: {
          enabled: true
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: [{
          title: {
            text: 'Balance Value'
          }
        }]
      }
    }
  },
  created () {
    this.updateChartData()
  },
  watch: {
    balances: {
      immediate: true,
      handler () {
        this.updateChartData()
      }
    }
  },
  methods: {
    updateChartData () {
      const dates = this.balances.map(item => item.date)
      const balanceValues = this.balances.map(item => item.balance)

      this.chartOptions.labels = dates

      this.series = [{
        name: 'Balance Value',
        type: 'column',
        data: balanceValues
      }]
    }
  }
}

</script>
