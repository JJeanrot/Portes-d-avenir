<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEvenementsStore } from '@/stores/evenements.js';
import { useDepartementStore } from '@/stores/departement.js';

const route = useRoute();
const router = useRouter();
const evenementsStore = useEvenementsStore();
const departementsStore = useDepartementStore();

const id = Number(route.params.id);

const nom = ref('');
const image = ref('');
const date_event = ref('');
const departement_id = ref(null);
const valide = ref(false);

const evenement = computed(() => {
    return evenementsStore.evenements.find(e => e.id_evenement === id)
        || evenementsStore.evenementsNonValides.find(e => e.id_evenement === id);
});

function initForm() {
    if (evenement.value) {
        nom.value = evenement.value.nom || evenement.value.nom_evenement || '';
        image.value = evenement.value.image || '';
        
        // Format pour input datetime-local: YYYY-MM-DDTHH:mm
        if (evenement.value.date_event) {
            const d = new Date(evenement.value.date_event.replace(' ', 'T'));
            if (!isNaN(d.getTime())) {
                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                const hours = String(d.getHours()).padStart(2, '0');
                const minutes = String(d.getMinutes()).padStart(2, '0');
                date_event.value = `${year}-${month}-${day}T${hours}:${minutes}`;
            } else {
                date_event.value = evenement.value.date_event;
            }
        }
        
        departement_id.value = evenement.value.departement_id;
        valide.value = Boolean(evenement.value.valide);
    }
}

onMounted(() => {
    initForm();
});

async function sauvegarderModifications() {
    const updated = {
        id_evenement: id,
        nom: nom.value,
        nom_evenement: nom.value,
        image: image.value,
        // Convertir YYYY-MM-DDTHH:mm en YYYY-MM-DD HH:mm:ss
        date_event: date_event.value ? date_event.value.replace('T', ' ') + ':00' : '',
        departement_id: Number(departement_id.value),
        valide: valide.value
    };

    await evenementsStore.updateEvenement(updated);
    router.push({ name: 'getevent' });
}
</script>

<template>
  <div class="edit-page-container">
    <div v-if="evenement" class="edit-card">
      <h2>Modifier l'événement #{{ id }}</h2>
      <form @submit.prevent="sauvegarderModifications" class="edit-form">
        <div class="form-group">
          <label for="nom">Nom de l'événement :</label>
          <input id="nom" v-model="nom" required type="text" placeholder="Ex: Portes Ouvertes..." />
        </div>

        <div class="form-group">
          <label for="image">Nom du fichier image :</label>
          <input id="image" v-model="image" required type="text" placeholder="Ex: image.jpg" />
        </div>

        <div class="form-group">
          <label for="date_event">Date et heure :</label>
          <input id="date_event" v-model="date_event" required type="datetime-local" />
        </div>

        <div class="form-group">
          <label for="departement">Département :</label>
          <select id="departement" v-model="departement_id" required>
            <option v-for="dept in departementsStore.departements" :key="dept.id_departement" :value="dept.id_departement">
              {{ dept.nom }}
            </option>
          </select>
        </div>

        <div class="form-group-checkbox">
          <label>
            <input type="checkbox" v-model="valide" />
            Événement validé (visible sur la page publique)
          </label>
        </div>

        <div class="actions">
          <button type="submit" class="btn-sauvegarder">Enregistrer les modifications</button>
          <router-link :to="{ name: 'getevent' }">
            <button type="button" class="btn-annuler">Annuler</button>
          </router-link>
        </div>
      </form>
    </div>
    <div v-else class="not-found">
      <p>Événement introuvable.</p>
      <router-link :to="{ name: 'getevent' }"><button class="btn-annuler">Retour</button></router-link>
    </div>
  </div>
</template>

<style scoped>
.edit-page-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
}

.edit-card, .not-found {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.not-found {
  text-align: center;
}

h2 {
  color: #111827;
  margin-top: 0;
  margin-bottom: 1.5rem;
  text-align: center;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
}

.form-group input,
.form-group select {
  padding: 0.6rem 0.8rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.95rem;
  outline: none;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #2563eb;
}

.form-group-checkbox {
  margin: 0.5rem 0;
}

.form-group-checkbox label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  color: #374151;
  font-weight: 500;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

.btn-sauvegarder {
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.65rem 1.4rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: background 0.2s ease;
}

.btn-sauvegarder:hover {
  background: #1d4ed8;
}

.btn-annuler {
  background: #e5e7eb;
  color: #374151;
  border: none;
  padding: 0.65rem 1.4rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.2s ease;
}

.btn-annuler:hover {
  background: #d1d5db;
}
</style>
