<template>
    <div class="q-pa-md" style="width: 100%;">
      <div class="row">
        <!-- Small cards -->
        <div
          v-for="(item, index) in dashCards"
          :key="index"
          class="col col-md-3 col-lg-3 q-pa-sm"
        >
            <q-card flat bordered class="my-card q-pa-sm">
              <q-card-section  class="bg-white text-weight-light">
                <div class="text-subtitle2 text-grey-5">{{item.title}} <q-icon name="info" /></div>
                <div class="text-h6" :class="[item.color]">
                  <span class="">{{item.value}}</span>
                  <!-- <q-space /> -->
                  <q-icon class="float-right" :color="item.iconColor" :name="item.icon" size="lg" />
                </div>
              </q-card-section>
            </q-card>
        </div>
      </div>
      <div class="row">
        <!-- Cards -->
        <div class="col col-12 q-pa-md example-row-equal-width">
          <div class="row">
            <div class="col">
            <div>
                <h5>Trading activity</h5>
           </div>
            <div class="col col-md-12 q-pa-sm">
                <q-tabs
                    v-model="tradeActTab"
                    dense
                    align="left"
                    no-caps
                    inline-label
                    :breakpoint="0"
                >

                    <q-tab name="openTrade" icon="scatter_plot" :label="`Open Trades (${trades?.positions?.length})`" />
                    <!-- <q-tab name="openOrder" icon="ads_click" label="Open Orders" /> -->
                    <q-tab name="history" icon="candlestick_chart" :label="`History (${trades?.history?.historyOrders?.length})`" />
                    <!-- <q-tab name="exposure" icon="candlestick_chart" label="Exposure" /> -->
                </q-tabs>

                <q-tab-panels v-model="tradeActTab" animated>
                    <q-tab-panel name="openTrade">
                        <openTradeTable
                        v-if="trades != null"
                        :openTrades="trades.positions"
                        />
                    </q-tab-panel>
                    <q-tab-panel name="openOrder">
                        <openOrderTable />
                    </q-tab-panel>
                    <q-tab-panel name="history">
                        <historyTable
                        v-if="trades != null"
                        :tradeHistory="trades.history.historyOrders"
                        />
                    </q-tab-panel>
                    <q-tab-panel name="exposure">
                        <exposureTable />
                    </q-tab-panel>
                </q-tab-panels>
            </div>
            </div>
            <div class="col calendar">
               <!-- test calendar -->
               <FullCalendar
                :options="calendarOptions"
                :events="eventList"
                >
                <!-- <template v-slot:eventContent='arg'>
                    <b>{{ arg.event.title }}</b>
                </template> -->
               </FullCalendar>

           </div>
          </div>
        </div>
        <!-- <div class="col col-md-6 q-pa-sm">
          <div class="row">
            <div class="col col-md-6 q-pr-sm">
              <q-card class="my-card q-mb-sm " flat bordered>
                  <q-item>
                      <q-item-section>
                      <q-item-label>Title</q-item-label>
                      <q-item-label caption>
                          Subhead
                      </q-item-label>
                      </q-item-section>
                  </q-item>

                  <q-separator />

                  <q-card-section horizontal class="row q-pa-md">
                      <mixLineBar />
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
            <div class="col col-md-6 q-pr-sm">
              <q-card class="my-card q-mb-sm" flat bordered>
                  <q-item>
                      <q-item-section>
                      <q-item-label>Title</q-item-label>
                      <q-item-label caption>
                          Subhead
                      </q-item-label>
                      </q-item-section>
                  </q-item>

                  <q-separator />

                  <q-card-section horizontal class="row q-pa-md">
                    <roundVue />
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
            <div class="col col-md-6">
              <q-card class="my-card q-mb-sm" flat bordered>
                  <q-item>
                      <q-item-section>
                      <q-item-label>Title</q-item-label>
                      <q-item-label caption>
                          Subhead
                      </q-item-label>
                      </q-item-section>
                  </q-item>

                  <q-separator />

                  <q-card-section horizontal class="row q-pa-md">
                      some content of matrix
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
        </div> -->

            <div class="col col-md-3 q-pa-sm">

            </div>
            <div class="col col-md-3 q-pa-sm">

            </div>
        </div>

      <q-dialog
        v-model="dateTradeDetailModal"
        persistent
      >
        <q-card style="width: 750px; max-width: 80vw;">
          <q-bar class="bg-white text-black">
            <q-icon name="event" />
            <div>{{ selectedData.date }}</div>
            <div>-</div>
            <div :class="checkModalValueColor(selectedData.profit)">NET P&L {{ `$${selectedData.profit}` }}</div>

            <q-space />

            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </q-bar>

          <q-card-section>
            <div class="row">
              <div class="col col-3-md q-pa-md">
                <table style="width:100%;">
                  <tr>
                    <td>Total Trades:</td>
                    <td>{{ selectedData.dataCount }}</td>
                  </tr>
                  <tr>
                    <td  class="q-pt-lg">Winrate:</td>
                    <td  class="q-pt-lg">{{ `${selectedData.winrate}%` }}</td>
                  </tr>
                </table>
              </div>
              <q-separator vertical inset />
              <div class="col col-3-md q-pa-md">
                <table style="width:100%;">
                  <tr>
                    <td>Winners:</td>
                    <td>{{ selectedData.win }}</td>
                  </tr>
                  <tr>
                    <td class="q-pt-lg">Losers:</td>
                    <td class="q-pt-lg">{{ selectedData.lost }}</td>
                  </tr>
                </table>
              </div>
              <q-separator vertical inset />
              <div class="col col-3-md q-pa-md">
                <table style="width:100%;">
                  <tr>
                    <td>Gross P&L:</td>
                    <td>{{ `$${selectedData.profit}` }}</td>
                  </tr>
                  <tr>
                    <td class="q-pt-lg">Lot Size:</td>
                    <td class="q-pt-lg">{{ selectedData.volumes }}</td>
                  </tr>
                </table>
              </div>
              <!-- <q-separator vertical inset />
              <div class="col col-3-md q-pa-md">
                <table style="width:100%;">
                  <tr>
                    <td>Commissions:</td>
                    <td>--</td>
                  </tr>
                  <tr>
                    <td class="q-pt-lg">Profit Factor:</td>
                    <td class="q-pt-lg">--</td>
                  </tr>
                </table>
              </div> -->
            </div>

          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-separator />
            <q-table
              class="q-mt-md"
              :rows="selectedData.trades"
              :columns="tradeCols"
              row-key="id"
              title="Trade List"
              dense
            >
            </q-table>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
</template>

<script>
// Trading Activity Tables
import openTradeTable from '../Portfolio/tables/openTradeTable.vue'
import openOrderTable from '../Portfolio/tables/openOrderTable.vue'
import historyTable from '../Portfolio/tables/historyTable.vue'
import exposureTable from '../Portfolio/tables/exposureTable.vue'

import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'

// import roundVue from './matix/round.vue'
// import mixLineBar from './matix/mixLineBar.vue'
import moment from 'moment'

import { syncAccount } from '../../stores/syncAccount'
const store = syncAccount()

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Dashboard',
  components: {
    FullCalendar,
    openTradeTable,
    openOrderTable,
    historyTable,
    exposureTable
    // roundVue,
    // mixLineBar
  },
  data () {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin],
        dayMaxEvents: true,
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev, next, today',
          center: 'title',
          right: 'dayGridMonth, dayGridWeek, listDay'

        },
        // Date Action Handler
        dateClick: (args) => { return this.handleDateClick(args) },
        selectable: true,
        // editable: true,
        events: this.eventList
        // eventContent: 'Show Details'
      },
      dateTradeDetailModal: false,
      dashCards: [
        {
          title: 'Net P&L',
          value: '$ 1,000',
          subVal: '35',
          type: '',
          info: '',
          color: 'text-green-5',
          icon: 'analytics',
          iconColor: 'primary',
          valueType: '',
          chartType: ''
        },
        {
          title: 'Trade Win %',
          value: '75.43%',
          subVal: '35',
          type: '',
          info: '',
          color: '',
          icon: 'speed',
          iconColor: 'green',
          valueType: '',
          chartType: ''
        },
        {
          title: 'Profit Factor',
          value: 10.86,
          subVal: '35',
          type: '',
          info: '',
          color: '',
          icon: 'donut_large',
          iconColor: 'blue-7',
          valueType: '',
          chartType: ''
        },
        {
          title: 'Day Win',
          value: 91.73,
          subVal: '35',
          type: '',
          info: '',
          color: '',
          icon: 'emoji_events',
          iconColor: 'yellow-6',
          valueType: '',
          chartType: ''
        }
      ],
      eventList: [],
      calendarData: null,
      selectedData: null,
      tradeActTab: 'openTrade',
      trades: {}
    }
  },
  methods: {
    handleDateClick (data) {
      const selectedDate = data.dateStr
      const filterData = this.calendarData.filter((el) => {
        return el.date === selectedDate
      })
      if (filterData.length > 0) {
        const res = {
          ...filterData[0]
        }
        console.log(res)
        let win = 0
        let lost = 0
        let totalVolume = 0
        res.trades.forEach((el) => {
          if (el.profit < 0) {
            lost++
          } else if (el.profit !== 0) {
            win++
          }
          totalVolume += el.volume
        })

        // let numberWins = res.trades.filter((el) => {
        //   return
        // })
        res.winrate = this.calculateWinrate(res.dataCount, win).toFixed(2)
        res.win = win
        res.lost = lost
        res.volumes = totalVolume

        console.log(res)
        this.selectedData = res

        this.dateTradeDetailModal = true
      }
    },
    async catchTrades () {
      // Set Loading State
      this.dataLoader = true

      // Fetch Data
      const data = await this.$fireApi.trades.getTrades({ platformIds: this.getId })

      this.trades = Object.keys(data).length !== 0 ? data : null

      if (this.trades) {
        if (this.trades?.history?.historyOrders?.length && this.trades.positions.length) {
          this.trades.history.historyOrders.map((order) => {
            const positionData = this.trades.positions.find((position) => position.id === order.positionId)
            if (positionData) {
              order.profit = positionData.profit
            }
            return order
          })
        }
      }

      // Close Loading State
      this.dataLoader = false
    },
    calculateWinrate (total, dividend) {
      return (dividend / total) * 100
    },
    async getCalendar () {
      const data = await this.$fireApi.trades.getCalendar({ platformIds: this.getId })
      this.calendarData = data.profits
      this.eventList = [...this.calendarData.map(item => ({
        title: `${item.profit} (${item.dataCount} trades)`,
        start: item.date,
        display: 'background',
        allDay: true,
        color: this.checkValueColor(item.profit),
        textColor: '#ffffff'
      }))]
    },
    checkValueColor (val) {
      const positiveMatch = /[+]/gi
      const negativeMatch = /[-]/gi
      let color = '#89ff92'
      if (val.match(positiveMatch)) {
        color = '#89ff92'
      } else if (val.match(negativeMatch)) {
        color = '#f44336'
      }

      return color
    },

    checkModalValueColor (val) {
      const negativeMatch = /[-]/gi
      let color = 'text-green-7'

      if (val.match(negativeMatch)) {
        color = 'text-red-7'
      }

      return color
    },

    tradeProfit (val) {
      const negativeMatch = /[-]/gi
      let res = true

      if (val.match(negativeMatch)) {
        res = false
      }

      return res
    }
  },
  watch: {
    eventList (newVal) {
      this.calendarOptions.events = newVal
    },
    async getId () {
      // this.$q.loading.show()
      // this.getCalendar().then(() => {
      //   this.catchTrades().then(() => {
      //     // this.$q.loading.hide()
      //   })
      // })

      await Promise.all([
        this.getCalendar(),
        this.catchTrades()
      ])
    }
  },
  computed: {
    getId () {
      return store.getSelectedId
    },
    tradeCols () {
      return [
        { name: 'time', required: true, label: 'Open Time', align: 'center', field: row => moment(row.time).format('h:mm:ss'), sortable: true },
        { name: 'lotSize', required: true, label: 'Lot Size', align: 'center', field: row => row.volume, sortable: true },
        { name: 'netPL', required: true, label: 'Net P&L', align: 'center', field: row => row.profit, sortable: true },
        { name: 'symbol', required: true, label: 'Symbol', align: 'center', field: row => row.symbol, sortable: true },
        { name: 'profit', label: 'Profit', align: 'center', field: row => row.profit, sortable: true },
        { name: 'position', label: 'Position', align: 'center', field: row => row.type === 'ORDER_TYPE_BUY' ? 'Buy' : 'Sell', sortable: true },
        { name: 'platform', label: 'Platform', align: 'center', field: row => row.platform, sortable: true }

        // new Set

      ]
    }
  }
}
</script>
<style scoped>
  .calendar  {

    background-image: url('../Dashboard/matix/Illustration.svg');
    background-size:contain;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 10px;
    padding: 15px;
      color: white;
      background-color: #242423;

      /*  */
      box-shadow: 0px 0px 14px 8px rgba(15,51,224,0.88) inset;
      -webkit-box-shadow: 0px 0px 14px 8px rgba(15,51,224,0.88) inset;
      -moz-box-shadow: 0px 0px 14px 8px rgba(15,51,224,0.88) inset;
  }
</style>
