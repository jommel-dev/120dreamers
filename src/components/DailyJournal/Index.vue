<template>
  <div class="q-pa-md" style="width: 100%;">
    <div class="row">
      <div class="col col-md-2 q-pa-xs" style="height: 80vh;">
        <q-list class="rounded-borders" style="max-width: 600px">
          <q-item-label header>Daily Journal List</q-item-label>

          <q-item
            v-for="(item, index) in journals" 
            :key="index"
            class="rounded-borders q-mb-xs"
            style="border: 1px solid #80808024;"
            clickable
            :active="checkActiveJournal(formatDate(item.createdAt))"
           >
            <!-- <q-item-section avatar top>
              <q-icon name="sticky_note_2" color="warning" size="lg" />
            </q-item-section> -->
            <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-medium">[{{formatDate(item.createdAt)}}]</span>
              </q-item-label>
              <q-item-label caption lines="1">
                <div v-html="renderMarkdown(item.body)"></div>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col col-md-10 q-pa-sm" style="height: 80vh;">
        <q-card
          class="my-card"
          style="height: 100%;"
        >
          <Notebook  @journal-saved="fetchJournals"/>
        </q-card>
      </div>
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
import moment from 'moment'

export default {
  setup () {
    const journals = ref([])

    async function fetchJournals () {
      const user = LocalStorage.getItem('user')
      const userId = user ? user.uid : null
      let res = await listDocuments(`platforms/${userId}/journals`)

      journals.value = res.sort(() => { return -1 })
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
  methods: {
    moment,
    checkActiveJournal(val){
      return val === moment().format('l')
    }
  }
}
</script>
