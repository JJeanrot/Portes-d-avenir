<script setup>

import {useEvenementsStore} from "@/stores/evenements.js";
import eventCard from "@/components/eventCard.vue"
import {computed} from "vue";
const es = useEvenementsStore()

</script>

<template>
  <div class="event-container">
  <div v-for="e in es.evenements "><event-card :evenement="e"></event-card></div>
  </div>
</template>

<style scoped>
.event-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}
</style>