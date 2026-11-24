<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEvenementsStore } from '@/stores/evenements.js';
import { useDepartementStore } from '@/stores/departement.js';

const route = useRoute();
const router = useRouter();
const evenementsStore = useEvenementsStore();
const departementsStore = useDepartementStore();

// Chercher dans les événements validés ou non validés
const evenement = computed(() => {
    const id = Number(route.params.id);
    return evenementsStore.evenementsNonValides.find(e => e.id_evenement === id)
        || evenementsStore.evenements.find(e => e.id_evenement === id);
});

const departement = computed(() => {
    if (!evenement.value) return null;
    return departementsStore.departements.find(d => d.id_departement === Number(evenement.value.departement_id));
});

async function confirmerValidation() {
    await evenementsStore.validerEvenement(evenement.value);
    router.push({ name: 'getevent' });
}
</script>

<template>
  <div v-if="evenement">
    <h2>Valider l'événement</h2>
    <p>
      Voulez-vous valider <strong>{{ evenement.nom }}</strong>
      <span v-if="departement"> du <em>{{ departement.nom }}</em></span> ?
    </p>
    <div class="actions">
      <button class="btn-confirmer" @click="confirmerValidation">Confirmer la validation</button>
      <router-link :to="{ name: 'getevent' }"><button class="btn-annuler">Annuler</button></router-link>
    </div>
  </div>
  <div v-else>
    <p>Événement introuvable.</p>
    <router-link :to="{ name: 'getevent' }"><button class="btn-annuler">Retour</button></router-link>
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
  background: #16a34a;
  color: white;
  border: none;
  padding: 0.6rem 1.4rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
}

.btn-confirmer:hover {
  background: #15803d;
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
