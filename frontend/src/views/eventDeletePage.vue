<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEvenementsStore } from '@/stores/evenements.js';
import { useDepartementStore } from '@/stores/departement.js';

const route = useRoute();
const router = useRouter();
const evenementsStore = useEvenementsStore();
const departementsStore = useDepartementStore();

const evenement = computed(() => {
    const id = Number(route.params.id);
    return evenementsStore.evenements.find(e => e.id_evenement === id)
        || evenementsStore.evenementsNonValides.find(e => e.id_evenement === id);
});

const departement = computed(() =>
    departementsStore.departements.find(d => d.id_departement === Number(evenement.value.departement_id))
);

async function confirmerSuppression() {
    await evenementsStore.deleteEvenement(evenement.value);
    router.push({ name: 'getevent' });
}
</script>

<template>
  <div v-if="evenement">
    <h2>Supprimer l'événement</h2>
    <p>Voulez-vous supprimer <strong>{{ evenement.nom }}</strong> du <em>{{ departement.nom }}</em> ?</p>
    <div class="actions">
      <button class="btn-confirmer" @click="confirmerSuppression">Confirmer la suppression</button>
      <router-link :to="{ name: 'getevent' }"><button class="btn-annuler">Annuler</button></router-link>
    </div>
  </div>
  <div v-else>
    <p>Événement introuvable.</p>
    <router-link :to="{ name: 'getevent' }"><button>Retour</button></router-link>
  </div>
</template>

<style scoped>
div {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  text-align: center;
}

h2 {
  color: #111827;
  margin-bottom: 1rem;
}

p {
  color: #374151;
  margin-bottom: 1.5rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-confirmer {
  background: #dc2626;
  color: white;
  border: none;
  padding: 0.6rem 1.4rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-confirmer:hover {
  background: #b91c1c;
}

.btn-annuler {
  background: #e5e7eb;
  color: #374151;
  border: none;
  padding: 0.6rem 1.4rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-annuler:hover {
  background: #d1d5db;
}
</style>