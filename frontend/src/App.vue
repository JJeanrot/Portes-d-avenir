<script setup>
import { onMounted } from "vue";
import { useDepartementStore } from "@/stores/departement.js";
import { useInscriptionStore } from "@/stores/inscription.js";
import { useEvenementsStore } from "@/stores/evenements.js";
import { useSettingsStore } from "@/stores/settings.js";

const departementStore = useDepartementStore();
const evenementsStore = useEvenementsStore();
const inscriptionStore = useInscriptionStore();
const settings = useSettingsStore();

onMounted(() => {
    departementStore.getDepartements();
    inscriptionStore.getInscriptions();
    evenementsStore.getEvenements();
    evenementsStore.getEvenementsNonValides();
    evenementsStore.getLowestAvailableEvenementId();
});
</script>

<template>
  <div id="app">
    <header class="navbar">
      <div class="navbar-brand">
        <router-link to="/event" class="brand-link">
          <span class="brand-title">Portes d'avenir</span>
        </router-link>
      </div>

      <nav class="navbar-links">
        <router-link :to="{ name: 'getevent' }" class="nav-btn">
          Événements
        </router-link>
        <router-link :to="{ name: 'eventcreate' }" class="nav-btn">
          + Créer événement
        </router-link>
        <router-link :to="{ name: 'eventValidation' }" class="nav-btn nav-btn-badge">
          Validation
          <span v-if="evenementsStore.evenementsNonValides.length > 0" class="badge">
            {{ evenementsStore.evenementsNonValides.length }}
          </span>
        </router-link>
      </nav>

      <div class="navbar-role">
        <label for="role-select" class="role-label">Rôle :</label>
        <select id="role-select" v-model="settings.selectedRole" class="role-select">
          <option value="Benevole">Bénévole</option>
          <option value="Mega_organisateur">Méga-Organisateur</option>
        </select>
        <div v-if="settings.selectedRole == 'Benevole'">
          <label for="benevole-select" class="benevole-label">Benevole_id :</label>
          <select id="benevole-select" v-model="settings.selectedBenevoleId" class="benevole-select">
            <option value=1>1</option>
            <option value=2>2</option>
            <option value=3>3</option>
          </select>
        </div>
      </div>
    </header>

    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.85rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 50;
  gap: 1.5rem;
}

.navbar-brand .brand-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #111827;
  font-weight: 700;
  font-size: 1.2rem;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  background-color: transparent;
  border: 1px solid transparent;
}

.nav-btn:hover {
  background-color: #f3f4f6;
  color: #111827;
}

/* Style de l'onglet actif */
.nav-btn.router-link-active {
  background-color: #2563eb;
  color: #ffffff;
  font-weight: 600;
}

.nav-btn.router-link-active .badge {
  background-color: #ffffff;
  color: #2563eb;
}

.badge {
  background-color: #ef4444;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  line-height: 1;
}

.navbar-role {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.role-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #6b7280;
}

.role-select {
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  color: #374151;
  font-size: 0.9rem;
  cursor: pointer;
  outline: none;
}

.role-select:focus {
  border-color: #2563eb;
}

.main-content {
  flex: 1;
}
</style>
