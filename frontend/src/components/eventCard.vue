



<script setup>

import {computed} from "vue";
import {useEvenementsStore} from "@/stores/evenements.js";
import {useBenevoleStore} from "@/stores/benevole.js";

import {useSettingsStore} from "@/stores/settings.js";

const props = defineProps({
  evenement: {
    type: Object,
    required: true
  }
});

const benevoleStore = useBenevoleStore();
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
    </div>

    <div v-if="settings.selectedRole == 'Mega_organisateur'" class="carte-actions">
      <router-link v-if="!evenement.valide" :to="{ name: 'validerEvenement', params: { id: evenement.id_evenement } }">
        <button class="btn-valider">VALIDER</button>
      </router-link>
      <router-link :to="{ name: 'deleteEvenement', params: { id: evenement.id_evenement } }">
        <button class="btn-supprimer">SUPPRIMER</button>
      </router-link>
    </div>
    <div v-if="settings.selecctedRole == 'Benevole'" class="carte-actions">
      <
    </div>
  </article>
</template>

<style scoped>
.carte {
  width: 300px;
  max-height: 277px;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  position: relative;
  transform-origin: center center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.carte:hover {
  transform: scale(1.1);
  z-index: 10;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.carte-image {
  width: 100%;
  height: 180px;
  background: #e5e7eb;
}

.carte-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.carte-infos {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.departement {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #2563eb;
}

.nom {
  margin: 0;
  font-size: 1.05rem;
  color: #111827;
}

.date {
  margin: 0;
  font-size: 0.85rem;
  color: #6b7280;
}

.carte-actions {
  display: flex;
  gap: 8px;
  padding: 10px 16px;
  background: #fafafa;
  border-top: 1px solid #f0f0f0;
  margin-top: auto;
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
</style>
