<template>
    <div class="q-pa-md" style="width: 100%;">

      <q-splitter
            v-model="splitterModel"
            style="height: 90vh"
        >
            <template v-slot:before>
                <div class="q-pa-sm">
                  <q-card flat bordered class="my-card q-pa-sm">
                      <q-card-section  class="bg-white text-weight-light">
                          Filters
                      </q-card-section>
                  </q-card>
                  <tradeReportTableVue />
                </div>
            </template>

            <template v-slot:after>
              <div class="q-pa-sm">
                <div class="row">
                    <!-- Small cards -->
                    <div
                    v-for="(item, index) in dashCards"
                    :key="index"
                    class="col col-md-12 col-lg-12 q-mb-sm"
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
              </div>
            </template>
      </q-splitter>

    </div>
</template>

<script>
import tradeReportTableVue from './matrix/tradeReportTable.vue'
import areaChart from './matrix/areaChart.vue'

export default {
  name: 'TradeLogsComponent',
  components: {
    tradeReportTableVue,
    areaChart
  },
  data () {
    return {
      splitterModel: 70,
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
          chartType: '',
          component: ''
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
          // eslint-disable-next-line no-trailing-spaces
          chartType: '' 
        }
      ]
    }
  },
  created () {
    this.catchTrades()
  },
  methods: {
    async catchTrades () {
      const trades = await this.$fireApi.trades.getTrades()
      console.log(trades)
    }
  }
}
</script>
