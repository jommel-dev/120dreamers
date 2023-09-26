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

     <q-toolbar-subtitle v-if="displayName">Welcome, {{ displayName }}!</q-toolbar-subtitle>

     <q-btn flat @click="logout">Logout</q-btn>
     <q-btn 
        dense 
        color="white"
        text-color="black"
        round 
        icon="manage_accounts"
      />
    </q-toolbar>
   </q-header>

    <q-drawer 
      show-if-above 
      v-model="leftDrawerOpen" 
      side="left" 
      bordered
      :mini="miniState"
    >
      <!-- drawer content -->
      Menus
    </q-drawer>

   <q-page-container>
    <router-view />
   </q-page-container>
  </q-layout>
</template>

<script>
import signout from 'src/firebase/firebase-signout'
import { LocalStorage } from 'quasar'

export default {
  name: 'MainLayout',
  data() {
    return {
      displayName: '',
      miniState: false,
    }
  },
  computed: {
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
</style>


<!-- <script setup>
import signout from 'src/firebase/firebase-signout'
import { useRouter } from 'vue-router'
import { LocalStorage } from 'quasar'

const getDisplayNameFromLocalStorage = () => {
  const user = LocalStorage.getItem('user')
  return user ? user.displayName : null
}

const displayName = getDisplayNameFromLocalStorage()

const router = useRouter()
const logout = () => {
  signout().then(() => {
    router.push('/login')
  })
}
</script> -->
