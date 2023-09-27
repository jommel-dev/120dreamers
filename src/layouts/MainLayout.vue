<template>
  <q-layout view="lHh Lpr lFf">
   <q-header elevated>
    <q-toolbar>
      <q-btn 
        dense 
        color="primary" 
        round
        unelevated
        :icon="miniState ? 'navigate_next' : 'chevron_left'"
        class="drawerBtn"
        @click="toggleLeftDrawer" 
      />
     <q-toolbar-title>
      Application Title
     </q-toolbar-title>

     <!-- <q-toolbar-subtitle v-if="displayName">Welcome, {{ displayName }}!</q-toolbar-subtitle> -->

     <!-- <q-btn flat @click="logout">Logout</q-btn> -->
     <q-btn 
        dense 
        color="white"
        text-color="black"
        round 
        icon="paid"
      />
      <q-select
          filled
          color="black"
          v-model="filterAccount"
          :options="options"
          label="Accounts"
          multiple
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
      <Profile v-if="!miniState" :fullName.sync="displayName" />
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
import SideNav from '../components/Templates/Sidenav.vue';
import Profile from '../components/Templates/Profile.vue';

const linksList = [
  {
    title: 'Dashboard',
    icon: 'dashboard',
    link: 'dashboard',
    code: 101
  }
];

export default {
  name: 'MainLayout',
  data() {
    return {
      linksList,
      displayName: '',
      miniState: false,
      filterAccount: [2],
      options: [
        {
          label: 'Account 1',
          value: 2
        },
        {
          label: 'Account 2',
          value: 3
        },
        {
          label: 'Account 3',
          value: 4
        },
        {
          label: 'Account 4',
          value: 5
        }
      ]
    }
  },
  components:{
    SideNav,
    Profile
  },
  computed: {
    filteredMenus: function(){
      return this.linksList;
    },
    getDisplayNameFromLocalStorage(){
      const user = LocalStorage.getItem('user')
      this.displayName = user ? user.displayName : null;
    }
  },
  created(){
    this.getDisplayNameFromLocalStorage
  }, 
  methods: {
    toggleLeftDrawer () {
      this.miniState = !this.miniState
    },
    async logout(){
      signout().then(() => {
        this.$router.push('/login')
      })
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