# 🚪 Portes d'avenir

> Site web d'annonce des événements de **portes ouvertes** de l'**IUT Belfort-Montbéliard**.

Projet universitaire réalisé en groupe par 4 étudiants. Le site permet de consulter les événements de portes ouvertes de l'IUT (dates, lieux, informations pratiques) afin d'aider les futurs étudiants à découvrir l'établissement et ses formations.

![Statut](https://img.shields.io/badge/statut-en%20développement-orange)
![Vue.js](https://img.shields.io/badge/frontend-Vue.js-42b883)
![Node.js](https://img.shields.io/badge/backend-Node.js-339933)

---

## 📌 Sommaire

1. [Présentation](#-présentation)
2. [Technologies utilisées](#-technologies-utilisées)
3. [Prérequis](#-prérequis)
4. [Installation et lancement](#-installation-et-lancement)

---

## 🎯 Présentation

**Portes d'avenir** est une application web qui centralise les informations sur les journées portes ouvertes de l'IUT Belfort-Montbéliard.

Objectifs du projet :

- Présenter les prochains événements de portes ouvertes de manière claire et attractive
- Faciliter l'accès aux informations pour les lycéens, étudiants et parents
- Proposer une architecture moderne séparant le **frontend** (interface) et le **backend** (API / serveur)

---

## 🛠 Technologies utilisées

| Partie       | Technologies                                  |
|--------------|-----------------------------------------------|
| **Frontend** | [Vue.js 3](https://vuejs.org/), [Vite](https://vitejs.dev/), Vue Router, store (état global) |
| **Backend**  | [Node.js](https://nodejs.org/), serveur dans `server.js`, middlewares |
| **Outils**   | Git / GitHub, npm, mariadb            |

---



---

## ✅ Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [**Node.js**](https://nodejs.org/) (version 18 ou supérieure recommandée) — npm est inclus
- [**Git**](https://git-scm.com/)

Vérification :

```bash
node -v
npm -v
git --version
```

---

## 🚀 Installation et lancement

> ⚠️ **Important :** le backend et le frontend **ne sont pas encore connectés**. Ils se lancent donc **séparément**, dans deux terminaux différents.

### 1. Cloner le dépôt

```bash
git clone https://github.com/JJeanrot/Portes-d-avenir.git
cd Portes-d-avenir
```

### 2. Lancer le frontend (Vue.js)

```bash
cd frontend
npm install
npm run dev
```

Le site est alors accessible sur l'adresse affichée dans le terminal (par défaut : **http://localhost:5173**).

Autres commandes utiles :

```bash
npm run build     # Génère la version de production dans /dist
npm run preview   # Prévisualise la version de production
```

### 3. Lancer le backend (Node.js)

Dans un **second terminal**, depuis la racine du projet :

```bash
cd backend
npm install
npm start
```


Le port d'écoute du serveur est défini dans `server.js`.

### 4. Récapitulatif

| Service   | Dossier     | Installation   | Lancement         | Adresse                |
|-----------|-------------|----------------|-------------------|------------------------|
| Frontend  | `frontend/` | `npm install`  | `npm run dev`     | http://localhost:5173  |
| Backend   | `backend/`  | `npm install`  | `node server.js`  | selon `server.js`      |

---

## 👥 Équipe

Projet réalisé dans le cadre d'un cursus à l'**IUT Belfort-Montbéliard** par :

- **Jules JEANROT**
- **Pierre LAMOUR**
- **Guilian LEVEQUE**
- **Landry LECROSNIER**

---

## 📄 Licence

Projet universitaire à but pédagogique.
