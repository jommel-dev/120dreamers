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
                  <Notebook  @journal-saved="fetchJournals"/>

                  <q-table
                    title="Journal Entries"
                    :rows="journals"
                    :columns="columns"
                    row-key="id"
                    dense
                  >
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="createdAt" :props="props">{{ formatDate(props.row.createdAt) }}</q-td>
                      <q-td key="body" :props="props">
                        <div v-html="renderMarkdown(props.row.body)"></div>
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </q-page>
            </q-page-container>
          </q-layout>
        </div>

    </div>
</template>

<script>
// eslint-disable-next-line import/namespace
import { marked } from 'marked'
import { ref } from 'vue'
import Notebook from './note/notebook.vue'
import listDocuments from 'src/firebase/firebase-list'
import { LocalStorage } from 'quasar'

export default {
  setup () {
    const journals = ref([])

    async function fetchJournals () {
      const user = LocalStorage.getItem('user')
      const userId = user ? user.uid : null
      journals.value = await listDocuments(`platforms/${userId}/journals`)
    }

    fetchJournals()

    const renderMarkdown = (text) => {
      return marked(text)
    }

    const formatDate = (val) => {
      return new Date(val.seconds * 1000).toLocaleDateString()
    }

    const columns = [
      { name: 'createdAt', label: 'Date', field: 'createdAt', align: 'left' },
      { name: 'body', label: 'Body', field: 'body', align: 'left' }
    ]

    return {
      formatDate,
      renderMarkdown,
      fetchJournals,
      columns,
      journals,
      drawer: ref(false)
    }
  },

  name: 'DailyJournalComponent',
  components: {
    Notebook
  },
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>
