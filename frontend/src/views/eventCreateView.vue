<template>
    <div>
        <h1>Créer évenement</h1>
    </div>

    <span>{{ departementStore.departements }}</span>

    <div>
        <span>Nom : <input v-model="nom" required></span>
        <span>Image : <input v-model="image" required></span>
        <span>Date : <input v-model="date_event" type="date" required></span>
        <select>
            <option v-for="(departement, index) in departementStore.departements" :key="index">{{ departement.nom }}</option> 
        </select>
        <button @click="addEvenement()">
            Créer Evenement
        </button>
    </div>

</template>

<script setup>

import {ref} from "vue";
import {useDepartementStore} from "@/stores/departement.js";
import {useEvenementsStore} from "@/stores/evenements.js";

const departementStore = useDepartementStore(); 
const evenementStore = useEvenementsStore(); 

const id = ref(0);
const nom = ref("");
const image = ref("");
const date_event= ref("");
const departementId = ref(0);

function addEvenement() {
    console.log("ddddddddddddddddddddddddddddddddd")
    let e = {
        "id_evenement": 7,
        "nom": nom.value,
        "image": image.value,
        "date_event": date_event.value,
        "departement_id": departementId.value
    };
    console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddf")
console.log(evenementStore.evenements.value)

    evenementStore.addEvenement(e);
}

</script>
