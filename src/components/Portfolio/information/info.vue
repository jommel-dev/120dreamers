<template>
    <div>
        <div class="row no-wrap items-center">
            <div class="col text-bold ellipsis">
                Gain
            </div>
            <div class="col-auto text-green-7 text-bold  row no-wrap items-center">
                +250.45%
            </div>
        </div>
        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Abs. Gain
            </div>
            <div class="col-auto text-green-7 text-caption  row no-wrap items-center">
                +94.3%
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
        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Drawdown
            </div>
            <div class="col-auto text-grey-7 text-caption  row no-wrap items-center">
                35.3%
            </div>
        </div>

        <q-separator class="q-mt-sm q-mb-sm" />

        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Balance
            </div>
            <div class="col-auto text-grey-7 text-caption  row no-wrap items-center">
                $3043.67
            </div>
        </div>
        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Equity
            </div>
            <div class="col-auto text-grey-7 text-caption  row no-wrap items-center">
                $3044.67
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
                $3544.67
            </div>
        </div>
        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Interest
            </div>
            <div class="col-auto text-grey-7 text-bold text-caption  row no-wrap items-center">
                -$203.67
            </div>
        </div>

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
                $3000.00
            </div>
        </div>

        <q-separator class="q-mt-sm q-mb-sm" />

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
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'InfoCard',
  data(){
    return {
    }
  },
}
</script>
