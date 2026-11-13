import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {

  const selectedRole = ref('Benevole')

  return { selectedRole }
})
