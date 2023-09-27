<template>
    <div class="q-pa-md" style="width: 100%;">
        <div id="chart">
            <apexchart type="radialBar" height="250" :options="chartOptions" :series="series"></apexchart>
        </div>
    </div>
</template>

<script>

export default {
  name: 'RoundGradient',
  data(){
    return {
        series: [75],
        chartOptions: {
            chart: {
                height: 150,
                type: 'radialBar',
                toolbar: {
                show: true
                }
            },
            plotOptions: {
                radialBar: {
                startAngle: -135,
                endAngle: 225,
                hollow: {
                    margin: 0,
                    size: '70%',
                    background: '#fff',
                    image: undefined,
                    imageOffsetX: 0,
                    imageOffsetY: 0,
                    position: 'front',
                    dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 0,
                    blur: 4,
                    opacity: 0.24
                    }
                },
                track: {
                    background: '#fff',
                    strokeWidth: '67%',
                    margin: 0, // margin is in pixels
                    dropShadow: {
                    enabled: true,
                    top: -3,
                    left: 0,
                    blur: 4,
                    opacity: 0.35
                    }
                },
            
                dataLabels: {
                    show: true,
                    name: {
                        offsetY: -10,
                        show: true,
                        color: '#888',
                        fontSize: '10px'
                    },
                    value: {
                    formatter: function(val) {
                        return parseInt(val);
                    },
                    color: '#111',
                    fontSize: '24px',
                    show: true,
                    }
                }
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: ['#ABE5A1'],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
                }
            },
            stroke: {
                lineCap: 'round'
            },
            labels: ['Percent'],
        },
    }
  },
}
</script>
