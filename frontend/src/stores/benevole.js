import {ref} from "vue"
import {defineStore} from "pinia"

import BenevoleService from "@/services/benevole.service"

export const useBenevoleStore = defineStore("benevole", () => {
    
    const benevoles = ref([]);

    async function getBenevoles() {
        let response = await BenevoleService.getBenevoles();
        if (response.error === 0) {
            benevoles.value = response.data.data;
        }
        else {
            console.log(response.data);
        }
    }
    
    return { benevoles, getBenevoles }
});
