<template>
    <div class="q-pa-md q-gutter-sm">
      <q-btn outline rounded color="primary" icon="add" label="New Note" @click="addJournalArray" :loading="isSaving" />
      <!-- <span class="text-h5">{{displayDate}}</span> -->
      <!-- <div v-for="(journal, index) in journalList" :key="index"> -->
        <q-editor
        v-model="qeditor"
        :dense="$q.screen.lt.md"
        :toolbar="[
          [
            {
              label: $q.lang.editor.align,
              icon: $q.iconSet.editor.align,
              fixedLabel: true,
              list: 'only-icons',
              options: ['left', 'center', 'right', 'justify']
            },
            {
              label: $q.lang.editor.align,
              icon: $q.iconSet.editor.align,
              fixedLabel: true,
              options: ['left', 'center', 'right', 'justify']
            }
          ],
          ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
          ['token', 'hr', 'link', 'custom_btn'],
          ['print', 'fullscreen'],
          [
            {
              label: $q.lang.editor.formatting,
              icon: $q.iconSet.editor.formatting,
              list: 'no-icons',
              options: [
                'p',
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'code'
              ]
            },
            {
              label: $q.lang.editor.fontSize,
              icon: $q.iconSet.editor.fontSize,
              fixedLabel: true,
              fixedIcon: true,
              list: 'no-icons',
              options: [
                'size-1',
                'size-2',
                'size-3',
                'size-4',
                'size-5',
                'size-6',
                'size-7'
              ]
            },
            {
              label: $q.lang.editor.defaultFont,
              icon: $q.iconSet.editor.font,
              fixedIcon: true,
              list: 'no-icons',
              options: [
                'default_font',
                'arial',
                'arial_black',
                'comic_sans',
                'courier_new',
                'impact',
                'lucida_grande',
                'times_new_roman',
                'verdana'
              ]
            },
            'removeFormat'
          ],
          ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

          ['undo', 'redo'],
          ['viewsource']
        ]"
        :fonts="{
          arial: 'Arial',
          arial_black: 'Arial Black',
          comic_sans: 'Comic Sans MS',
          courier_new: 'Courier New',
          impact: 'Impact',
          lucida_grande: 'Lucida Grande',
          times_new_roman: 'Times New Roman',
          verdana: 'Verdana'
        }"
      />
      <!-- <div class="">
        <q-btn
        outline
        rounded
        color="primary"
        icon="delete"
        class="q-mt-sm"
        label="Remove"
        @click="removeJournal(index)"
        :loading="isSaving"
      />
      </div> -->
      <!-- </div> -->
      <q-btn 
        outline 
        rounded 
        color="primary" 
        icon="stream"
        :label="status === 'create' ? 'Save Note' : 'Update Note'" 
        @click="status === 'create' ? saveToFirestore() : updateToFirestore()" 
        :loading="isSaving" />
      

      </div>
</template>

<script>
import { Timestamp } from '@firebase/firestore'
import { LocalStorage } from 'quasar'
import createDocument from 'src/firebase/firebase-create'
import getQueryWithFilter from 'src/firebase/firebase-query'
import updateDocument from 'src/firebase/firebase-update'
import moment from 'moment'

const currDate = moment().format('YYYY-MM-DD')

export default {
  data () {
    return {
      isSaving: false,
      displayDate: currDate,
      status: 'create',
      qeditor: '<pre>Loading journal...</pre>',
      journalList: [],
      journalIds: [],
      journalID: '',
    }
  },
  props: {
    dateSelected: String,
    noteSelected: Object
  },
  watch: {
    dateSelected: {
      immediate: true,
      handler (newVal) {
        this.displayDate = newVal
        this.loadJournal()
      }
    },
    noteSelected: {
      immediate: true,
      handler (newVal) {
        this.status = 'update'
        this.qeditor = newVal.body
        this.journalID = newVal.id
      }
    }
  },
  methods: {
    async loadJournal () {
      const user = LocalStorage.getItem('user')
      const userId = user ? user.uid : null
      if (userId) {
        const journals = await getQueryWithFilter(`platforms/${userId}/journals`, 'dateOnly', this.displayDate)
        if (journals.length) {
          this.journalList = journals.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds)
          this.journalIds = journals.map((journal) => journal.id)
          this.$emit("listOfNotes", journals)
          this.qeditor = journals[0].body
          this.journalID = journals[0].id
          this.status = 'update'
        } else {
          this.qeditor = '<pre>No journal entry for today.</pre>'
          // this.journalList = [{ body: '<pre>New journal.</pre>' }]
        }
      }
    },

    async saveToFirestore () {
      this.isSaving = true

      try {
        // const today = new Date().toISOString().split('T')[0]

        const user = LocalStorage.getItem('user')
        const userId = user ? user.uid : null
        if (userId) {
          // const journals = await getQueryWithFilter(`platforms/${userId}/journals`, 'dateOnly', this.displayDate)
          const data = {
            createdAt: Timestamp.now(),
            dateOnly: this.displayDate
          }

          createDocument(`platforms/${userId}/journals`, { ...data, body: this.qeditor })
          // await Promise.all([
          //   this.journalList.map((journal) => {
          //     return journal.id
          //       ? updateDocument(`platforms/${userId}/journals`, journal.id, { body: journal.body, updateAt: Timestamp.now() })
          //       : createDocument(`platforms/${userId}/journals`, { ...data, body: journal.body })
          //   }),
          //   // this.journalIds.map((journalId) => {
          //   //   if (!this.journalList.find((journal) => journal.id === journalId)) {
          //   //     return deleteDocument(`platforms/${userId}/journals`, journalId)
          //   //   }
          //   //   return null
          //   // })
          // ])
          this.loadJournal()
          this.$q.notify({
            type: 'positive',
            message: 'Data saved successfully!'
          })
          this.$emit('journal-saved')
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
    },
    async updateToFirestore () {
      this.isSaving = true

      try {
        // const today = new Date().toISOString().split('T')[0]

        const user = LocalStorage.getItem('user')
        const userId = user ? user.uid : null
        if (userId) {
          // const journals = await getQueryWithFilter(`platforms/${userId}/journals`, 'dateOnly', this.displayDate)
          updateDocument(`platforms/${userId}/journals`, this.journalID, { body: this.qeditor, updateAt: Timestamp.now() })
          this.loadJournal();
          this.$q.notify({
            type: 'positive',
            message: 'Data saved successfully!'
          })
          this.$emit('journal-saved')
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
    },
    addJournalArray () {
      this.status = 'create'
      let body = { body: '<pre>New journal.</pre>' };
      this.journalList.push(body)
      this.qeditor = body.body
    }
  }
}
</script>
