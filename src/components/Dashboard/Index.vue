<template>
  <div class="dash-container q-pa-md" style="width: 100%; height: 93vh;">
    <div class="row">
       <div class="calendar col col-md-6 q-pa-sm">
          <!-- Calendar -->
          <FullCalendar
            :options="calendarOptions"
            :events="eventList"
          >
            <!-- <template v-slot:eventContent='arg'>
              <q-btn
                size="md"
                @click="handleDateClick(arg)"
                flat 
                color="primary" 
                :label="" 
              />
              <q-btn 
                class="calendarBtnUpload" 
                size="sm" 
                push 
                color="primary" 
                round 
                icon="add_chart" 
              />
            </template> -->
            <template v-slot:dayCellContent='arg'>
              <q-btn
                v-if="dateCheckerTrade(arg)"
                class="calendarBtnUploadDay" 
                size="sm" 
                push 
                color="primary" 
                round 
                icon="add_chart"
                @click="openModal(arg)"
              />
              <q-btn
                v-if="dateCheckerTrade(arg)"
                class="previewTradeDay" 
                size="sm" 
                push 
                color="primary" 
                round 
                icon="fullscreen"
                @click="handleDateClick(arg)"
              />
              {{ arg.dayNumberText }}
              
            </template>
          </FullCalendar>
          <TradeForm ref="tradeFormModal" />
          <input
            ref="fileInput"
            type="file"
            accept=".csv,text/csv"
            style="display: none"
            @change="handleFileSelected"
          />
        </div>
        <div class="col col-md-6 q-pa-sm">
          <!-- Cards and Tables -->
          <div class="row">
            <!-- Cards -->
            <div
              v-for="(item, index) in dashCards"
              :key="index"
              class="col col-md-12 col-lg-12 q-pa-sm"
            >
                <q-card flat bordered class="my-card q-pa-sm">
                  <q-card-section  class="bg-white text-weight-light">
                    <div class="text-subtitle2">{{item.title}} <q-icon name="info" /></div>
                    <div class="text-h6" :class="[item.color]">
                      <span :class="checkModalValueColor(item.value)">{{`${item.prefix} ${item.value}`}}</span>
                      <q-icon class="float-right" :color="item.iconColor" :name="item.icon" size="lg" />
                    </div>
                  </q-card-section>
                </q-card>
            </div>
            <!-- Table -->
            <div class="trade-activity col col-md-12 q-pa-sm">
              <h5>Trading activity</h5>
              <q-tabs
                  v-model="tradeActTab"
                  dense
                  align="left"
                  no-caps
                  inline-label
                  :breakpoint="0"
              >
                <q-tab name="openTrade" icon="scatter_plot" :label="`Open Trades (${trades?.positions?.length})`" />
                <q-tab name="history" icon="candlestick_chart" :label="`History (${trades?.history?.historyOrders?.length})`" />
              </q-tabs>
              <q-tab-panels v-model="tradeActTab" animated>
                <q-tab-panel name="openTrade">
                    <openTradeTable
                    v-if="trades != null"
                    :openTrades="trades.positions"
                    />
                </q-tab-panel>
                <q-tab-panel name="history">
                    <historyTable
                    v-if="trades != null"
                    :tradeHistory="trades.history.historyOrders"
                    />
                </q-tab-panel>
              </q-tab-panels>
            </div>
          </div>
        </div>
    </div>

    <q-dialog
      v-model="dateTradeDetailModal"
      persistent
    >
      <q-card  style="width: 80vw; max-width: 80vw;">
        <q-bar class="bg-white text-black">
          <q-icon name="event" />
          <div>{{ selectedData.date }}</div>
          <!-- <div >-</div> -->
          <div :class="checkModalValueColor(selectedData.profit)">NET P&L {{ `$${selectedData.profit}` }}</div>

          <q-space />

          <q-btn 
            class="q-mr-md"
            color="primary" 
            dense  
            icon="fact_check" 
            :label="showJournal ? 'Hide Details' : 'View Details'"
            @click="showJournal = !showJournal"
          >
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="row">
            <div v-if="showJournal" class="col col-sm-12 col-md-12 q-pa-md">
              <div class="row">
                <div class="col col-sm-3 col-md-3">
                  <q-list class="rounded-borders" style="max-width: 600px">
                    <q-item-label header>Daily Journal List</q-item-label>

                    <q-item
                      v-for="(item, index) in journalList"
                      :key="index"
                      class="rounded-borders q-mb-xs"
                      style="border: 1px solid #80808024;"
                      clickable
                      @click="showEditorBody(item)"
                    >
                      <!-- <q-item-section avatar top>
                        <q-icon name="sticky_note_2" color="warning" size="lg" />
                      </q-item-section> -->
                      <q-item-section top>
                        <!-- <q-item-label lines="1">
                          <span class="text-weight-medium">{{item.id}}</span>
                        </q-item-label> -->
                        <q-item-label caption lines="1">
                          <div v-html="renderMarkdown(item.body)"></div>
                        </q-item-label>
                      </q-item-section>

                      <q-item-section top side>
                        <div class="text-grey-8 q-gutter-xs">
                          <q-btn @click="removeNote(item.id, index)" class="gt-xs" color="red" size="12px" flat dense round icon="delete" />
                        </div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
                <div class="col col-sm-9 col-md-9">
                  <Notebook 
                    :dateSelected="selectedData.date" 
                    :noteSelected="journalSelected"
                    @listOfNotes="noteList" />
                </div>
              </div>
              
            </div>
            <div class="col col-md-3 q-pa-md">
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
            <div class="col col-md-3 q-pa-md">
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
            <div class=" col col-md-3 q-pa-md">
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
            <template v-slot:header="props">
                <q-tr :props="props">
                    <q-th
                        v-for="col in props.cols"
                        :key="col.name"
                        :props="props"
                    >
                        {{ col.label }}
                    </q-th>
                </q-tr>
            </template>
            <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    <q-chip v-if="col.name === 'position'"
                      size="sm"
                      :color="col.value === 'Buy' ? 'green-7' : 'red-7'"
                      text-color="white"
                      :label="col.value"
                    />
                    <span v-else class="text-bold">
                      {{ `${col.value}` }}
                    </span>
                  </q-td>
                </q-tr>
            </template>
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
import { LocalStorage } from 'quasar'
import { marked } from 'marked'
import moment from 'moment'
import Papa from 'papaparse'
import { Timestamp } from '@firebase/firestore'
import createDocument from 'src/firebase/firebase-create'
import TradeForm from './TradeForm.vue'

import Notebook from '../DailyJournal/note/notebook.vue'

import { syncAccount } from '../../stores/syncAccount'
import deleteDocument from 'src/firebase/firebase-delete'

const store = syncAccount()

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Dashboard',
  components: {
    FullCalendar,
    openTradeTable,
    openOrderTable,
    historyTable,
    exposureTable,
    TradeForm,
    Notebook
    // roundVue,
    // mixLineBar
  },
  data () {
    return {
      showJournal: false,
      journalList: [],
      journalSelected: {},
      calendarOptions: {
        eventRender: this.customEventRender,
        plugins: [dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin],
        dayMaxEvents: true,
        initialView: 'dayGridMonth',
        themeSystem: 'bootstrap5', 
        customButtons: {
          importCSV: {
            text: 'Import Trades',
            click: () => { return this.openFilePicker() }
          }
        },
        headerToolbar: {
          left: 'prev next today importCSV',
          center: 'title',
          right: 'dayGridMonth dayGridWeek listDay'
        },
        // Date Action Handler
        // dateClick: (args) => { return this.handleDateClick(args) },
        selectable: true,
        // editable: true,
        events: this.eventList,
        // eventContent: 'Show Details'
      },
      dateTradeDetailModal: false,
      dashCards: [
        {
          title: 'Net P&L',
          value: 0,
          prefix: '$',
          subVal: '35',
          type: '',
          info: '',
          color: 'text-grey-10',
          icon: 'analytics',
          iconColor: 'primary',
          valueType: '',
          chartType: ''
        },
      ],
      eventList: [],
      calendarData: null,
      selectedData: null,
      tradeActTab: 'openTrade',
      trades: {},
      evntCal: null
    }
  },
  created(){
    this.asyncCallofData();
  },
  methods: {
    showEditorBody(item){
      this.journalSelected = item
    },
    removeNote(journalId, index){
      const user = LocalStorage.getItem('user')
      const userId = user ? user.uid : null

      deleteDocument(`platforms/${userId}/journals`, journalId)
      this.journalList.splice(index, 1)
    },
    checkActiveJournal (val) {
      return val === moment().format('l')
    },
    renderMarkdown(text) {
      return marked(text)
    },
    formatDate(val) {
      return new Date(val.seconds * 1000).toLocaleDateString()
    },
    customEventRender(info) {
      // Customize the event rendering here
      info.el.style.fontWeight = 'bold'; // Make text bold
      info.el.style.color = 'white'; // Change text color to black
    },
    noteList(value){
      console.log(value)
      this.journalList = value
    },
    openModal (data) {
      let comp = this.$refs.tradeFormModal
      comp.$data.form.open = moment(data.date).format('YYYY-MM-DD')
      comp.$data.form.close = moment(data.date).format('YYYY-MM-DD')
      comp.openModal()
    },
    dateCheckerTrade(data){
      let calDate = moment(data.date).format('YYYY-MM-DD')
      let currDate = moment().format('YYYY-MM-DD')
      let listOfTradeDates = this.eventList.map(evt => evt.start)
      return listOfTradeDates.includes(calDate) || calDate === currDate
    },
    async asyncCallofData(){

      if(this.getId.length === 0){
        return false
      }

      this.$q.loading.show()
      await Promise.all([
        this.getCalendar(),
        this.catchTrades()
      ]).catch((err) => {
        console.log(err)
        this.$q.loading.hide()
      })
      this.$q.loading.hide()
    },
    openFilePicker () {
      this.$refs.fileInput.click()
    },
    handleFileSelected (event) {
      const selectedFile = event.target.files[0]
      if (selectedFile) {
        const user = LocalStorage.getItem('user')
        Papa.parse(selectedFile, {
          complete: async (results) => {
            for (const row of results.data) {
            // Assuming the first row of CSV contains headers
              if (results.data.indexOf(row) === 0) continue

              const data = {
                ticket: row[0],
                open: Timestamp.fromDate(new Date(row[1])),
                type: row[2],
                volume: row[3],
                symbol: row[4],
                price: parseFloat(row[5]),
                sl: row[6],
                tp: row[7],
                close: Timestamp.fromDate(new Date(row[8])),
                price: parseFloat(row[9]),
                swap: row[10],
                commissions: parseFloat(row[11]),
                profit: parseFloat(row[12]),
                pips: row[13],
                tradeDuration: row[14]
              }

              try {
                const userId = user ? user.uid : null
                if (userId) {
                  await createDocument(`platforms/${userId}/trades`, data)

                  this.$nextTick(async () => {
                    await Promise.all([
                      this.getCalendar(),
                      this.catchTrades()
                    ])
                  })
                  
                } else {
                  this.$q.notify({
                    type: 'negative',
                    message: 'Missing user id!'
                  })
                }
              } catch (error) {
                this.$q.notify({
                  type: 'negative',
                  message: `Error saving data: ${error.message}`
                })
              }
            }

            this.$q.notify({
              type: 'positive',
              message: 'Data imported successfully!'
            })
          }
        })
      }
    },
    handleDateClick (data) {
      // console.log(data)
      // return
      // const selectedDate = data.dateStr
      const selectedDate = moment(data.date).format('YYYY-MM-DD')
      const filterData = this.calendarData.filter((el) => {
        return el.date === selectedDate
      })
      if (filterData.length > 0) {
        const res = {
          ...filterData[0]
        }
        // console.log(res)
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

        // console.log(res)
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
      
      this.eventList = [...this.calendarData.map((item, index) => ({
        title: `${item.profit} (${item.dataCount} trades)`,
        start: item.date,
        display: 'background',
        allDay: true,
        color: this.checkValueColor(item.profit),
        // textColor: '#ffffff'
      }))]

      
      // compute NET P&L
      const currDate = moment().format('YYYY-MM-DD');
      let netpnl = 0;
      for (let index = 0; index < data.profits.length; index++) {
        let possDate = moment(data.profits[index].date).format('YYYY-MM-DD');
        if(possDate === currDate){
          const profitVal = data.profits[index].profit;
          netpnl += Number(profitVal);
        }
      }

      this.dashCards[0].value = netpnl.toLocaleString("en-US");
    },
    checkValueColor (val) {
      const positiveMatch = /[+]/gi
      const negativeMatch = /[-]/gi
      let color = '#89ff92'
      if (val.toString().match(positiveMatch)) {
        color = '#89ff92'
      } else if (val.toString().match(negativeMatch)) {
        color = '#f44336'
      }

      return color
    },

    checkModalValueColor (val) {
      const negativeMatch = /[-]/gi
      let color = 'text-green-7'

      if (val.toString().match(negativeMatch)) {
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
    getId (newVal) {
      this.asyncCallofData();
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
        // { name: 'netPL', required: true, label: 'Net P&L', align: 'center', field: row => row.profit, sortable: true },
        { name: 'symbol', required: true, label: 'Symbol', align: 'center', field: row => row.symbol, sortable: true },
        { name: 'profit', label: 'Profit', align: 'center', field: row => row.profit, sortable: true },
        { name: 'position', label: 'Position', align: 'center', field: row => row.type === 'ORDER_TYPE_BUY' ? 'Buy' : 'Sell', sortable: true },
        { name: 'platform', label: 'Platform', align: 'center', field: row => row?.platform || 'mt4', sortable: true }

        // new Set

      ]
    }
  }
}
</script>
<style scoped>

  .dash-container {
         background: rgb(34,86,195);
    background: linear-gradient(0deg, rgba(34,86,195,1) 0%, rgba(69,45,253,0.49343487394957986) 100%);
  }
  .calendar  {


    border-radius: 10px;
    padding: 15px;
      color: black;
      background: rgb(96,110,255);
    background: linear-gradient(187deg, rgba(96,110,255,0.40940126050420167) 0%, rgba(5,161,255,0.4234068627450981) 51%, rgba(85,111,255,0.40379901960784315) 100%);


      /*  */
      box-shadow: 0px 0px 5px 6px rgba(0,0,0,0.75);
      -webkit-box-shadow: 0px 0px 5px 6px rgba(0,0,0,0.75);
      -moz-box-shadow: 0px 0px 5px 6px rgba(0,0,0,0.75);
  }


  .trade-activity {
    background: rgb(96,110,255);
    background: linear-gradient(187deg, rgba(96,110,255,0.40940126050420167) 0%, rgba(5,161,255,0.4234068627450981) 51%, rgba(85,111,255,0.40379901960784315) 100%);
    border-radius: 10px;
    margin-top: 34px;
    margin-left: 12px;

      box-shadow: 0px 0px 5px 6px rgba(0,0,0,0.75);
      -webkit-box-shadow: 0px 0px 5px 6px rgba(0,0,0,0.75);
      -moz-box-shadow: 0px 0px 5px 6px rgba(0,0,0,0.75);
  }
  .calendarBtnUpload{
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
  .calendarBtnUploadDay{
    z-index: 999999;
    position: absolute;
    right: 5px;
    bottom: -55px;
  }
  .previewTradeDay{
    z-index: 999999;
    position: absolute;
    right: 40px;
    bottom: -55px;
  }
</style>
