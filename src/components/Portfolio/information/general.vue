<template>
    <div>
        <div class="row no-wrap items-center">
            <div class="col text-bold ellipsis">
                Description:
            </div>
            <br />
            <div class="col-auto text-bold  row no-wrap items-center">
                No Description enetred.
            </div>
        </div>

        <q-separator class="q-mt-sm q-mb-sm" />

        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Views:
            </div>
            <div class="col-auto text-green-7 text-caption  row no-wrap items-center">
                0
            </div>
        </div>
        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Broker:
            </div>
            <div class="col-auto text-green-7 text-caption  row no-wrap items-center">
                {{ generalData.broker }}
            </div>
        </div>
        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Leverage:
            </div>
            <div class="col-auto text-green-7 text-caption  row no-wrap items-center">
                1:{{ generalData.leverage }}
            </div>
        </div>
        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Type:
            </div>
            <div class="col-auto text-green-7 text-caption  row no-wrap items-center">
                {{ generalData.name }}
            </div>
        </div>
        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                System:
            </div>
            <div class="col-auto text-green-7 text-caption  row no-wrap items-center">
                -
            </div>
        </div>
        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Trading:
            </div>
            <div class="col-auto text-green-7 text-caption  row no-wrap items-center">
                -
            </div>
        </div>
        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Started:
            </div>
            <div class="col-auto text-green-7 text-caption  row no-wrap items-center">
                Oct 05, 2023
            </div>
        </div>
        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Status:
            </div>
            <div class="col-auto text-green-7 text-caption  row no-wrap items-center">
                <q-badge rounded color="orange" label="Private" />
            </div>
        </div>
        <div class="row no-wrap items-center">
            <div class="col text-grey-7 ellipsis">
                Timezone:
            </div>
            <div class="col-auto text-green-7 text-caption  row no-wrap items-center">
                GMT +3
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'InfoCard',
  props: {
    generalData: Object
  },
  data(){
    return {
    }
  },
}
</script>
