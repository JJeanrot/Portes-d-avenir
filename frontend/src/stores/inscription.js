import {ref} from "vue"
import {defineStore} from "pinia"

import InscriptionService from "@/services/inscription.service"

export const useInscriptionStore = defineStore("inscription", () => {
    
    const inscriptions = ref([]);

    async function getInscriptions() {
        let response = await InscriptionService.getDepartements();
        if (response.error === 0) {
            inscriptions.value = response.data.data;
        }
        else {
            console.log(response.data);
        }
    }

    return { inscriptions, getInscriptions }
});
