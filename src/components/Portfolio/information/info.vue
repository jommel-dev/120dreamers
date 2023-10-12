<template>
    <div>
        <div class="row no-wrap items-center">
            <div class="col text-bold ellipsis">
                Gain
            </div>
            <div class="col-auto text-bold row no-wrap items-center" :class="lastGrowthValue < 0 ? 'text-negative' : 'text-green-7'">
                {{ lastGrowthValue }}
            </div>
        </div>
        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Abs. Gain
            </div>
            <div class="col-auto text-caption  row no-wrap items-center" :class="lastGrowthValue < 0 ? 'text-negative' : 'text-green-7'">
                {{ lastGrowthValue }}
            </div>
        </div>

        <q-separator class="q-mt-sm q-mb-sm" />

        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Daily
            </div>
            <div class="col-auto text-grey-7 text-caption  row no-wrap items-center">
                0.15%
            </div>
        </div>
        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Monthly
            </div>
            <div class="col-auto text-grey-7 text-caption  row no-wrap items-center">
                4.33%
            </div>
        </div>
        <!-- <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Drawdown
            </div>
            <div class="col-auto text-grey-7 text-caption  row no-wrap items-center">
                35.3%
            </div>
        </div> -->

        <q-separator class="q-mt-sm q-mb-sm" />

        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Balance
            </div>
            <div class="col-auto text-grey-7 text-caption  row no-wrap items-center">
                {{ balance }}
            </div>
        </div>
        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Equity
            </div>
            <div class="col-auto text-grey-7 text-caption  row no-wrap items-center">
                {{ equity }}
            </div>
        </div>
        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Highest
            </div>
            <div class="col-auto text-grey-7 text-caption  row no-wrap items-center">
                {{ formattedHighestBalance }}
            </div>
        </div>
        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Profit
            </div>
            <div class="col-auto text-bold text-caption  row no-wrap items-center" :class="lastProfitValue < 0 ? 'text-negative' : 'text-green-7'">
                {{ lastProfitValue }}
            </div>
        </div>
        <!-- <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Interest
            </div>
            <div class="col-auto text-grey-7 text-bold text-caption  row no-wrap items-center">
                -$203.67
            </div>
        </div> -->

        <q-separator class="q-mt-sm q-mb-sm" />

        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Deposits
            </div>
            <div class="col-auto text-green-7 text-caption  row no-wrap items-center">
                $5000.00
            </div>
        </div>
        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Withdrawals
            </div>
            <div class="col-auto text-grey-7 text-caption  row no-wrap items-center">
                $0.00
            </div>
        </div>

        <!-- <q-separator class="q-mt-sm q-mb-sm" />

        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Updated
            </div>
            <div class="col-auto text-grey-7 text-caption  row no-wrap items-center">
                5 mins. ago
            </div>
        </div>
        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Tracking
            </div>
            <div class="col-auto text-grey-7 text-caption  row no-wrap items-center">
                123
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
  name: 'InfoCard',
  props: {
    infoStatsData: Object
  },
  data () {
    return {
      info: this.infoStatsData.accountInformation
    }
  },
  computed: {
    lastGrowthValue () {
      const keys = Object.keys(this.infoStatsData.growth)

      const lastKey = keys[keys.length - 1]

      const lastGrowthValue = this.infoStatsData.growth[lastKey].growth

      return lastGrowthValue
    },
    lastProfitValue () {
      const keys = Object.keys(this.infoStatsData.profits)

      const lastKey = keys[keys.length - 1]

      const lastProfitValue = this.infoStatsData.profits[lastKey].profit

      return lastProfitValue
    },
    highestBalance () {
      // Use the reduce function to find the highest balance in the array
      return this.infoStatsData.balance.reduce((max, item) => (item.balance > max ? item.balance : max), 0)
    },
    formattedHighestBalance () {
      const highestBalance = this.highestBalance.toFixed(2) // Round to two decimal places
      const date = this.infoStatsData.balance.find(item => item.balance === this.highestBalance).date
      const formattedDate = new Date(date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })

      return `(${formattedDate}) $${highestBalance.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
    },
    equity () {
      const equity = this.info.equity.toFixed(2)
      const percentage = (this.info.equity / this.info.balance) * 100
      return `(${percentage.toFixed(2)}%) $${equity.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
    },
    balance () {
      const balance = this.info.balance.toFixed(2)
      return `$${balance.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
    }
  }
}

</script>
