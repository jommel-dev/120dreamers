<template>
    <div class="q-pa-md" style="width: 100%;">
        <div class="row">
          <!-- Small cards -->
          <div class="col col-md-3 q-pa-sm">
            
          </div>
            <!-- Cards -->
            <div class="col col-md-6 q-pa-sm">
                <FullCalendar 
                    :options="calendarOptions"
                >
                    <!-- <template v-slot:eventContent='arg'>
                        <b>{{ arg.event.title }}</b>
                    </template> -->
                </FullCalendar>
            </div>
            <div class="col col-md-3 q-pa-sm"> 
              <div id="chart">
        <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
      </div>
            </div>
            <div class="col col-md-3 q-pa-sm">
                <q-card class="my-card q-mb-sm" flat bordered>
                    <q-item>
                        <q-item-section>
                        <q-item-label>Trade Wins %</q-item-label>
                        <q-item-label caption>
                            Subhead
                        </q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-separator />

                    <q-card-section horizontal class="row q-pa-md">
                        some content of matrix
                        <!-- <q-card-section class="q-pt-xs col">
                            <div class="text-h6 q-mt-sm q-mb-xs">0</div>
                            <div class="text-caption text-grey">
                                Today's Sales
                            </div>
                        </q-card-section>
                        <q-card-section class="q-pt-xs col">
                            <div class="text-h6 q-mt-sm q-mb-xs">0</div>
                            <div class="text-caption text-grey">
                                Clients
                            </div>
                        </q-card-section>
                        <q-card-section class="q-pt-xs col">
                            <div class="text-h6 q-mt-sm q-mb-xs">0</div>
                            <div class="text-caption text-grey">
                                Patients
                            </div>
                        </q-card-section>
                        <q-card-section class="q-pt-xs col">
                            <div class="text-h6 q-mt-sm q-mb-xs">0</div>
                            <div class="text-caption text-grey">
                                Overall Sales
                            </div>
                        </q-card-section> -->
                    </q-card-section>

                    <q-separator />

                    <q-card-actions>
                        <q-btn flat round icon="event" />
                        <q-btn flat>
                        7:30PM
                        </q-btn>
                        <q-btn flat color="primary">
                        Reserve
                        </q-btn>
                    </q-card-actions>
                </q-card>
            </div>
        </div>
    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  name: 'Dashboard',
  components: {
    FullCalendar,
  },
  data(){
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        dayMaxEvents: true,
        initialView: 'dayGridMonth',
        // Date Action Handler
        dateClick: (args) => { return this.handleDateClick(args.event) },
        selectable: true,

        dashCards: [],

        events: [],
        eventContent: 'Show Details',
        series: [{
          name: 'Income',
          type: 'column',
          data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
        }, {
          name: 'Cashflow',
          type: 'column',
          data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
        }, {
          name: 'Revenue',
          type: 'line',
          data: [20, 29, 37, 36, 44, 45, 50, 58]
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
            text: 'XYZ - Stock Analysis (2009 - 2016)',
            align: 'left',
            offsetX: 110
          },
          xaxis: {
            categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
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
              title: {
                text: "Income (thousand crores)",
                style: {
                  color: '#008FFB',
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
              title: {
                text: "Operating Cashflow (thousand crores)",
                style: {
                  color: '#00E396',
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
              title: {
                text: "Revenue (thousand crores)",
                style: {
                  color: '#FEB019',
                }
              }
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
      },
      // activities: [
      //     {
      //         active: false,
      //         title: "Client Visit",
      //         caption: "Check and Inspect for the client",
      //         action: () => { return false }
      //     },
      //     {
      //         active: false,
      //         title: "Booking",
      //         caption: "Proceeds with client order transactions",
      //         action: (val) => { return this.openBookingDetails(val) }
      //     },
      //     {
      //         active: false,
      //         title: "Onsite Activity",
      //         caption: "Vaccines, Inspections, Etc.",
      //         action: () => { return false }
      //     },
      // ],
      eventList: []
    }
  },
  created(){
    this.renderChart();
  },
  methods: {
    renderChart(){

    }
  }
}
</script>
