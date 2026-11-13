<script setup></script>

<template>
    <select v-model="settings.selectedRole">
        <option value="Benevole">Bénévole</option>
        <option value="Mega_organisateur">Méga-Organisateur</option>
    </select>
    <hr>
    <router-view></router-view>
</template>

<script setup>

import {onMounted} from "vue";
import {useDepartementStore} from "@/stores/departement.js";
import {useEvenementsStore} from "@/stores/evenements.js";
import {useSettingsStore} from "@/stores/settings.js";

const departementStore = useDepartementStore();
const evenementsStore = useEvenementsStore();
const settings = useSettingsStore();

onMounted(() => {
    departementStore.getDepartements();
    evenementsStore.getEvenements();
    evenementsStore.getLowestAvailableEvenementId();
})

</script>


<style scoped></style>
