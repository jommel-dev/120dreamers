<template>
    <div class="q-pa-md" style="width: 100%;">
        <div class="row">
            <div class="col col-md-3 q-pa-sm">
                <q-card class="my-card" flat bordered>
                    <q-card-section>
                        <div class="text-h6">Information</div>
                        <div class="text-subtitle2">by Broker</div>
                    </q-card-section>

                    <q-tabs
                        v-model="tab"
                        dense
                        no-caps
                        inline-label
                        class="bg-indigo-10 text-white shadow-2"
                    >
                        <q-tab name="one" icon="query_stats" label="Stats" />
                        <q-tab name="two" icon="settings_suggest" label="General" />
                    </q-tabs>

                    <q-separator />

                    <q-tab-panels v-model="tab" animated>
                        <q-tab-panel name="one">
                            <infoStats />
                        </q-tab-panel>

                        <q-tab-panel name="two">
                            <infoGeneral />
                        </q-tab-panel>
                    </q-tab-panels>
                </q-card>
            </div>
            <div class="col col-md-9 q-pa-sm">
                <q-tabs
                    v-model="chartTab"
                    dense
                    align="left"
                    no-caps
                        inline-label
                    :breakpoint="0"
                >
                    <q-tab name="growth" icon="legend_toggle" label="Growth" />
                    <q-tab name="profit" icon="attach_money" label="Profit" />
                    <q-tab name="balance" icon="wallet" label="Balance" />
                    <q-tab name="drawdown" icon="trending_down" label="Drawdown" />
                </q-tabs>

                <q-tab-panels v-model="chartTab" animated>
                    <q-tab-panel name="growth">
                        <growthChart
                            v-if="chartTab === 'growth' && trades"
                            :growthValues="rawGrowthValues"
                        />
                    </q-tab-panel>

                    <q-tab-panel name="profit">
                        <profitChart
                            v-if="chartTab === 'profit'"
                        />
                    </q-tab-panel>

                    <q-tab-panel name="balance">
                        <balanceChart
                            v-if="chartTab === 'balance'"
                        />
                    </q-tab-panel>

                    <q-tab-panel name="drawdown">
                        <drawDownChart
                            v-if="chartTab === 'drawdown'"
                        />
                    </q-tab-panel>
                </q-tab-panels>

            </div>
            <!-- trading -->
           <div>
            <h5>Trading</h5>
           </div>

            <div class="col col-md-12 q-pa-sm">
                <q-tabs
                    v-model="tradingTab"
                    dense
                    align="left"
                    no-caps
                    inline-label
                    :breakpoint="0"
                >
                    <q-tab name="period" icon="scatter_plot" label="Period" />
                    <q-tab name="goals" icon="ads_click" label="Goals" />
                    <q-tab name="browser" icon="candlestick_chart" label="Browser" />
                </q-tabs>

                <q-tab-panels v-model="tradingTab" animated>
                    <q-tab-panel name="period">
                        <periodTable />
                    </q-tab-panel>
                    <q-tab-panel name="goals">
                        <goalsTable />
                    </q-tab-panel>
                    <q-tab-panel name="browser">
                        <browserTable />
                    </q-tab-panel>
                </q-tab-panels>
            </div>
            <!-- advance statistics -->
            <div>
                <h5>Advance Statistics</h5>
           </div>
            <div class="col col-md-12 q-pa-sm">
                <q-tabs
                    v-model="advanceTab"
                    dense
                    align="left"
                    no-caps
                    inline-label
                    :breakpoint="0"
                >
                    <q-tab name="trades" icon="candlestick_chart" label="Trades" />
                    <q-tab name="summary" icon="ads_click" label="Summary" />
                    <q-tab name="hourly" icon="ads_click" label="Hourly" />
                    <q-tab name="riskOfRuins" icon="candlestick_chart" label="Risk of Ruins" />
                    <q-tab name="duration" icon="scatter_plot" label="Duration" />
                </q-tabs>

                <q-tab-panels v-model="advanceTab" animated>
                    <q-tab-panel name="duration">
                        <durationChart/>
                    </q-tab-panel>
                    <q-tab-panel name="hourly">
                        <hourlyChart/>
                    </q-tab-panel>
                    <q-tab-panel name="riskOfRuins">
                        <riskOfRuinChart/>
                    </q-tab-panel>
                    <q-tab-panel name="summary">
                        <summaryChart/>
                    </q-tab-panel>
                    <q-tab-panel name="trades">
                        <tradesChart/>
                    </q-tab-panel>
                </q-tab-panels>
            </div>

            <!-- trading activity -->
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

                    <q-tab name="period" icon="scatter_plot" label="Open Trades" />
                    <q-tab name="goals" icon="ads_click" label="Open Orders" />
                    <q-tab name="browser" icon="candlestick_chart" label="History" />
                    <q-tab name="browser" icon="candlestick_chart" label="Exposure" />
                </q-tabs>

                <q-tab-panels v-model="tradeActTab" animated>
                    <q-tab-panel name="period">
                        <periodTable />
                    </q-tab-panel>
                    <q-tab-panel name="goals">
                        <goalsTable />
                    </q-tab-panel>
                    <q-tab-panel name="browser">
                        <browserTable />
                    </q-tab-panel>
                    <q-tab-panel name="browser">
                        <browserTable />
                    </q-tab-panel>
                </q-tab-panels>
            </div>

            <!-- motnhly analitycs -->
            <div>
                <h5>Monthly Analaytics</h5>
           </div>
            <div class="col col-md-12 q-pa-sm">
                <q-tabs
                    v-model="monthlyTab"
                    dense
                    align="left"
                    no-caps
                    inline-label
                    :breakpoint="0"
                >
                    <q-tab name="period" icon="scatter_plot" label="2022" />
                    <q-tab name="goals" icon="ads_click" label="2023" />
                </q-tabs>

                <q-tab-panels v-model="monthlyTab" animated>
                    <q-tab-panel name="period">
                        <periodTable />
                    </q-tab-panel>
                    <q-tab-panel name="goals">
                        <goalsTable />
                    </q-tab-panel>
                </q-tab-panels>
            </div>
        </div>
    </div>
</template>

<script>
// Charts
import growthChart from './matrix/growthChart.vue'
import profitChart from './matrix/profitChart.vue'
import balanceChart from './matrix/balanceChart.vue'
import drawDownChart from './matrix/drawDownChart.vue'
// Information
import infoStats from './information/info.vue'
import infoGeneral from './information/general.vue'

// Tables
import periodTable from './tables/reportTable.vue'
import goalsTable from './tables/goalsTable.vue'
import browserTable from './tables/browserTable.vue'

// advance Statistics tables
import durationChart from './statistics/durationChart.vue'
import hourlyChart from './statistics/hourlyChart.vue'
import riskOfRuinChart from './statistics/riskOfRuinChart.vue'
import summaryChart from './statistics/summaryChart.vue'
import tradesChart from './statistics/tradesChart.vue'

// Trading Activity

import { toRaw } from 'vue'

export default {
  name: 'PortfolioComponent',
  components: {

    infoStats,
    infoGeneral,

    growthChart,
    balanceChart,
    profitChart,
    drawDownChart,

    periodTable,
    goalsTable,
    browserTable,

    durationChart,
    hourlyChart,
    riskOfRuinChart,
    summaryChart,
    tradesChart

  },
  data () {
    return {
      tab: 'one',
      chartTab: 'growth',
      tradingTab: 'period',
      advanceTab: 'trades',
      tradeActTab: 'period',
      monthlyTab: 'period',
      trades: null
    }
  },
  created () {
    this.catchTrades()
  },
  methods: {
    async catchTrades () {
      this.trades = await this.$fireApi.trades.getTrades()
      console.log('trades from index', this.trades)
    }
  },
  computed: {
    rawGrowthValues () {
      return this.trades ? toRaw(this.trades.growthValues) : null
    }
  }
}
</script>
