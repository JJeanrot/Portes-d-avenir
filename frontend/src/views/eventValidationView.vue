<script setup>
import { onMounted } from "vue";
import { useEvenementsStore } from "@/stores/evenements.js";
import eventCard from "@/components/eventCard.vue";

const evenementsStore = useEvenementsStore();

onMounted(() => {
  evenementsStore.getEvenementsNonValides();
});
</script>

<template>
  <div class="validation-page">
    <div class="header">
      <h1>Événements en attente de validation</h1>
      <p>Ces événements doivent être validés avant d'apparaître sur la page publique.</p>
      <router-link :to="{ name: 'getevent' }" class="lien-retour">← Voir les événements validés</router-link>
    </div>

    <div v-if="evenementsStore.evenementsNonValides.length > 0" class="event-container">
      <div v-for="e in evenementsStore.evenementsNonValides" :key="e.id_evenement">
        <event-card :evenement="e"></event-card>
      </div>
    </div>
    <div v-else class="empty-state">
      <p>Aucun événement en attente de validation.</p>
    </div>
  </div>
</template>

<style scoped>
.validation-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem;
}

.header {
  margin-bottom: 2rem;
  text-align: center;
}

.header h1 {
  color: #111827;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.header p {
  color: #6b7280;
  margin-bottom: 1rem;
}

.lien-retour {
  display: inline-block;
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}

.lien-retour:hover {
  text-decoration: underline;
}

.event-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  color: #6b7280;
}
</style>
