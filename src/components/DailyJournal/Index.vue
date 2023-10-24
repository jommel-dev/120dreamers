<template>
    <div class="q-pa-md" style="width: 100%;">
        <div class="q-pa-md">
          <q-layout view="hHh Lpr lff" container style="height: 500px" class="shadow-2 rounded-borders">
            <q-header elevated :class="$q.dark.isActive ? 'bg-primary' : 'bg-indigo-9'">
              <q-toolbar>
                <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
                <q-toolbar-title>Daily Journal</q-toolbar-title>
              </q-toolbar>
            </q-header>

            <q-drawer
              v-model="drawer"
              show-if-above
              :width="200"
              :breakpoint="500"
            >
              <q-scroll-area class="fit">
                <q-list padding class="menu-list">
                  <q-item clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon name="inbox" />
                    </q-item-section>

                    <q-item-section>
                     Journals/Notes
                    </q-item-section>
                  </q-item>

                  <q-item active clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon name="star" />
                    </q-item-section>

                    <q-item-section>
                     note 1 (example)
                    </q-item-section>
                  </q-item>
                  <q-item active clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon name="star" />
                    </q-item-section>

                    <q-item-section>
                     note 2 (example)
                    </q-item-section>
                  </q-item>

                  <!-- <q-item clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon name="send" />
                    </q-item-section>

                    <q-item-section>
                      Send
                    </q-item-section>
                  </q-item> -->

                  <!-- <q-item clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon name="drafts" />
                    </q-item-section>

                    <q-item-section>
                      Drafts
                    </q-item-section>
                  </q-item> -->
                </q-list>
              </q-scroll-area>
            </q-drawer>

            <q-page-container>
              <q-page padding>
                <!-- test note book -->
                  <Notebook/>
              </q-page>
            </q-page-container>
          </q-layout>
        </div>

    </div>
</template>

<script>
import { ref } from 'vue'
  import Notebook from './note/notebook.vue'
  

export default {
  setup () {
    return {
      drawer: ref(false)
    }
  },

  name: 'DailyJournalComponent',
  components: {
    Notebook,
  },
  data(){
    return {}
  },
  created(){},
  methods: {}
}
</script>
