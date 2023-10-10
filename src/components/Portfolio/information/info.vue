<template>
    <div>
        <div class="row no-wrap items-center">
            <div class="col text-bold ellipsis">
                Gain
            </div>
            <div class="col-auto text-green-7 text-bold  row no-wrap items-center">
                {{ lastGrowthValue }}
            </div>
        </div>
        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Abs. Gain
            </div>
            <div class="col-auto text-green-7 text-caption  row no-wrap items-center">
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
                {{ info.balance }}
            </div>
        </div>
        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Equity
            </div>
            <div class="col-auto text-grey-7 text-caption  row no-wrap items-center">
                {{ info.equity }}
            </div>
        </div>
        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Highest
            </div>
            <div class="col-auto text-grey-7 text-caption  row no-wrap items-center">
                (Sept. 10) $4042.67
            </div>
        </div>
        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Profit
            </div>
            <div class="col-auto text-green-7 text-bold text-caption  row no-wrap items-center">
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
    }
  }
}

</script>
