<template>
  <q-layout view="lHh Lpr lFf">
   <q-header class="bg-indigo-10" elevated>
    <q-toolbar>
      <q-btn
        dense
        color="indigo-10"
        round
        unelevated
        :icon="miniState ? 'navigate_next' : 'chevron_left'"
        class="drawerBtn"
        @click="toggleLeftDrawer"
      />
     <q-toolbar-title>
      <q-btn unelevated rounded icon="addchart" color="white" text-color="black" to="/newTrade">Add Trade</q-btn>
      <q-btn unelevated rounded color="white" text-color="black" @click="openModal">Add trade log</q-btn>
      <q-btn unelevated rounded color="white" text-color="black" @click="openFilePicker">Import trade log (CSV)</q-btn>

      <!-- Hidden input element for file picking -->
      <input
        ref="fileInput"
        type="file"
        accept=".csv,text/csv"
        style="display: none"
        @change="handleFileSelected"
      />
     </q-toolbar-title>

     <!-- <q-toolbar-subtitle v-if="displayName">Welcome, {{ displayName }}!</q-toolbar-subtitle> -->

     <!-- <q-btn flat @click="logout">Logout</q-btn> -->
     <q-btn
        dense
        color=""
        text-color="amber-7"
        icon="paid"
        :label="balance"
      />
      <q-select
          filled
          color="black"
          v-model="filterAccount"
          :options="options"
          label="Accounts"
          dense
          outlined
          bg-color="white"
          emit-value
          map-options
          class="q-ml-sm q-mr-sm"
          style="width: 200px;"
      >
        <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
          <q-item v-bind="itemProps">
            <q-item-section>
              <q-item-label v-html="opt.label" />
            </q-item-section>
            <q-item-section side>
              <q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-btn
        dense
        color="white"
        text-color="black"
        round
        icon="manage_accounts"
      >
        <q-menu>
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">Settings</div>
              <q-toggle v-model="mobileData" label="Use Mobile Data" />
              <!-- <q-toggle v-model="bluetooth" label="Bluetooth" /> -->
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <q-avatar size="72px">
                <q-icon name="account_circle" size="xl" />
              </q-avatar>

              <q-btn
                color="primary"
                label="Logout"
                push
                size="sm"
                @click="logout"
                v-close-popup
              />
            </div>
          </div>
        </q-menu>
      </q-btn>
    </q-toolbar>
   </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :mini="miniState"
      dark
      class="gradient-bg"
    >
      <!-- drawer content -->
      <Profile v-if="!miniState" v-model:fullName="displayName" />
      <q-avatar v-if="miniState" class="q-pa-xs">
        <q-icon name="account_circle" />
      </q-avatar>
      <q-separator dark />
      <SideNav
        v-for="link in filteredMenus"
        :key="link.title"
        v-bind="link"
        @linkCrumbs="setCrumbsItem"
      />
    </q-drawer>

    <TradeForm ref="tradeFormModal" />

   <q-page-container>
    <router-view />
   </q-page-container>
  </q-layout>
</template>

<script>
import signout from 'src/firebase/firebase-signout'
import { LocalStorage } from 'quasar'
import SideNav from '../components/Templates/Sidenav.vue'
import Profile from '../components/Templates/Profile.vue'
import listDocuments from 'src/firebase/firebase-list'
import TradeForm from '../components/Dashboard/TradeForm.vue'
import Papa from 'papaparse'
import { Timestamp } from '@firebase/firestore'
import createDocument from 'src/firebase/firebase-create'

const linksList = [
  {
    title: 'Dashboard',
    icon: 'dashboard',
    link: 'dashboard',
    code: 101
  },
  {
    title: 'Daily Journal',
    icon: 'stacked_bar_chart',
    link: 'dailyJournal',
    code: 101
  },
  {
    title: 'Portfolio',
    icon: 'insights',
    link: 'portfolio',
    code: 101
  },
  {
    title: 'Trade Logs',
    icon: 'dvr',
    link: 'tradeLogs',
    code: 101
  },
  {
    title: 'Dreamers University',
    icon: 'cast_for_education',
    link: 'dreamers',
    code: 101
  }
]

export default {
  name: 'MainLayout',
  data () {
    return {
      linksList,
      brokers: [], // Add this line to store the brokers
      displayName: '',
      miniState: false,
      filterAccount: [],
      options: [], // initialize as an empty array
      balance: 0
    }
  },
  components: {
    SideNav,
    Profile,
    TradeForm
  },
  computed: {
    filteredMenus: function () {
      return this.linksList
    }
  },
  async created () {
    await this.fetchBrokers() // Fetch brokers when the component is created
    this.getDisplayNameFromLocalStorage()

    const savedBrokerId = LocalStorage.getItem('selectedBrokerId')
    if (savedBrokerId && this.brokers.some(broker => broker.id === savedBrokerId)) {
      this.filterAccount = savedBrokerId
    } else if (this.brokers.length > 0) {
      this.filterAccount = this.brokers[0].id
    }

    this.getCalendar()
  },
  methods: {
    toggleLeftDrawer () {
      this.miniState = !this.miniState
    },
    async logout () {
      signout().then(() => {
        this.$router.push('/login')
      })
    },
    getDisplayNameFromLocalStorage () {
      const user = LocalStorage.getItem('user')
      this.displayName = user ? user.displayName : null
    },
    async fetchBrokers () {
      const user = LocalStorage.getItem('user')
      const userId = user ? user.uid : null
      this.brokers = await listDocuments(`platforms/${userId}/brokers`)
      this.options = this.brokers.map(broker => {
        return {
          label: broker.brokerName,
          value: broker.id
        }
      })

      if (!this.filterAccount && this.brokers.length > 0) {
        this.filterAccount = this.brokers[0].id
      }
    },
    async getCalendar () {
      const data = await this.$fireApi.trades.getCalendar()
      if (data.accountInformation.balance) {
        this.balance = data.accountInformation.balance
      }
    },
    openModal () {
      this.$refs.tradeFormModal.openModal()
    },
    openFilePicker () {
      this.$refs.fileInput.click()
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
  watch: {
    filterAccount (newVal, oldVal) {
      LocalStorage.set('selectedBrokerId', newVal)
      // added condition to prevent reload on init
      if (typeof oldVal === 'string' && typeof newVal === 'string') {
        window.location.reload()
      }
    }
  }
}
</script>

<style scoped>
.drawerBtn{
  position: absolute;
  left: -15px;
}
.gradient-bg{
  background: rgb(2,0,36);
  background: linear-gradient(349deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 41%, rgba(0,212,255,1) 100%);
}
</style>
