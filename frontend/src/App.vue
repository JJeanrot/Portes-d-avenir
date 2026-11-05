<script setup></script>

<template>
    <router-view></router-view>
</template>

<script setup>

import {onMounted} from "vue";
import {useDepartementStore} from "@/stores/departement.js";

const departementStore = useDepartementStore();

onMounted(() => {
    departementStore.getDepartements();
})

</script>

<style scoped></style>
