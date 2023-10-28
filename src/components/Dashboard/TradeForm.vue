<template>
  <q-dialog v-model="modalOpen">
    <q-card class="wide-card">
      <q-card-section>
        <q-form  @submit.prevent="submitForm" ref="myForm">
          <q-input v-model="form.ticket" label="Ticket" required :rules="[val => !!val || 'Field is required']" />

          <q-input filled v-model="form.open" label="Open" required :rules="[val => (val && !isNaN(Date.parse(val))) || 'Please select a valid date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxyOpen" transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.open" @input="() => $refs.qDateProxyOpen.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input filled v-model="form.close" label="Close" required :rules="[val => (val && !isNaN(Date.parse(val))) || 'Please select a valid date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxyClose" transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.close" @input="() => $refs.qDateProxyClose.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-select
            filled
            v-model="form.type"
            :options="['buy', 'sell']"
            label="Type"
            emit-value
            map-options
            required
            :rules="[val => !!val || 'Field is required']"
          />

          <q-input v-model="form.volume" label="Volume" required :rules="[val => !!val || 'Field is required']"/>
          <q-input v-model="form.symbol" label="Symbol" required :rules="[val => !!val || 'Field is required']" />
          <q-input v-model="form.price" label="Price" type="number" required :rules="[val => !!val || 'Field is required']"/>
          <q-input v-model="form.sl" label="SL"/>
          <q-input v-model="form.tp" label="TP"/>
          <q-input v-model="form.swap" label="Swap" required :rules="[val => !!val || 'Field is required']"/>
          <q-input v-model="form.commissions" label="Commissions" type="number" required :rules="[val => !!val || 'Field is required']"/>
          <q-input v-model="form.profit" label="Profit" type="number" required :rules="[val => !!val || 'Field is required']"/>
          <q-input v-model="form.pips" label="Pips" required :rules="[val => !!val || 'Field is required']"/>
          <q-input v-model="form.tradeDuration" label="Trade duration in seconds" required :rules="[val => !!val || 'Field is required']"/>
          <q-select
            filled
            v-model="form.platform"
            :options="['MT4', 'MT5']"
            label="Platform"
            emit-value
            map-options
            required
            :rules="[val => !!val || 'Field is required']"
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
    submitForm () {
      this.$refs.myForm.validate().then(valid => {
        if (valid) {
          this.saveToFirestore()
        }
      })
    },
    async saveToFirestore () {
      this.isSaving = true
      const getCurrentTime = () => {
        const now = new Date()
        return {
          hours: now.getHours(),
          minutes: now.getMinutes(),
          seconds: now.getSeconds()
        }
      }

      const addCurrentTimeToDate = (dateStr) => {
        const date = new Date(dateStr)
        const currentTime = getCurrentTime()
        date.setHours(currentTime.hours)
        date.setMinutes(currentTime.minutes)
        date.setSeconds(currentTime.seconds)
        return date
      }

      const openDateTime = this.form.open ? addCurrentTimeToDate(this.form.open) : null
      const closeDateTime = this.form.close ? addCurrentTimeToDate(this.form.close) : null

      const data = {
        ticket: this.form.ticket,
        open: openDateTime ? Timestamp.fromMillis(openDateTime.getTime()) : null,
        close: closeDateTime ? Timestamp.fromMillis(closeDateTime.getTime()) : null,
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
