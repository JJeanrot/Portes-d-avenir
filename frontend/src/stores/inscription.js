import {ref} from "vue"
import {defineStore} from "pinia"

import InscriptionService from "@/services/inscription.service"

export const useInscriptionStore = defineStore("inscription", () => {
    
    const inscriptions = ref([]);

    async function getInscriptions() {
        let response = await InscriptionService.getInscriptions();
        if (response.error === 0) {
            inscriptions.value = response.data;
        }
        else {
            console.log(response.data);
        }
    }

    async function addInscription(inscription) {
        let response = await InscriptionService.addInscription(inscription);
        if (response.error !== 0) {
            console.log(response.data);
        } else {
            await getInscriptions();
        }
    }

    return { inscriptions, getInscriptions, addInscription }
});
