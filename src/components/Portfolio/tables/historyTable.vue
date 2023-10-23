<template>
    <div>
        <q-table
            :rows="tradeHistory"
            :columns="tableColumns"
            row-key="name"
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
                    <q-chip v-if="col.name === 'position'"
                        size="sm"
                        :color="col.value === 'Buy' ? 'green-7' : 'red-7'"
                        text-color="white"
                        :label="col.value"
                    />

                    <span v-else class="text-bold"
                        >
                        {{ `${col.value}` }}
                    </span>
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </div>
</template>

<script>
import moment from 'moment'
// import { getTrades } from 'src/firebase/firebase-functions'

export default {
  name: 'historyTable',
  data () {
    return {
      tableRow: []
    }
  },
  props: {
    tradeHistory: Object
  },
  components: {},
  created () {},
  methods: {
    moment,
    checkValueColor (val) {
      const value = val.split('$')[1]
      if (value) {
        if (parseFloat(value) > 0) {
          return 'text-green-7'
        } else if (parseFloat(value) < 0) {
          return 'text-red-7'
        }
      }
      return ''
    }
    // end
  },
  // async mounted () {
  //   try {
  //     const trades = await getTrades()
  //     //   console.log({ trades })

  //     if (trades?.history.historyOrders) {
  //       // console.log('setting history value')
  //       this.tableRow = trades.history.historyOrders
  //     }
  //   } catch (error) {
  //     console.error('Failed to fetch trades:', error)
  //   }
  // },
  computed: {

    tableColumns: function () {
      // ["Business Name", "Address", "Category", "Call", "Remarks", "Action"];
      return [
        {
          name: 'openDate',
          required: true,
          label: 'Open Date',
          align: 'left',
          field: row => moment(row.doneTime).format('MM.DD.YYYY HH:mm'),
          sortable: true
        },
        {
          name: 'closeDate',
          required: true,
          label: 'Close Date',
          align: 'left',
          field: row => moment(row.brokerTime).format('MM.DD.YYYY HH:mm'),
          sortable: true
        },
        {
          name: 'symbol',
          required: true,
          label: 'Symbol',
          align: 'left',
          field: row => row.symbol,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'position',
          required: true,
          label: 'Position',
          align: 'left',
          field: row => row.type === 'ORDER_TYPE_BUY' ? 'Buy' : 'Sell',
          format: val => `${val}`,
          sortable: true
        },
        // {
        //   name: 'lots',
        //   required: true,
        //   label: 'Lots',
        //   align: 'left',
        //   field: row => row.win,
        //   format: val => `${val}`,
        //   sortable: true
        // },
        {
          name: 'sl',
          required: true,
          label: 'SL (Price)',
          align: 'left',
          field: row => `$${row.stopLoss ?? 0}`,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'tp',
          required: true,
          label: 'TP (Price)',
          align: 'left',
          field: row => `$${row.takeProfit ?? 0}`,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'openPrice',
          required: true,
          label: 'Open Price',
          align: 'left',
          field: row => `$${row.openPrice}`,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'closePrice',
          required: true,
          label: 'Close Price',
          align: 'left',
          field: row => `$${row.openPrice}`,
          format: val => `${val}`,
          sortable: true
        },
        // {
        //   name: 'pips',
        //   required: true,
        //   label: 'Pips',
        //   align: 'left',
        //   field: row => row.lots,
        //   format: val => `${val}`,
        //   sortable: true
        // },
        {
          name: 'netProfit',
          required: true,
          label: 'Profit',
          align: 'left',
          field: row => row.profit ?? 0,
          format: val => `$${val}`,
          sortable: true
        }
        // {
        //   name: 'duration',
        //   required: true,
        //   label: 'Duration',
        //   align: 'left',
        //   field: row => row.swap,
        //   format: val => `${val}`,
        //   sortable: true
        // },
        // {
        //   name: 'gain',
        //   required: true,
        //   label: 'Gain',
        //   align: 'left',
        //   field: row => row.swap,
        //   format: val => `${val}`,
        //   sortable: true
        // }

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
