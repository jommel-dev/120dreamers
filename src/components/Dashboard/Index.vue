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
        <div class="col col-md-6 q-pa-sm">
            <FullCalendar
                :options="calendarOptions"
                :events="eventList"
            >
                <!-- <template v-slot:eventContent='arg'>
                    <b>{{ arg.event.title }}</b>
                </template> -->
            </FullCalendar>
        </div>
        <div class="col col-md-6 q-pa-sm">
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
        </div>

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
                    <td class="q-pt-lg">Volume:</td>
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
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import roundVue from './matix/round.vue'
import mixLineBar from './matix/mixLineBar.vue'
import moment from 'moment'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Dashboard',
  components: {
    FullCalendar,
    roundVue,
    mixLineBar
  },
  data () {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        dayMaxEvents: true,
        initialView: 'dayGridMonth',
        // Date Action Handler
        dateClick: (args) => { return this.handleDateClick(args) },
        selectable: true,
        events: this.eventList
        // eventContent: 'Show Details'
      },
      dateTradeDetailModal: false,
      dashCards: [
        {
          title: 'Net P&L2',
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
    }
  },
  created () {
    this.getCalendar()
  },
  methods: {
    handleDateClick (data) {
      let selectedDate = data.dateStr;
      let filterData = this.calendarData.filter((el) => {
        return el.date === selectedDate
      })
      if(filterData.length > 0){
        let res = {
          ...filterData[0]
        }
        console.log(res)
        let win = 0;
        let lost = 0;
        let totalVolume = 0;
        res.trades.forEach((el) => {
          if(el.profit < 0){
            lost++
          } else if(el.profit != 0) {
            win++
          }
          totalVolume += el.volume
        });


        // let numberWins = res.trades.filter((el) => {
        //   return 
        // })
        res.winrate = this.calculateWinrate(res.dataCount, win).toFixed(2)
        res.win = win
        res.lost = lost
        res.volumes = totalVolume

        console.log(res)
        this.selectedData = res

        this.dateTradeDetailModal = true;
      }
    },
    calculateWinrate(total, dividend){
      return (dividend / total) * 100;
    },
    async getCalendar () {
      const data = await this.$fireApi.trades.getCalendar()
      this.calendarData = data.profits
      this.eventList = [...this.calendarData.map(item => ({
        title: `${item.profit} (${item.dataCount} trades)`,
        start: item.date,
        display: 'background',
        color: this.checkValueColor(item.profit)
      }))]
    },
    checkValueColor(val){
      let positiveMatch = /[+]/gi;
      let negativeMatch = /[-]/gi;
      let color = "#89ff92";
      if(val.match(positiveMatch)){
          color = '#89ff92';
      } else if(val.match(negativeMatch)){
          color = '#f44336';
      }

      return color;
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
    }
  },
  computed:{
    tradeCols(){
      return [
        { name: 'time', required: true, label: 'Open Time', align: 'center', field: row => moment(row.time).format("h:mm:ss"), sortable: true },
        { name: 'volume', required: true, label: 'Volume', align: 'center', field: row => row.volume, sortable: true },
        { name: 'netPL', required: true, label: 'Net P&L', align: 'center', field: row => row.profit, sortable: true },
        { name: 'symbol', required: true, label: 'Symbol', align: 'center', field: row => row.symbol, sortable: true },
        { name: 'profit', label: 'Profit', align: 'center', field: row => row.profit, sortable: true },
        { name: 'type', label: 'Type', align: 'center', field: row => row.type === 'ORDER_TYPE_BUY' ? 'Buy' : 'Sell', sortable: true },
        { name: 'platform', label: 'Platform', align: 'center', field: row => row.platform, sortable: true },

        // new Set
        
      ]
    }
  }
}
</script>
