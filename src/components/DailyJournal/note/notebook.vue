<template>
    <div class="q-pa-md q-gutter-sm">
      <span class="text-h5">{{displayDate}}</span>
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
      <q-btn outline rounded color="primary" icon="stream" label="Save" @click="saveToFirestore" :loading="isSaving" />

      </div>
</template>

<script>
import { ref } from 'vue'
import { Timestamp } from '@firebase/firestore'
import { LocalStorage } from 'quasar'
import createDocument from 'src/firebase/firebase-create'
import getQueryWithFilter from 'src/firebase/firebase-query'
import updateDocument from 'src/firebase/firebase-update'
import moment from 'moment'

const currDate = moment().format('YYYY-MM-DD');

export default {
  data: function () {
    return {
      isSaving: false,
      displayDate: currDate
    }
  },
  setup () {
    const qeditor = ref('<pre>Loading journal...</pre>') // Default text while loading

    async function loadJournal () {
      const user = LocalStorage.getItem('user')
      const userId = user ? user.uid : null
      if (userId) {
        console.log(currDate)
        const journals = await getQueryWithFilter(`platforms/${userId}/journals`, 'dateOnly', currDate)
        console.log(journals)
        if (journals.length) {
          qeditor.value = journals[0].body
        } else {
          qeditor.value = '<pre>No journal entry for today.</pre>'
        }
      }
    }

    // onMounted(loadJournal)
    loadJournal()

    return {
      qeditor
    }
  },
  methods: {
    async saveToFirestore () {
      this.isSaving = true

      const data = {
        body: this.qeditor,
        createdAt: Timestamp.now(),
        dateOnly: currDate
        // dateOnly: new Date().toISOString().split('T')[0]
      }

      try {
        // const today = new Date().toISOString().split('T')[0]

        const user = LocalStorage.getItem('user')
        const userId = user ? user.uid : null
        if (userId) {
          const journals = await getQueryWithFilter(`platforms/${userId}/journals`, 'dateOnly', currDate)
          if (journals.length) {
            delete data.createdAt
            await updateDocument(`platforms/${userId}/journals`, journals[0].id, data)
          } else {
            await createDocument(`platforms/${userId}/journals`, data)
          }
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
    }
  }
}
</script>
