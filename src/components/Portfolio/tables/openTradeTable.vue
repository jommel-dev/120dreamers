<template>
    <div>
        <q-table
            :rows="openTrades"
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
  name: 'openTradeTable',
  data () {
    return {
      tableRow: []
    }
  },
  props: {
    openTrades: Object
  },
  components: {},
  created () {},
  methods: {
    moment,
    checkValueColor (val) {
    //   const positiveMatch = /[+]/gi
      const negativeMatch = /[-]/gi
      let color = ''
      if (val.match(negativeMatch)) {
        color = 'text-red-7'
      } else {
        color = 'text-green-7'
      }

      return color
    }
    // end
  },
  // async mounted () {
  //   try {
  //     const trades = await getTrades()
  //     //   console.log({ trades })

  //     if (trades?.positions) {
  //       // console.log('setting positions value')
  //       this.tableRow = trades.positions
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
          name: 'openPrice',
          required: true,
          label: 'Open Price',
          align: 'left',
          field: row => `$${row.openPrice}`,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'sl',
          required: true,
          label: 'SL (Price)',
          align: 'left',
          field: row => row.stopLoss ?? 0,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'tp',
          required: true,
          label: 'TP (Price)',
          align: 'left',
          field: row => row.takeProfit ?? 0,
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
          label: 'Net Profit',
          align: 'left',
          field: row => row.profit,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'swap',
          required: true,
          label: 'Swap',
          align: 'left',
          field: row => row.swap,
          format: val => `${val}`,
          sortable: true
        }

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
