<template>
    <div class="portfolio-container q-pa-md" style="width: 100%;">
        <div class="row ">
            <div class="col info-container col-md-3 q-pa-sm">
                <q-card class="my-card" flat bordered>
                    <q-card-section>
                        <div class="text-h6">Information</div>
                        <div class="text-subtitle2">by {{ trades?.accountInformation.broker }}</div>
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
                            <div v-if="dataLoader" class="text-center q-ma-auto">
                                <q-spinner-bars
                                    color="primary"
                                    size="2em"
                                />
                                <q-tooltip :offset="[0, 8]">Loading Statistics Data</q-tooltip>
                            </div>
                            <infoStats
                                v-if="tab === 'one' && !dataLoader"
                                :infoStatsData="trades"
                            />
                        </q-tab-panel>

                        <q-tab-panel name="two">
                            <div v-if="dataLoader" class="text-center q-ma-auto">
                                <q-spinner-bars
                                    color="primary"
                                    size="2em"
                                />
                                <q-tooltip :offset="[0, 8]">Loading General Data</q-tooltip>
                            </div>
                            <infoGeneral
                            v-if="tab === 'two' && !dataLoader"
                            :generalData="trades.accountInformation"/>
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
                    <!-- <q-tab name="drawdown" icon="trending_down" label="Drawdown" /> -->
                </q-tabs>

                <q-tab-panels v-model="chartTab" animated>
                    <q-tab-panel name="growth">
                        <div v-if="dataLoader" class="text-center q-ma-auto q-mt-xl">
                            <q-spinner-bars
                                color="primary"
                                size="2em"
                            />
                            <q-tooltip :offset="[0, 8]">Loading Analytic Chart Data</q-tooltip>
                        </div>
                        <growthChart
                            v-if="chartTab === 'growth' && !dataLoader"
                            :growthValues="trades.growth"
                        />
                    </q-tab-panel>

                    <q-tab-panel name="profit">
                        <div v-if="dataLoader" class="text-center q-ma-auto q-mt-xl">
                            <q-spinner-bars
                                color="primary"
                                size="2em"
                            />
                            <q-tooltip :offset="[0, 8]">Loading Profit Chart Data</q-tooltip>
                        </div>
                        <profitChart
                            v-if="chartTab === 'profit' && !dataLoader"
                            :profits="trades.profits"
                        />
                    </q-tab-panel>

                    <q-tab-panel name="balance">
                        <div v-if="dataLoader" class="text-center q-ma-auto q-mt-xl">
                            <q-spinner-bars
                                color="primary"
                                size="2em"
                            />
                            <q-tooltip :offset="[0, 8]">Loading Balance Chart Data</q-tooltip>
                        </div>
                        <balanceChart
                            v-if="chartTab === 'balance' && !dataLoader"
                            :balances="trades.balance"
                        />
                    </q-tab-panel>

                    <!-- <q-tab-panel name="drawdown">
                        <drawDownChart
                            v-if="chartTab === 'drawdown'"
                        />
                    </q-tab-panel> -->
                </q-tab-panels>

            </div>
            <!-- trading -->
           <!-- <div>
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
            </div> -->

            <!-- advance statistics -->
            <!-- <div>
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
            </div> -->

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

                    <q-tab name="openTrade" icon="scatter_plot" :label="`Open Trades (${trades?.positions.length})`" />
                    <!-- <q-tab name="openOrder" icon="ads_click" label="Open Orders" /> -->
                    <q-tab name="history" icon="candlestick_chart" :label="`History (${trades?.history.historyOrders.length})`" />
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

            <!-- motnhly analitycs -->
            <!-- <div>
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
            </div> -->
        </div>
    </div>
</template>

<script>
// Charts
import growthChart from './matrix/growthChart.vue'
import profitChart from './matrix/profitChart.vue'
import balanceChart from './matrix/balanceChart.vue'
// import drawDownChart from './matrix/drawDownChart.vue'

// Information
import infoStats from './information/info.vue'
import infoGeneral from './information/general.vue'

// Trading Activity Tables
import openTradeTable from './tables/openTradeTable.vue'
import openOrderTable from './tables/openOrderTable.vue'
import historyTable from './tables/historyTable.vue'
import exposureTable from './tables/exposureTable.vue'

import { syncAccount } from '../../stores/syncAccount'
const store = syncAccount()

// Trading Activity

export default {
  name: 'PortfolioComponent',
  components: {

    infoStats,
    infoGeneral,

    growthChart,
    balanceChart,
    profitChart,
    // drawDownChart,

    // periodTable,
    openTradeTable,
    openOrderTable,
    historyTable,
    exposureTable
    // goalsTable,
    // browserTable,

    // durationChart,
    // hourlyChart,
    // riskOfRuinChart,
    // summaryChart,
    // tradesChart

  },
  data () {
    return {
      tab: 'one',
      chartTab: 'growth',
      tradingTab: 'period',
      advanceTab: 'trades',
      tradeActTab: 'openTrade',
      monthlyTab: 'period',
      trades: null,
      dataLoader: false
    }
  },
  created () {
    this.catchTrades()
  },
  methods: {
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
    }
  },
  computed: {
    getId () {
      return store.getSelectedId
    }
  }
}
</script>
<style scoped>
    .portfolio-container {
        background: rgb(34,86,195);
    background: linear-gradient(0deg, rgba(34,86,195,1) 0%, rgba(69,45,253,0.49343487394957986) 100%);
  }

  .info-container {
    margin-top: 35px;
   
  }
    
</style>
