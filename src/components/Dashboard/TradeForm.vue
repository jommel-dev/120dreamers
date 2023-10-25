<template>
  <q-dialog v-model="modalOpen">
    <q-card class="wide-card">
      <q-card-section>
        <q-form @submit="saveToFirestore">
          <q-input v-model="form.ticket" label="Ticket" />

          <!-- Open date picker -->
          <q-input filled v-model="form.open" label="Open">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxyOpen" transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.open" @input="() => $refs.qDateProxyOpen.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <!-- Close date picker -->
          <q-input filled v-model="form.close" label="Close">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxyClose" transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.close" @input="() => $refs.qDateProxyClose.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input v-model="form.type" label="Type" />
          <q-input v-model="form.volume" label="Volume" />
          <q-input v-model="form.symbol" label="Symbol" />
          <q-input v-model="form.price" label="Price" type="number"/>
          <q-input v-model="form.sl" label="SL" />
          <q-input v-model="form.tp" label="TP" />
          <q-input v-model="form.swap" label="Swap" />
          <q-input v-model="form.commissions" label="Commissions" type="number" />
          <q-input v-model="form.profit" label="Profit" type="number" />
          <q-input v-model="form.pips" label="Pips" />
          <q-input v-model="form.tradeDuration" label="Trade duration in seconds" />
          <q-select
            filled
            v-model="form.platform"
            :options="['MT4', 'MT5']"
            label="Platform"
            emit-value
            map-options
          />
          <div>
            <q-btn label="Save" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.wide-card {
  width: 80vw;
}
</style>

<script>
import { Timestamp } from '@firebase/firestore'
import { LocalStorage } from 'quasar'
import createDocument from 'src/firebase/firebase-create'

export default {
  data () {
    return {
      modalOpen: false,
      form: {
        ticket: '',
        open: '',
        type: '',
        volume: '',
        symbol: '',
        price: 0,
        sl: '',
        tp: '',
        close: '',
        swap: '',
        commissions: 0,
        profit: 0,
        pips: '',
        tradeDuration: '',
        tradeDate: null,
        platform: 'MT4'
      }
    }
  },
  methods: {
    openModal () {
      this.modalOpen = true
    },
    async saveToFirestore () {
      this.isSaving = true

      const data = {
        ticket: this.form.ticket,
        open: this.form.open ? Timestamp.fromDate(new Date(this.form.open)) : null,
        close: this.form.close ? Timestamp.fromDate(new Date(this.form.close)) : null,
        type: this.form.type,
        volume: this.form.volume,
        symbol: this.form.symbol,
        price: parseFloat(this.form.price),
        sl: this.form.sl,
        tp: this.form.tp,
        swap: this.form.swap,
        commissions: parseFloat(this.form.commissions),
        profit: parseFloat(this.form.profit),
        pips: this.form.pips,
        tradeDuration: this.form.tradeDuration,
        createdAt: Timestamp.now(),
        platform: this.form.platform.toLowerCase()
      }

      try {
        const user = LocalStorage.getItem('user')
        const userId = user ? user.uid : null
        if (userId) {
          await createDocument(`platforms/${userId}/trades`, data)
          this.$q.notify({
            type: 'positive',
            message: 'Data saved successfully!'
          })
        } else {
          this.$q.notify({
            type: 'negative',
            message: 'Missing user id!'
          })
        }
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: `Error saving data: ${error.message}`
        })
      } finally {
        this.isSaving = false
        this.modalOpen = false
      }
    }

  }
}
</script>
