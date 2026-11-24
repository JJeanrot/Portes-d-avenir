<script setup>

import {useEvenementsStore} from "@/stores/evenements.js";
import eventCard from "@/components/eventCard.vue"
import {computed} from "vue";
const es = useEvenementsStore()

</script>

<template>
  <div class="page-container">
    <div class="top-bar">
      <h1>Événements</h1>
      <router-link :to="{ name: 'eventValidation' }" class="lien-validation">
        Événements en attente de validation ({{ es.evenementsNonValides.length }})
      </router-link>
    </div>
    <div class="event-container">
      <div v-for="e in es.evenements" :key="e.id_evenement">
        <event-card :evenement="e"></event-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.top-bar h1 {
  margin: 0;
  color: #111827;
}

.lien-validation {
  background-color: #f3f4f6;
  color: #2563eb;
  padding: 8px 14px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
}

.lien-validation:hover {
  background-color: #e5e7eb;
}

.event-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
</style>