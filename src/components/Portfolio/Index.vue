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
                            With so much content to display at once, and often so little screen real-estate,
                            Cards have fast become the design pattern of choice for many companies, including
                            the likes of Google and Twitter.
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
                    <q-tab name="trade" icon="candlestick_chart" label="Trade" />
                </q-tabs>

                <q-tab-panels v-model="chartTab" animated>
                    <q-tab-panel name="growth">
                        <mixLineBarVue />
                    </q-tab-panel>

                    <q-tab-panel name="trade">
                        <candleStickVue />
                    </q-tab-panel>
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
                    <q-tab name="goals" icon="sports_score" label="Goals" />
                    <q-tab name="browser" icon="web" label="Browser" />
                </q-tabs>

                <q-tab-panels v-model="tradingTab" animated>
                    <q-tab-panel name="period">
                        <periodTable />
                    </q-tab-panel>
                    <q-tab-panel name="goals">
                        
                    </q-tab-panel>
                    <q-tab-panel name="browser">
                        
                    </q-tab-panel>
                </q-tab-panels>
                
            </div>
        </div>
    </div>
</template>

<script>
import mixLineBarVue from './matrix/mixLineBar.vue'
import candleStickVue from './matrix/candleStick.vue'
import periodTable from './matrix/reportTable.vue'
import infoStats from './information/info.vue'

export default {
  name: 'DailyJournalComponent',
  components: {
    mixLineBarVue,
    candleStickVue,
    periodTable,
    infoStats
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
