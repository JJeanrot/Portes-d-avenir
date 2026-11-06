<script setup></script>

<template>
    <router-view></router-view>
</template>

<script setup>

import {onMounted} from "vue";
import {useDepartementStore} from "@/stores/departement.js";
import {useEvenementsStore} from "@/stores/evenements.js";

const departementStore = useDepartementStore();
const evenementsStore = useEvenementsStore();

onMounted(() => {
    departementStore.getDepartements();
    evenementsStore.getEvenements();
    evenementsStore.getLowestAvailableEvenementId();
})

</script>


<style scoped></style>
