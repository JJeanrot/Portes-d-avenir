<script setup>
import { computed, ref, watch } from 'vue';
import { useEvenementsStore } from '@/stores/evenements.js';
import { useDepartementStore } from '@/stores/departement.js';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const evenementsStore = useEvenementsStore();
const departementStore = useDepartementStore();
const isLoading = ref(true);
const imageUnavailable = ref(false);

const evenement = computed(() => {
  const id = Number(props.id);
  return evenementsStore.evenements.find(
    (item) => Number(item.id_evenement) === id
  ) || null;
});

const nomEvenement = computed(() =>
  evenement.value?.nom_evenements
    || evenement.value?.nom_evenement
    || evenement.value?.nom
    || 'Événement'
);

const departement = computed(() => {
  if (!evenement.value) return null;

  return departementStore.departements.find(
    (item) => Number(item.id_departement) === Number(evenement.value.departement_id)
  ) || null;
});

const nomDepartement = computed(() =>
  evenement.value?.nom_departement || departement.value?.nom || 'Département'
);

const adresseDepartement = computed(() =>
  evenement.value?.addresse_departement
    || departement.value?.adresse
    || departement.value?.address
    || null
);

const dateFormatee = computed(() => {
  const dateSource = evenement.value?.date_evenements || evenement.value?.date_event;
  if (!dateSource) return null;

  const date = new Date(String(dateSource).replace(' ', 'T'));
  if (Number.isNaN(date.getTime())) return String(dateSource);

  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
});

const imageUrl = computed(() => {
  const image = evenement.value?.image_evenements || evenement.value?.image;
  return image ? `/images/${image}` : null;
});

watch(
  () => props.id,
  async () => {
    isLoading.value = true;
    imageUnavailable.value = false;
    await Promise.all([
      evenementsStore.getEvenements(),
      departementStore.getDepartements()
    ]);
    isLoading.value = false;
  },
  { immediate: true }
);
</script>

<template>
  <div class="detail-page">
    <nav class="breadcrumb" aria-label="Fil d'Ariane">
      <router-link :to="{ name: 'getevent' }">Événements</router-link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">Détail</span>
    </nav>

    <div v-if="isLoading" class="state-card" role="status">
      Chargement de l'événement…
    </div>

    <section v-else-if="evenement" class="event-detail">
      <div class="event-visual">
        <img
          v-if="imageUrl && !imageUnavailable"
          :src="imageUrl"
          :alt="`Illustration de ${nomEvenement}`"
          @error="imageUnavailable = true"
        />
        <div v-else class="image-placeholder" aria-hidden="true">
          <span>Portes d'avenir</span>
        </div>
        <span class="status-badge" :class="{ 'is-pending': !evenement.valide }">
          {{ evenement.valide ? 'Événement confirmé' : 'En attente de validation' }}
        </span>
      </div>

      <div class="event-content">
        <div class="event-heading">
          <p class="eyebrow">{{ nomDepartement }}</p>
          <h1>{{ nomEvenement }}</h1>
          <p class="intro">
            Retrouvez les informations pratiques de cet événement.
          </p>
        </div>

        <div class="information-grid">
          <article class="information-card">
            <span class="information-icon" aria-hidden="true">◷</span>
            <div>
              <h2>Date et heure</h2>
              <p>{{ dateFormatee || 'Date à préciser' }}</p>
            </div>
          </article>

          <article class="information-card">
            <span class="information-icon" aria-hidden="true">⌖</span>
            <div>
              <h2>Département</h2>
              <p>{{ nomDepartement }}</p>
              <p v-if="adresseDepartement" class="address">{{ adresseDepartement }}</p>
            </div>
          </article>
        </div>

        <div class="event-footer">
          <p class="event-reference">Référence événement #{{ evenement.id_evenement }}</p>
          <router-link :to="{ name: 'getevent' }" class="back-link">
            <span aria-hidden="true">←</span>
            Retour aux événements
          </router-link>
        </div>
      </div>
    </section>

    <section v-else class="state-card not-found">
      <span class="not-found-icon" aria-hidden="true">?</span>
      <h1>Événement introuvable</h1>
      <p>Il n'existe pas ou n'est plus disponible.</p>
      <router-link :to="{ name: 'getevent' }" class="back-link">
        Retour aux événements
      </router-link>
    </section>
  </div>
</template>

<style scoped>
.detail-page {
  width: min(100% - 2rem, 68rem);
  margin: 0 auto;
  padding: clamp(1.25rem, 4vw, 2.5rem) 0 3rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 1.25rem;
  color: var(--text-muted, #55655c);
  font-size: 0.9rem;
}

.breadcrumb a {
  font-weight: 600;
  text-decoration: none;
}

.event-detail {
  overflow: hidden;
  padding: 0;
  border: 1px solid var(--border, #cddcd3);
  border-radius: 1.1rem;
  background: var(--surface, #fff);
  box-shadow: 0 1.25rem 3.5rem rgba(28, 51, 40, 0.09);
}

.event-visual {
  position: relative;
  height: clamp(15rem, 38vw, 26rem);
  overflow: hidden;
  background: #dce9df;
}

.event-visual img {
  width: 100%;
  height: 100%;
  border-radius: 0;
  object-fit: cover;
}

.image-placeholder {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 82% 18%, rgba(205, 220, 211, 0.75) 0 12%, transparent 12.5%),
    radial-gradient(ellipse at 12% 100%, rgba(86, 138, 109, 0.55) 0 25%, transparent 25.5%),
    linear-gradient(135deg, #1c3328, #568a6d);
  color: #fff;
}

.image-placeholder span {
  padding: 0.8rem 1.2rem;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 999px;
  background: rgba(28, 51, 40, 0.2);
  font-size: clamp(1rem, 3vw, 1.4rem);
  font-weight: 650;
  letter-spacing: 0.04em;
}

.status-badge {
  position: absolute;
  right: clamp(1rem, 3vw, 1.5rem);
  bottom: 1rem;
  padding: 0.45rem 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: 999px;
  background: #eff7f0;
  color: var(--green-800, #264536);
  font-size: 0.85rem;
  font-weight: 650;
}

.status-badge.is-pending {
  background: #fff5da;
  color: #705719;
}

.event-content {
  padding: clamp(1.25rem, 4vw, 2.75rem);
}

.event-heading {
  max-width: 48rem;
}

.eyebrow {
  margin-bottom: 0.65rem;
  color: var(--green-600, #3d6f53);
  font-size: 0.82rem;
  font-weight: 750;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.event-heading h1 {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 3rem);
  line-height: 1.12;
}

.intro {
  margin: 0.85rem 0 0;
  color: var(--text-muted, #55655c);
  font-size: 1.05rem;
}

.information-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.information-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  min-width: 0;
  padding: 1.25rem;
  border: 1px solid var(--border, #cddcd3);
  border-radius: 0.85rem;
  background: var(--surface-alt, #f2f6f3);
}

.information-icon {
  display: grid;
  width: 2.6rem;
  height: 2.6rem;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 0.75rem;
  background: #fff;
  color: var(--green-700, #2f5842);
  font-size: 1.45rem;
}

.information-card h2 {
  margin: 0 0 0.3rem;
  font-size: 0.95rem;
  letter-spacing: 0;
}

.information-card p {
  margin: 0;
  color: var(--text, #1a2520);
  font-weight: 600;
}

.information-card .address {
  margin-top: 0.3rem;
  color: var(--text-muted, #55655c);
  font-size: 0.92rem;
  font-weight: 400;
}

.event-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border, #cddcd3);
}

.event-reference {
  margin: 0;
  color: var(--text-muted, #55655c);
  font-size: 0.9rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.65rem 0.95rem;
  border: 1px solid var(--green-300, #a7c2b2);
  border-radius: 0.65rem;
  color: var(--green-800, #264536);
  font-weight: 650;
  text-decoration: none;
  transition: background-color 0.18s ease, border-color 0.18s ease;
}

.back-link:hover {
  border-color: var(--green-500, #568a6d);
  background: var(--green-50, #f2f6f3);
}

.state-card {
  padding: clamp(2rem, 6vw, 4rem);
  border: 1px solid var(--border, #cddcd3);
  border-radius: 1rem;
  background: var(--surface, #fff);
  text-align: center;
  box-shadow: 0 1rem 2.5rem rgba(28, 51, 40, 0.07);
}

.not-found h1 {
  margin: 1rem 0 0.5rem;
  font-size: 1.8rem;
}

.not-found p {
  margin: 0 auto 1.5rem;
  color: var(--text-muted, #55655c);
}

.not-found-icon {
  display: inline-grid;
  width: 3rem;
  height: 3rem;
  place-items: center;
  border-radius: 50%;
  background: var(--green-100, #e4ede7);
  color: var(--green-800, #264536);
  font-size: 1.5rem;
  font-weight: 700;
}

@media (max-width: 42rem) {
  .information-grid {
    grid-template-columns: 1fr;
  }

  .event-footer {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
