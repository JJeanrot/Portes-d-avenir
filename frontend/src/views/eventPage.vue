<script setup>

import {useEvenementsStore} from "@/stores/evenements.js";
import eventCard from "@/components/eventCard.vue"
import {computed, ref} from "vue";
const es = useEvenementsStore()
const sortBy = ref('date')
const sortDirection = ref('asc')

const evenementsTries = computed(() => {
  const direction = sortDirection.value === 'asc' ? 1 : -1;

  return es.evenements
    .map((evenement, index) => ({ evenement, index }))
    .sort((a, b) => {
      let comparaison;

      if (sortBy.value === 'name') {
        const nomA = a.evenement.nom_evenements || a.evenement.nom_evenement || a.evenement.nom || '';
        const nomB = b.evenement.nom_evenements || b.evenement.nom_evenement || b.evenement.nom || '';
        comparaison = nomA.localeCompare(nomB, 'fr', { sensitivity: 'base', numeric: true });
      } else {
        const dateA = new Date(String(a.evenement.date_evenements || a.evenement.date_event || '').replace(' ', 'T')).getTime();
        const dateB = new Date(String(b.evenement.date_evenements || b.evenement.date_event || '').replace(' ', 'T')).getTime();
        const dateAValide = Number.isFinite(dateA);
        const dateBValide = Number.isFinite(dateB);

        if (dateAValide !== dateBValide) return dateAValide ? -1 : 1;
        if (!dateAValide) return a.index - b.index;
        comparaison = dateA - dateB;
      }

      return comparaison === 0 ? a.index - b.index : comparaison * direction;
    })
    .map(({ evenement }) => evenement);
});

</script>

<template>
  <div class="page-container">
    <div class="top-bar">
      <h1>Événements</h1>
      <router-link :to="{ name: 'eventValidation' }" class="lien-validation">
        Événements en attente de validation ({{ es.evenementsNonValides.length }})
      </router-link>
    </div>
    <div class="sort-controls">
      <label for="sort-by">Trier par</label>
      <select id="sort-by" v-model="sortBy">
        <option value="date">Date</option>
        <option value="name">Nom</option>
      </select>

      <label for="sort-direction">Ordre</label>
      <select id="sort-direction" v-model="sortDirection">
        <option value="asc">
          {{ sortBy === 'name' ? 'A → Z' : 'Du plus ancien au plus récent' }}
        </option>
        <option value="desc">
          {{ sortBy === 'name' ? 'Z → A' : 'Du plus récent au plus ancien' }}
        </option>
      </select>
    </div>
    <div class="event-container">
      <div v-for="e in evenementsTries" :key="e.id_evenement">
        <event-card :evenement="e"></event-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  width: min(100% - 2rem, 80rem);
  margin: 0 auto;
  padding: clamp(1.5rem, 4vw, 3rem) 0;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem 2rem;
  margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
}

.top-bar h1 {
  margin: 0;
  color: var(--green-900, #1c3328);
  font-size: clamp(1.8rem, 4vw, 2.5rem);
}

.lien-validation {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  padding: 0.65rem 1rem;
  border: 1px solid var(--green-200, #cddcd3);
  border-radius: 0.65rem;
  background-color: var(--green-50, #f2f6f3);
  color: var(--green-800, #264536);
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.lien-validation:hover {
  border-color: var(--green-300, #a7c2b2);
  background-color: var(--green-100, #e4ede7);
}

.sort-controls {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem 0.8rem;
  margin-bottom: 1.25rem;
}

.sort-controls label {
  margin: 0;
  color: var(--green-900, #1c3328);
  font-weight: 600;
}

.sort-controls select {
  width: auto;
  min-width: 10rem;
}

.event-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
  align-items: stretch;
  gap: clamp(1rem, 2.5vw, 1.5rem);
}

.event-container > div {
  min-width: 0;
}

@media (max-width: 38rem) {
  .page-container {
    width: min(100% - 1.25rem, 80rem);
    padding-top: 1.25rem;
  }

  .top-bar {
    align-items: stretch;
    flex-direction: column;
  }

  .lien-validation {
    align-self: flex-start;
  }

  .sort-controls {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
  }

  .sort-controls select {
    min-width: 0;
  }
}
</style>