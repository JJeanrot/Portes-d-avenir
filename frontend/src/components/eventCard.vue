



<script setup>

import {computed} from "vue";

const props = defineProps({
  evenement: {
    type: Object,
    required: true
  }
});

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
  </article>
</template>

<style scoped>
.carte {
  width: 300px;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
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
</style>