import {ref} from "vue"
import {defineStore} from "pinia"

import DepartementService from "@/services/departement.service"

export const useDepartementStore = defineStore("departement", () => {
    
    const departements = ref([]);

    async function getDepartements() {
        let response = await DepartementService.getDepartements();
        if (response.error === 0) {
            departements.value = response.data.data;
        }
        else {
            console.log(response.data);
        }
    }
    
    return { departements, getDepartements }
});
