<template>
    <q-layout view="hHh lpR fFf" class="bg-grey-1">

         <!-- <q-toolbar>
          <q-btn
            flat
            dense
            round
            @click="toggleLeftDrawer"
            aria-label="Menu"
            icon="menu"
          />
        </q-toolbar> -->
      

    

  
      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        class="bg-grey-2"
        :width="240"
      >
        <q-scroll-area class="fit">
          <q-list padding>
            <q-item v-for="link in links1" :key="link.text" v-ripple clickable>
              <q-item-section avatar>
                <q-icon color="grey" :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>
  
            <q-separator class="q-my-md" />
  
            <q-item v-for="link in links2" :key="link.text" v-ripple clickable>
              <q-item-section avatar>
                <q-icon color="grey" :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>
  
            <q-separator class="q-mt-md q-mb-xs" />
  
            <q-item-label header class="text-weight-bold text-uppercase">
              More from 120 Dreamers
            </q-item-label>
  
            <q-item v-for="link in links3" :key="link.text" v-ripple clickable>
              <q-item-section avatar>
                <q-icon color="grey" :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>
  
            <q-separator class="q-my-md" />
  
            <q-item v-for="link in links4" :key="link.text" v-ripple clickable>
              <q-item-section avatar>
                <q-icon color="grey" :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>
  
            <q-separator class="q-mt-md q-mb-lg" />
  
            <div class="q-px-md text-grey-9">
              <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
                <a
                  v-for="button in buttons1"
                  :key="button.text"
                  class="YL__drawer-footer-link"
                  href="javascript:void(0)"
                >
                  {{ button.text }}
                </a>
              </div>
            </div>
            <div class="q-py-md q-px-md text-grey-9">
              <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
                <a
                  v-for="button in buttons2"
                  :key="button.text"
                  class="YL__drawer-footer-link"
                  href="javascript:void(0)"
                >
                  {{ button.text }}
                </a>
              </div>
            </div>
          </q-list>
        </q-scroll-area>
      </q-drawer>
  
      <q-page-container>
        <!-- <router-view /> -->
        <!-- test  -->
        <!-- <div class="YL__toolbar-input-container row no-wrap">
            <q-input dense outlined square v-model="search" placeholder="Search" class="bg-white col" />
            <q-btn class="YL__toolbar-input-btn" color="grey-3" text-color="grey-8" icon="search" unelevated />
        </div> -->

        <!-- video placement sample -->
        <div class="sample-stream">
          <Content />
        </div>
      </q-page-container>
    </q-layout>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { fabYoutube } from '@quasar/extras/fontawesome-v6'
  import Content from './content.vue'
  
  export default {
    name: 'MyLayout',
    components: {
      Content
    },
  
    setup () {
      const leftDrawerOpen = ref(false)
      const search = ref('')
  
      function toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
  
      return {
        fabYoutube,
  
        leftDrawerOpen,
        search,
  
        toggleLeftDrawer,
  
        links1: [
          { icon: 'home', text: 'Home' },
          { icon: 'whatshot', text: 'Trending' },
          { icon: 'subscriptions', text: 'Subscriptions' }
        ],
        links2: [
          { icon: 'folder', text: 'Library' },
          { icon: 'restore', text: 'History' },
          { icon: 'watch_later', text: 'Watch later' },
          { icon: 'thumb_up_alt', text: 'Liked videos' }
        ],
        links3: [
          { icon: fabYoutube, text: 'YouTube Premium' },
          { icon: 'local_movies', text: 'Movies & Shows' },
          { icon: 'videogame_asset', text: 'Gaming' },
          { icon: 'live_tv', text: 'Live' }
        ],
        links4: [
          { icon: 'settings', text: 'Settings' },
          { icon: 'flag', text: 'Report history' },
          { icon: 'help', text: 'Help' },
          { icon: 'feedback', text: 'Send feedback' }
        ],
        buttons1: [
          { text: 'About' },
          { text: 'Press' },
          { text: 'Copyright' },
          { text: 'Contact us' },
          { text: 'Creators' },
          { text: 'Advertise' },
          { text: 'Developers' }
        ],
        buttons2: [
          { text: 'Terms' },
          { text: 'Privacy' },
          { text: 'Policy & Safety' },
          { text: 'Test new features' }
        ]
      }
    }
  }
  </script>
  
  <style >




    
  </style>