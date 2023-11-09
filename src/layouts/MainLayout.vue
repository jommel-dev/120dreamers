<template>
  <q-layout view="lHh Lpr lFf">
   <q-header class="bg-indigo-10 q-pa-sm" elevated>
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
      <!-- <q-btn unelevated rounded icon="addchart" color="white" text-color="black" to="/newTrade">Add Trade</q-btn> -->
      <!-- <q-btn unelevated rounded color="white" text-color="black" @click="openModal">Add trade log</q-btn>
      <q-btn unelevated rounded color="white" text-color="black" @click="openFilePicker">Import trade log (CSV)</q-btn> -->

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
          dense
          outlined
          bg-color="white"
          class="q-ml-sm q-mr-md"
          filled
          v-model="filterAccount"
          multiple
          emit-value
          map-options
          :options="options"
          label="Accounts"
          style="width: 260px;"
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
              <q-btn unelevated rounded class="q-mb-sm" color="primary" size="sm"  to="/account">My Profile</q-btn>
              <q-btn unelevated rounded color="primary" size="sm"  to="/allPlatforms">Add Broker</q-btn>

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
import { syncAccount } from '../stores/syncAccount'
const store = syncAccount()

const linksList = [
  {
    title: 'Dashboard',
    icon: 'dashboard',
    link: 'dashboard',
    code: 101
  },
  // {
  //   title: 'Daily Journal',
  //   icon: 'stacked_bar_chart',
  //   link: 'dailyJournal',
  //   code: 101
  // },
  {
    title: 'Portfolio',
    icon: 'insights',
    link: 'portfolio',
    code: 101
  },
  // {
  //   title: 'Trade Logs',
  //   icon: 'dvr',
  //   link: 'tradeLogs',
  //   code: 101
  // },
  {
    title: 'Dreamers University',
    icon: 'cast_for_education',
    link: 'dreamers',
    code: 101
  },
  {
    title: 'Account Profile',
    icon: 'dvr',
    link: 'account',
    code: 101
  },
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
    Profile
  },
  computed: {
    filteredMenus: function () {
      return this.linksList
    },
    getId () {
      return store.getSelectedId
    }
  },
  async created () {
    await this.fetchBrokers() // Fetch brokers when the component is created
    this.getDisplayNameFromLocalStorage()
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

      if (this.brokers.length > 0) {
        this.filterAccount = [this.options[0].value]
      }
    },
    async getCalendar () {
      const data = await this.$fireApi.trades.getCalendar({ platformIds: this.getId })
      if (data.accountInformation.balance) {

        let bal = data.accountInformation.balance
        this.balance = bal.toLocaleString("en-US")
      }
    }
  },
  watch: {

    filterAccount (newVal, oldVal) {
      store.setSelectedId(newVal)
      this.getCalendar()
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
