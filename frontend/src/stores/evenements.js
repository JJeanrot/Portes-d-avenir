import {ref} from "vue"
import {defineStore} from "pinia"

import EvenementsService from "@/services/evenements.service"

export const useEvenementsStore = defineStore("evenement", () => {

    const evenements = ref([]);
    const evenementsNonValides = ref([]);
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

    async function getEvenementsNonValides() {
        let response = await EvenementsService.getEvenementsNonValides();
        if (response.error === 0) {
            evenementsNonValides.value = response.data;
        }
        else {
            console.log(response.data);
        }
    }

    async function validerEvenement(evenement) {
        const id = evenement.id_evenement || evenement;
        let response = await EvenementsService.validerEvenement(id);
        if (response.error === 0) {
            // Mettre à jour localement les listes
            await getEvenements();
            await getEvenementsNonValides();
        } else {
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
        } else {
            await getEvenements();
            await getEvenementsNonValides();
        }
    }

    async function deleteEvenement(evenement) {
        let response = await EvenementsService.deleteEvenement(evenement);
        if (response.error !== 0) {
            console.log(response.data);
        } else {
            await getEvenements();
            await getEvenementsNonValides();
        }
    }

    async function updateEvenement(evenement) {
        let response = await EvenementsService.updateEvenement(evenement);
        if (response.error !== 0) {
            console.log(response.data);
        } else {
            await getEvenements();
            await getEvenementsNonValides();
        }
    }

    return { 
        evenements, 
        evenementsNonValides, 
        lowestAvailableEvenementId, 
        getEvenements, 
        getEvenementsNonValides, 
        validerEvenement, 
        getLowestAvailableEvenementId, 
        addEvenement, 
        deleteEvenement,
        updateEvenement
    };
});
