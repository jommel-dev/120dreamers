<template>
    <div class="q-pa-md" style="width: 100%;">
        <q-splitter
            v-model="splitterModel"
            style="height: 90vh"
        >

            <template v-slot:before>
                <div class="q-pa-sm">
                    <q-form class="row">
                        <div class="col col-md-12">
                            <span>Select Broker:</span>
                            <q-select
                                v-model="broker"
                                :options="brokerList"
                                @update:model-value="clearRequirements"
                                dense
                                options-dense
                            >
                                <template v-slot:append>
                                    <q-avatar>
                                        <q-icon name="ion-wallet" size="sm" />
                                    </q-avatar>
                                </template>
                            </q-select>
                        </div>
                        <div v-if="broker !== null" class="col col-md-6 q-mt-md q-pa-sm">
                            <span>Start Date:</span>
                            <q-select
                                v-model="startDate"
                                :options="broker.records"
                                dense
                                options-dense
                            >
                                <template v-slot:append>
                                    <q-avatar>
                                        <q-icon name="date" size="sm" />
                                    </q-avatar>
                                </template>
                            </q-select>
                        </div>
                        <div v-if="broker !== null" class="col col-md-6 q-mt-md q-pa-sm">
                            <span>Broker:</span>
                            <q-input v-model="brokerName" dense />
                        </div>
                        <div v-if="broker !== null" class="col col-md-6 q-mt-md q-pa-sm">
                            <span>Server:</span>
                            <q-select
                                v-model="server"
                                :options="broker.servers"
                                dense
                                options-dense
                            >
                                <template v-slot:append>
                                    <q-avatar>
                                        <q-icon name="date" size="sm" />
                                    </q-avatar>
                                </template>
                            </q-select>
                        </div>
                        <div class="col col-md-12"></div>
                        <!-- Create tooltip/note message to generate their token and account id from https://metaapi.cloud/ -->
                        <div v-if="broker !== null" class="col col-md-6 q-mt-md q-pa-sm">
                            <span>Token (Meta API):</span>
                            <q-input v-model="token" dense />
                        </div>
                        <div v-if="broker !== null" class="col col-md-6 q-mt-md q-pa-sm">
                            <span>Account ID (META API):</span>
                            <q-input v-model="accountId" dense />
                        </div>
                        <div v-if="broker !== null" class="col col-md-6 q-mt-md q-pa-sm">
                            <q-btn outline rounded color="primary" icon="stream" label="Connect Broker" @click="saveToFirestore" :loading="isSaving" />
                        </div>
                    </q-form>
                </div>
            </template>

            <template v-slot:after>
               <div class="q-pa-sm flex">

                    <div v-if="broker !== null" class="q-pa-xl text-center">
                        <q-icon :name="broker.icon" size="xl" /> <span class="text-h6">{{ broker.label }}</span>
                        <div class="row q-mt-lg">
                            <div class="col col-md-12 text-left ">
                                <span class="text-h6">Supported Assets:</span><br/>
                                <q-chip
                                    v-for="(item, index) in broker.assets"
                                    :key="index"
                                    outline
                                    color="primary"
                                    text-color="white"
                                    icon="auto_graph"
                                >
                                    {{item}}
                                </q-chip>
                            </div>
                            <div class="col col-md-12 text-left q-mt-lg">
                                <span class="text-h6">Instruction of Linking</span><br/>
                                {{ broker.description }}
                            </div>
                            <div class="col col-md-12 text-left q-mt-lg">
                                <q-card flat bordered class="my-card">
                                    <q-card-section>
                                        <q-chip
                                            style="width: 100%;"
                                            color="blue-5"
                                            text-color="white"
                                            icon="info"
                                            label="Note"
                                        />
                                    </q-card-section>

                                    <q-card-section class="q-pt-none">
                                        {{ notes }}
                                    </q-card-section>
                                </q-card>

                            </div>
                        </div>
                    </div>

                </div>
            </template>

        </q-splitter>
    </div>
</template>

<script>
import { LocalStorage } from 'quasar'
import createDocument from 'src/firebase/firebase-create'
import { Timestamp } from '@firebase/firestore'

export default {
  name: 'NewTradeForm',
  components: {},
  data () {
    return {
      splitterModel: 50,
      // Form
      broker: null,
      startDate: null,
      brokerName: '',
      server: null,
      token: '',
      accountId: '',
      type: null,

      // List
      brokerList: [
        {
          id: 1,
          label: 'MetaTrader4',
          value: 1,
          icon: 'pix',
          color: 'yellow-7',
          assets: ['asset1', 'asset2', 'asset3', 'asset4'],
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          records: [
            {
              label: 'Import All Records',
              value: 'importAll'
            },
            {
              label: 'Select Records',
              value: 'selectRecord'
            }
          ],
          servers: [
            {
              label: 'https://server.sample.com/api/v1',
              value: 'https://server.sample.com/api/v1'
            }
          ]
        },
        {
          id: 2,
          label: 'MetaTrader10',
          value: 2,
          icon: 'ion-logo-ionitron',
          color: 'yellow-4',
          assets: ['asset1', 'asset2', 'asset3', 'asset4'],
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          records: [
            {
              label: 'Import All Records',
              value: 'importAll'
            },
            {
              label: 'Select Records',
              value: 'selectRecord'
            }
          ],
          servers: [
            {
              label: 'https://server.sample.com/api/v2',
              value: 'https://server.sample.com/api/v2'
            }
          ]
        }
      ],
      notes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      isSaving: false
    }
  },
  created () {},
  methods: {
    clearRequirements () {
      this.brokerName = ''
      this.token = ''
      this.accountId = ''
    },
    async saveToFirestore () {
      this.isSaving = true
      const data = {
        broker: this.broker.label,
        startDate: this.startDate.value,
        brokerName: this.brokerName,
        server: this.server.value,
        token: this.token,
        accountId: this.accountId, // TODO: Encrypt this
        type: this.type,
        createdAt: Timestamp.now()
      }

      try {
        const user = LocalStorage.getItem('user')
        console.log({ user })
        const userId = user ? user.uid : null
        if (userId) {
          await createDocument(`platforms/${userId}/brokers`, data)
          this.$q.notify({
            type: 'positive',
            message: 'Data saved successfully!'
          })
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
      }
    }
  }
}
</script>
