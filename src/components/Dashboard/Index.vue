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
    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import roundVue from './matix/round.vue'
import mixLineBar from './matix/mixLineBar.vue'

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
        dateClick: (args) => { return this.handleDateClick(args.event) },
        selectable: true,
        events: this.eventList
        // eventContent: 'Show Details'
      },
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
      calendarData: null
    }
  },
  created () {
    this.renderChart()
    this.getCalendar()
  },
  methods: {
    renderChart () {

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
      console.log(val)
            let positiveMatch = /[+]/gi;
            let negativeMatch = /[-]/gi;
            let color = "#89ff92";
            if(val.match(positiveMatch)){
                color = '#89ff92';
            } else if(val.match(negativeMatch)){
                color = '#f44336';
            }

            return color;
    }
  },
  watch: {
    eventList (newVal) {
      this.calendarOptions.events = newVal
    }
  }
}
</script>
