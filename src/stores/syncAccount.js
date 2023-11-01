import { defineStore } from 'pinia'

export const syncAccount = defineStore('syncAccount', {
    state: () => ({
      selectedId: [],
    }),
    getters: {
      getSelectedId: (state) => state.selectedId,
    },
    actions: {
      setSelectedId(payload) {
        // commit()
        this.selectedId = payload
      },
    },
})