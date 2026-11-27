import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settings', () => {

  const selectedRole = ref('Benevole');
  const selectedBenevoleId = ref(0);

  return { selectedRole, selectedBenevoleId}
})
