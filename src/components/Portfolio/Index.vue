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
<<<<<<< Updated upstream
=======
                        <div v-if="dataLoader" class="text-center q-ma-auto q-mt-xl">
                            <q-spinner-bars
                                color="primary"
                                size="2em"
                            />
                            <q-tooltip :offset="[0, 8]">Loading Analytic Chart Data</q-tooltip>
                        </div>
>>>>>>> Stashed changes
                        <growthChart
                            v-if="chartTab === 'growth'" 
                        />
                    </q-tab-panel>

                    <q-tab-panel name="profit">
<<<<<<< Updated upstream
                        <profitChart 
                            v-if="chartTab === 'profit'" 
=======
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
>>>>>>> Stashed changes
                        />
                    </q-tab-panel>

                    <q-tab-panel name="balance">
<<<<<<< Updated upstream
                        <balanceChart 
                            v-if="chartTab === 'balance'" 
                        />
                    </q-tab-panel>

                    <q-tab-panel name="drawdown">
                        <drawDownChart 
                            v-if="chartTab === 'drawdown'" 
=======
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
>>>>>>> Stashed changes
                        />
                    </q-tab-panel> -->
                </q-tab-panels>
                
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
    
  },
  data(){
    return {
        tab: 'one',
        chartTab: 'growth',
        tradingTab: 'period',
    }
  },
  created(){},
  methods: {}
}
</script>
