<template>
    <div>
        <q-table
            :rows="tableRow"
            :columns="tableColumns"
            row-key="name"
            hide-bottom
            separator="cell"
        >
            <template v-slot:header="props">
                <q-tr :props="props">
                    <q-th auto-width >
                        <q-icon name="help_outline" />
                    </q-th>
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
                    <q-td auto-width>
                        {{props.row.period}}
                    </q-td>
                    <q-td
                        v-for="col in props.cols"
                        :key="col.name"
                        :props="props"
                    >
                        <span class="text-bold" :class="checkValueColor(col.value)">{{ `${col.value}` }}</span>
                        <span class="text-grey-7 text-caption">{{ `(${props.row[col.name+'Dif']})` }}</span>
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'PeriodTable',
    data(){
        return {
            tableRow: [
                {
                    period: 'Today',
                    gain: '+0.0%',
                    gainDif: '+1.23%',
                    profit: '$0.0',
                    profitDif: '+$40.23',
                    pips: '0.00',
                    pipsDif: '+15.2',
                    win: '0%',
                    winDif: '-66%',
                    trade: '0',
                    tradeDif: '-2',
                    lots: '0.00',
                    lotsDif: '-0.65',
                },
                {
                    period: 'This Week',
                    gain: '-0.0%',
                    gainDif: '+1.23%',
                    profit: '-$1.3',
                    profitDif: '+$40.23',
                    pips: '0.00',
                    pipsDif: '+15.2',
                    win: '0%',
                    winDif: '-66%',
                    trade: '0',
                    tradeDif: '-2',
                    lots: '0.00',
                    lotsDif: '-0.65',
                },
                {
                    period: 'This Month',
                    gain: '+0.0%',
                    gainDif: '+1.23%',
                    profit: '+$2.0',
                    profitDif: '+$40.23',
                    pips: '0.00',
                    pipsDif: '+15.2',
                    win: '0%',
                    winDif: '-66%',
                    trade: '0',
                    tradeDif: '-2',
                    lots: '0.00',
                    lotsDif: '-0.65',
                },
                {
                    period: 'This Year',
                    gain: '+0.0%',
                    gainDif: '+1.23%',
                    profit: '$0.0',
                    profitDif: '+$40.23',
                    pips: '0.00',
                    pipsDif: '+15.2',
                    win: '0%',
                    winDif: '-66%',
                    trade: '0',
                    tradeDif: '-2',
                    lots: '-0.00',
                    lotsDif: '-0.65',
                },
            ],
        }
    },
    components: {},
    created(){},
    methods: {
        moment,
        checkValueColor(val){
            let positiveMatch = /[+]/gi;
            let negativeMatch = /[-]/gi;
            let color = "";
            if(val.match(positiveMatch)){
                color = 'text-green-7';
            } else if(val.match(negativeMatch)){
                color = 'text-red-7';
            }

            return color;
        }
        // end
    },
    computed: {
        
        tableColumns: function(){
            // ["Business Name", "Address", "Category", "Call", "Remarks", "Action"];
            return [
                {
                    name: 'gain',
                    required: true,
                    label: 'Gain (Difference)',
                    align: 'left',
                    field: row => row.gain,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'profit',
                    required: true,
                    label: 'Profit (Difference)',
                    align: 'left',
                    field: row => row.profit,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'pips',
                    required: true,
                    label: 'Pips (Difference)',
                    align: 'left',
                    field: row => row.pips,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'win',
                    required: true,
                    label: 'Win % (Difference)',
                    align: 'left',
                    field: row => row.win,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'trade',
                    required: true,
                    label: 'Trade (Difference)',
                    align: 'left',
                    field: row => row.trade,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'lots',
                    required: true,
                    label: 'Lots (Difference)',
                    align: 'left',
                    field: row => row.lots,
                    format: val => `${val}`,
                    sortable: true
                },
                
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.title{
    font-weight: 600;
    font-size: 18pt;
}
</style>
