<template>
    <div class="q-pa-md" style="width: 100%;">
        <div id="chart">
            <apexchart type="line" height="215" :options="chartOptions" :series="series"></apexchart>
        </div>
    </div>
</template>

<script>

export default {
  name: 'MixLineBar',
  data(){
    return {
        series: [{
            name: 'Income',
            type: 'column',
            data: [1.4, 2, 2.5]
        }, {
            name: 'Cashflow',
            type: 'column',
            data: [1.1, 3, 3.1]
        }, {
            name: 'Revenue',
            type: 'line',
            data: [20, 29, 37]
        }],
        chartOptions: {
            chart: {
            height: 350,
            type: 'line',
            stacked: false
            },
            dataLabels: {
            enabled: false
            },
            stroke: {
            width: [1, 1, 4]
            },
            title: {
            text: '',
            align: 'left',
            offsetX: 110
            },
            xaxis: {
            categories: [2009, 2010, 2011],
            },
            yaxis: [
            {
                axisTicks: {
                show: true,
                },
                axisBorder: {
                show: true,
                color: '#008FFB'
                },
                labels: {
                style: {
                    colors: '#008FFB',
                }
                },
                tooltip: {
                enabled: true
                }
            },
            {
                seriesName: 'Income',
                opposite: true,
                axisTicks: {
                show: true,
                },
                axisBorder: {
                show: true,
                color: '#00E396'
                },
                labels: {
                style: {
                    colors: '#00E396',
                }
                },
                
            },
            {
                seriesName: 'Revenue',
                opposite: true,
                axisTicks: {
                show: true,
                },
                axisBorder: {
                show: true,
                color: '#FEB019'
                },
                labels: {
                style: {
                    colors: '#FEB019',
                },
                },
                
            },
            ],
            tooltip: {
            fixed: {
                enabled: true,
                position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                offsetY: 30,
                offsetX: 60
            },
            },
            legend: {
            horizontalAlign: 'left',
            offsetX: 40
            }
        },
    }
  },
}
</script>
