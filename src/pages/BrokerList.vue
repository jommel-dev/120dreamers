<template>
  <q-page>
    <q-input v-model="search" outlined clearable debounce="300" placeholder="Search brokers..."/>

    <q-table
      :rows="filteredBrokers"
      :columns="columns"
      row-key="id"
    />
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { LocalStorage } from 'quasar'
import listDocuments from 'src/firebase/firebase-list'

export default {
  name: 'BrokerList',
  setup () {
    const brokers = ref([])
    const search = ref('')

    const columns = [
      { name: 'broker', required: true, label: 'Broker', align: 'left', field: 'broker' },
      { name: 'brokerName', label: 'Broker Name', align: 'left', field: 'brokerName' },
      { name: 'server', label: 'Server', align: 'left', field: 'server' },
      { name: 'username', label: 'Username', align: 'left', field: 'username' },
      { name: 'createdAt', label: 'Created At', align: 'left', field: row => row.createdAt?.toDate().toLocaleString(), sortable: true }
    ]

    const filteredBrokers = computed(() => {
      return brokers.value.filter(broker => {
        return Object.keys(broker).some(key => {
          return String(broker[key]).toLowerCase().includes(search.value.toLowerCase())
        })
      })
    })

    const fetchBrokers = async () => {
      const user = LocalStorage.getItem('user')
      const userId = user ? user.uid : null
      brokers.value = await listDocuments(`platforms/${userId}/brokers`)
      filteredBrokers.value = this.brokers
    }

    onMounted(() => {
      fetchBrokers()
    })

    return {
      search,
      columns,
      filteredBrokers,
      brokers
    }
  }
}
</script>
