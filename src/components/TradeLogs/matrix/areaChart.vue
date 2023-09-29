<template>
    <div style="width: 100%;">
        <div id="chart">
            <apexchart type="area" height="150" :options="chartOptions" :series="series"></apexchart>
        </div>
    </div>
</template>

<script>

export default {
  name: 'MixLineBar',
  data(){
    return {
        series: [{
            name: "STOCK ABC",
            data: [
                '1033.55',
                '133.55',
                '434.55',
                '4577.55',
            ]
          }],
          chartOptions: {
            chart: {
              type: 'area',
              height: 150,
              zoom: {
                enabled: false
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'straight'
            },
            // subtitle: {
            //   text: 'Price Movements',
            //   align: 'left'
            // },
            labels: ['09/27/2023','09/28/2023','09/29/2023','09/30/2023'],
            xaxis: {
              type: 'datetime',
            },
            yaxis: {
              opposite: false
            },
            legend: {
              horizontalAlign: 'left'
            }
        },
    }
  },
}
</script>
