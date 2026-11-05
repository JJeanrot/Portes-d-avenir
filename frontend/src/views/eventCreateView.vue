<template>
    <div>
        <h1>Créer évenement</h1>
    </div>

    <span>{{ departementStore.departements }}</span>

    <div class="form">
        <span>Nom : <input></span>
        <span>Image : <input></span>
        <span>Date : <input type="date"></span>
        <select>
            <option v-for="(departement, index) in departementStore.departements" :key="index">{{ departement.nom }}</option> 
        </select>
    </div>

</template>

<script setup>

import {ref} from "vue";
import {useDepartementStore} from "@/stores/departement.js";

const departementStore = useDepartementStore(); 

</script>
