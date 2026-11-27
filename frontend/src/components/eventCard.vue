<script setup>

import {computed} from "vue";
import {useEvenementsStore} from "@/stores/evenements.js";
import {useBenevoleStore} from "@/stores/benevole.js";
import {useInscriptionStore} from "@/stores/inscription.js";

import {useSettingsStore} from "@/stores/settings.js";

const props = defineProps({
  evenement: {
    type: Object,
    required: true
  }
});

const benevoleStore = useBenevoleStore();
const inscriptionStore = useInscriptionStore();
const settings = useSettingsStore();

const dateFormatee = computed(() => {
  const date = new Date(props.evenement.date_event.replace(" ", "T"));
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
});

const imageUrl = computed(() => `/images/${props.evenement.image}`);

function valider() {
  evenementsStore.validerEvenement(props.evenement);
}

function inscrire() {

  const benevole_id = Number(settings.selectedBenevoleId);
  const evenement_id = props.evenement.id_evenement;

  const inscription = {
    "benevole_id": benevole_id,
    "evenement_id": evenement_id
  }

  inscriptionStore.addInscription(inscription); 
}
</script>

<template>
  <article class="carte">
    <div class="carte-image">
      <img :src="imageUrl" :alt="evenement.nom" />
    </div>

    <div class="carte-infos">
      <span class="departement">{{ evenement.nom_departement }}</span>
      <h3 class="nom">{{ evenement.nom }}</h3>
      <p class="date">{{ dateFormatee }}</p>
      <router-link
        class="detail-link"
        :to="{ name: 'eventDetail', params: { id: evenement.id_evenement } }"
      >
        Découvrir l'événement
        <span aria-hidden="true">→</span>
      </router-link>
    </div>

    <div v-if="settings.selectedRole == 'Mega_organisateur'" class="carte-actions">
      <router-link v-if="!evenement.valide" :to="{ name: 'validerEvenement', params: { id: evenement.id_evenement } }">
        <button class="btn-valider">VALIDER</button>
      </router-link>
      <router-link :to="{ name: 'editEvenement', params: { id: evenement.id_evenement } }">
        <button class="btn-modifier">MODIFIER</button>
      </router-link>
      <router-link :to="{ name: 'deleteEvenement', params: { id: evenement.id_evenement } }">
        <button class="btn-supprimer">SUPPRIMER</button>
      </router-link>
    </div>


    <div v-if="settings.selectedRole == 'Benevole'" class="carte-actions">
        <button @click="inscrire()">S'inscrire</button>
    </div>
  </article>
</template>

<style scoped>
.carte {
  width: 100%;
  min-width: 0;
  height: 100%;
  border: 1px solid var(--border, #cddcd3);
  border-radius: 1rem;
  overflow: hidden;
  background: var(--surface, #fff);
  box-shadow: 0 0.35rem 1.1rem rgba(28, 51, 40, 0.08);
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.carte:hover {
  transform: translateY(-4px);
  border-color: var(--green-300, #a7c2b2);
  box-shadow: 0 0.8rem 1.8rem rgba(28, 51, 40, 0.14);
}

.carte-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: var(--green-100, #e4ede7);
}

.carte-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.carte-infos {
  flex: 1;
  padding: 1rem 1.1rem 1.15rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.45rem;
}

.departement {
  font-size: 0.76rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--green-600, #3d6f53);
}

.nom {
  margin: 0;
  color: var(--green-900, #1c3328);
  font-size: 1.1rem;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.date {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.45;
  color: var(--text-muted, #55655c);
}

.detail-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  width: fit-content;
  margin-top: 0.35rem;
  color: var(--green-700, #2f5842);
  font-size: 0.9rem;
  font-weight: 650;
  text-decoration: none;
}

.detail-link:hover {
  color: var(--green-900, #1c3328);
  text-decoration: underline;
}

.carte-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--green-50, #f2f6f3);
  border-top: 1px solid var(--border, #cddcd3);
  margin-top: auto;
}

.carte-actions > a {
  flex: 1 1 5rem;
  min-width: 0;
}

.carte-actions button {
  width: 100%;
  min-height: 2.5rem;
  padding: 0.55rem 0.65rem;
  font-size: 0.78rem;
}

.btn-valider {
  flex: 1;
  background-color: #16a34a;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-valider:hover {
  background-color: #15803d;
}

.btn-modifier {
  flex: 1;
  background-color: #d97706;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-modifier:hover {
  background-color: #b45309;
}

.btn-supprimer {
  flex: 1;
  background-color: #dc2626;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-supprimer:hover {
  background-color: #b91c1c;
}

@media (max-width: 38rem) {
  .carte:hover {
    transform: none;
  }
}
</style>
