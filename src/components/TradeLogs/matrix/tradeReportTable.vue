<template>
    <div>
        <q-table
            class="q-mt-md"
            :rows="tableRow"
            :columns="tableColumns"
            row-key="id"
            dense
            title="Trade Reports"
            selection="multiple"
            v-model:selected="selected"
        >
            <template v-slot:body-cell-platform="props">
                <q-td :props="props">
                    <span class="text-bold">{{props.row.platform}}</span>
                </q-td>
            </template>
            <template v-slot:body-cell-netPL="props">
                <q-td :props="props">
                    <span 
                        class="text-bold" 
                        :class="checkValueColor(props.row.netPL)"
                    >
                        {{ `${props.row.netPL}` }}
                    </span>
                </q-td>
            </template>
            <template v-slot:body-cell-netROI="props">
                <q-td :props="props">
                    <span class="text-bold" :class="checkValueColor(props.row.netROI)">{{ `${props.row.netROI}` }}</span>
                </q-td>
            </template>
            <template v-slot:body-cell-status="props">
                <q-td :props="props">
                    <q-chip 
                        size="sm"
                        :color="checkStatus(props.row.status)" 
                        text-color="white" 
                        :icon="checkStatusIcon(props.row.status)" 
                        :label="props.row.status" 
                    />
                </q-td>
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
            selected: [],
            tableRow: [
                {
                    id: 1,
                    platform: 'META',
                    exitPrice: '$2.42',
                    entryPrice: '$1.23',
                    netPL: '+$423.44',
                    netROI: '+40.23%',
                    status: 'WIN',
                    side: 'PUT',
                    setup: 'Tesst',
                    scale: '66',
                    realizedMultiple: '-',
                },
                {
                    id: 2,
                    platform: 'AMZN',
                    exitPrice: '$2.42',
                    entryPrice: '$4.23',
                    netPL: '-$423.44',
                    netROI: '-40.23%',
                    status: 'LOST',
                    side: 'PUT',
                    setup: 'Tesst',
                    scale: '66',
                    realizedMultiple: '-',
                },
                {
                    id: 3,
                    platform: 'META',
                    exitPrice: '$2.42',
                    entryPrice: '$1.23',
                    netPL: '+$423.44',
                    netROI: '+40.23%',
                    status: 'WIN',
                    side: 'PUT',
                    setup: 'Tesst',
                    scale: '66',
                    realizedMultiple: '-',
                },
                {
                    id: 4,
                    platform: 'AMZN',
                    exitPrice: '$2.42',
                    entryPrice: '$4.23',
                    netPL: '-$423.44',
                    netROI: '-40.23%',
                    status: 'LOST',
                    side: 'PUT',
                    setup: 'Tesst',
                    scale: '66',
                    realizedMultiple: '-',
                },
                {
                    id: 5,
                    platform: 'META',
                    exitPrice: '$2.42',
                    entryPrice: '$1.23',
                    netPL: '+$423.44',
                    netROI: '+40.23%',
                    status: 'WIN',
                    side: 'PUT',
                    setup: 'Tesst',
                    scale: '66',
                    realizedMultiple: '-',
                },
                {
                    id: 6,
                    platform: 'AMZN',
                    exitPrice: '$2.42',
                    entryPrice: '$4.23',
                    netPL: '-$423.44',
                    netROI: '-40.23%',
                    status: 'LOST',
                    side: 'PUT',
                    setup: 'Tesst',
                    scale: '66',
                    realizedMultiple: '-',
                },
            ],
        }
    },
    components: {},
    created(){},
    methods: {
        moment,
        checkStatus(val){
            let color = "";
            if(val === "WIN"){
                color = 'green-7';
            } else {
                color = 'red-7';
            }

            return color
        },
        checkStatusIcon(val){
            let icon = "";
            if(val === "WIN"){
                icon = 'ion-trending-up';
            } else {
                icon = 'ion-trending-down';
            }

            return icon
        },
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
            
            return [
                {
                    name: 'platform',
                    required: true,
                    label: 'Platform',
                    align: 'center',
                    field: row => row.platform,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'exitPrice',
                    required: true,
                    label: 'Exit Price',
                    align: 'center',
                    field: row => row.exitPrice,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'entryPrice',
                    required: true,
                    label: 'Entry Price',
                    align: 'center',
                    field: row => row.entryPrice,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'netPL',
                    required: true,
                    label: 'Net P&L',
                    align: 'center',
                    field: row => row.netPL,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'netROI',
                    required: true,
                    label: 'Net ROI',
                    align: 'center',
                    field: row => row.netROI,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'status',
                    required: true,
                    label: 'Trade Status',
                    align: 'center',
                    field: row => row.status,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'side',
                    required: true,
                    label: 'Side',
                    align: 'center',
                    field: row => row.side,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'setup',
                    required: true,
                    label: 'Setups',
                    align: 'center',
                    field: row => row.setup,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'scale',
                    required: true,
                    label: 'Dreamer Scale',
                    align: 'center',
                    field: row => row.scale,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'realizedMultiple',
                    required: true,
                    label: 'Realized R Multiple',
                    align: 'center',
                    field: row => row.realizedMultiple,
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
