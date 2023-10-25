<template>
  <q-page class="q-pa-lg">

     <q-toolbar class="bg-primary text-white">
      <!-- <q-btn flat round dense icon="menu" class="q-mr-sm" /> -->
      <q-btn class="q-mr-sm" size="lg" icon="add_link" unelevated rounded  text-color="white"  to="/newTrade">
        <q-tooltip>Add New Broker</q-tooltip>
      </q-btn>
      <q-btn class="q-mr-sm" size="lg"  icon="add_chart" unelevated rounded text-color="white" @click="openModal">
        <q-tooltip>Add Trade Log</q-tooltip>
      </q-btn>
      <q-btn icon="upload_file" size="lg"  unelevated rounded  text-color="white" @click="openFilePicker">
        <q-tooltip>Import trade log (CSV)</q-tooltip>
      </q-btn>
      <!-- <q-toolbar-title>Quasar Framework</q-toolbar-title> -->

      
    </q-toolbar>

    
    <q-table
      title="Broker List"
      :rows="brokers"
      :columns="columns"
      row-key="id"
      :filter="search"
    >
      <template v-slot:top-right>
        <q-input v-model="search" outlined dense clearable debounce="300" placeholder="Search brokers...">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>

    <TradeForm ref="tradeFormModal" />

    <!-- Hidden input element for file picking -->
    <input
      ref="fileInput"
      type="file"
      accept=".csv,text/csv"
      style="display: none"
      @change="handleFileSelected"
      
    />
  </q-page>
</template>

<script>
import { LocalStorage } from 'quasar'
import listDocuments from 'src/firebase/firebase-list'
import TradeForm from '../components/Dashboard/TradeForm.vue'
import Papa from 'papaparse'
import { Timestamp } from '@firebase/firestore'
import createDocument from 'src/firebase/firebase-create'

export default {
  name: 'BrokerList',
  components:{
    TradeForm
  },
  data(){
    return {
      brokers: [],
      search: ''
    }
  },
  computed:{
    columns(){
      return [
        { name: 'broker', required: true, label: 'Broker', align: 'left', field: 'broker' },
        { name: 'brokerName', label: 'Broker Name', align: 'left', field: 'brokerName' },
        { name: 'server', label: 'Server', align: 'left', field: 'server' },
        { name: 'username', label: 'Username', align: 'left', field: 'username' },
        { name: 'createdAt', label: 'Created At', align: 'left', field: row => row.createdAt?.toDate().toLocaleString(), sortable: true }
      ]
    }
  },
  created(){
    this.fetchBrokers()
  },
  methods: {
    openModal () {
      this.$refs.tradeFormModal.openModal()
    },
    openFilePicker () {
      this.$refs.fileInput.click()
    },
    async fetchBrokers(){
      const user = LocalStorage.getItem('user')
      const userId = user ? user.uid : null
      this.brokers = await listDocuments(`platforms/${userId}/brokers`)
    },
    handleFileSelected (event) {
      const selectedFile = event.target.files[0]
      if (selectedFile) {
        console.log('File selected:', selectedFile.name)
        const user = LocalStorage.getItem('user')
        Papa.parse(selectedFile, {
          complete: async (results) => {
            for (const row of results.data) {
            // Assuming the first row of CSV contains headers
              if (results.data.indexOf(row) === 0) continue

              const data = {
                ticket: row[0],
                open: Timestamp.fromDate(new Date(row[1])),
                type: row[2],
                volume: row[3],
                symbol: row[4],
                price: parseFloat(row[5]),
                sl: row[6],
                tp: row[7],
                close: Timestamp.fromDate(new Date(row[8])),
                price: parseFloat(row[9]),
                swap: row[10],
                commissions: parseFloat(row[11]),
                profit: parseFloat(row[12]),
                pips: row[13],
                tradeDuration: row[14]
              }

              try {
                const userId = user ? user.uid : null
                if (userId) {
                  await createDocument(`platforms/${userId}/trades`, data)
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
              }
            }

            this.$q.notify({
              type: 'positive',
              message: 'Data imported successfully!'
            })
          }
        })
      }
    }
  },
}
</script>
