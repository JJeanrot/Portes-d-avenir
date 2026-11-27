<template>
  <div style="width: 50%; margin-inline: auto">
    <div>
      <h1>Créer évenement</h1>
    </div>
    <div>
      <span>Nom : <input v-model="nom" required></span>
      <span>Image : <input v-model="image" required></span>
      <span>Date : <input v-model="date_event" type="date" required></span>
      <span>Departement :
      <select>
        <option v-for="(departement, index) in departementStore.departements" :key="index">{{
            departement.nom
          }}
        </option>
      </select>
        </span>
      <button @click="addEvenement()">
        Créer Evenement
      </button>
    </div>
  </div>

</template>

<script setup>

import {ref} from "vue";
import {useDepartementStore} from "@/stores/departement.js";
import {useEvenementsStore} from "@/stores/evenements.js";

const departementStore = useDepartementStore();
const evenementStore = useEvenementsStore();

const id = ref(0);
const nom = ref("");
const image = ref("");
const date_event = ref("");
const departementId = ref(0);

function addEvenement() {
  let e = {
    "id_evenement": evenementStore.lowestAvailableEvenementId,
    "nom": nom.value,
    "image": image.value,
    "date_event": date_event.value,
    "departement_id": departementId.value
  };
  evenementStore.addEvenement(e);
}

</script>
