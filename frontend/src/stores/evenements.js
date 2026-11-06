import {ref} from "vue"
import {defineStore} from "pinia"

import EvenementsService from "@/services/evenements.service"

export const useEvenementsStore = defineStore("evenement", () => {

    const evenements = ref([]);
    const lowestAvailableEvenementId = ref(0);

    async function getEvenements() {
        let response = await EvenementsService.getEvenements();
        if (response.error === 0) {
            evenements.value = response.data;
        }
        else {
            console.log(response.data);
        }
    }

    async function getLowestAvailableEvenementId() {
        let response = await EvenementsService.getLowestAvailableEvenementId();
        if (response.error === 0) {
            lowestAvailableEvenementId.value = response.data;
        }
        else {
            console.log(response.data);
        }
    }
    async function addEvenement(evenement) {
        let response = await EvenementsService.addEvenement(evenement);
        if (response.error !== 0) {
            console.log(response.data);
        }
    }

    return { evenements, lowestAvailableEvenementId, getEvenements, getLowestAvailableEvenementId, addEvenement }
});
