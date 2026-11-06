let departements = [
    { "id_departement": 1, "nom": "Informatique", "adresse": "19 Avenue du Maréchal Juin, 90000 Belfort" },
    { "id_departement": 2, "nom": "Génie Civil", "adresse": "19 Avenue du Maréchal Juin, 90000 Belfort" },
    { "id_departement": 3, "nom": "Réseaux et Télécommunications", "adresse": "4 Place Tharradin, 25200 Montbéliard" }
];

let categories_materiel = [
    { "id_categorie_materiel": 1, "nom": "Mobilier" },
    { "id_categorie_materiel": 2, "nom": "Informatique" }
];

let salles = [
    // Informatique (Belfort)
    { "id_salle": 1, "departement_id": 1, "nom": "Amphi A" },
    { "id_salle": 2, "departement_id": 1, "nom": "Salle TP 101" },
    { "id_salle": 3, "departement_id": 1, "nom": "Salle TP 102" },
    // Génie Civil (Belfort)
    { "id_salle": 4, "departement_id": 2, "nom": "Amphi B" },
    { "id_salle": 5, "departement_id": 2, "nom": "Laboratoire Matériaux" },
    { "id_salle": 6, "departement_id": 2, "nom": "Salle TD 201" },
    // Réseaux et Télécoms (Montbéliard)
    { "id_salle": 7, "departement_id": 3, "nom": "Salle R&T 1" },
    { "id_salle": 8, "departement_id": 3, "nom": "Salle Réseaux 2" },
    { "id_salle": 9, "departement_id": 3, "nom": "Amphi Montbéliard" }
];

let evenements = [
    // Informatique (Belfort)
    { "id_evenement": 1, "nom": "Journée Portes Ouvertes Informatique", "image": "jpo_informatique.jpg", "date_event": "2026-12-05 09:00:00", "departement_id": 1, "valide": true },
    { "id_evenement": 2, "nom": "Portes Ouvertes Informatique - Session lycéens", "image": "jpo_informatique_lyceens.jpg", "date_event": "2027-02-06 13:30:00", "departement_id": 1, "valide": false },
    // Génie Civil (Belfort)
    { "id_evenement": 3, "nom": "Journée Portes Ouvertes Génie Civil", "image": "jpo_genie_civil.jpg", "date_event": "2026-12-12 09:00:00", "departement_id": 2, "valide": true },
    { "id_evenement": 4, "nom": "Portes Ouvertes Génie Civil - Visite des laboratoires", "image": "jpo_genie_civil_labos.jpg", "date_event": "2027-01-30 14:00:00", "departement_id": 2, "valide": false },
    // Réseaux et Télécoms (Montbéliard)
    { "id_evenement": 5, "nom": "Journée Portes Ouvertes Réseaux et Télécoms", "image": "jpo_reseaux_telecoms.jpg", "date_event": "2026-12-05 10:00:00", "departement_id": 3, "valide": true },
    { "id_evenement": 6, "nom": "Portes Ouvertes Réseaux et Télécoms - Découverte des formations", "image": "jpo_reseaux_formations.jpg", "date_event": "2027-03-06 09:30:00", "departement_id": 3, "valide": false }
];

let materiels = [
    // Informatique (departement 1)
    { "id_materiel": 1, "categorie_materiel_id": 2, "nom": "Ordinateur portable", "quantite": 20, "departement_id": 1 },
    { "id_materiel": 2, "categorie_materiel_id": 1, "nom": "Table", "quantite": 15, "departement_id": 1 },
    { "id_materiel": 3, "categorie_materiel_id": 1, "nom": "Chaise", "quantite": 100, "departement_id": 1 },
    // Génie Civil (departement 2)
    { "id_materiel": 4, "categorie_materiel_id": 1, "nom": "Table", "quantite": 12, "departement_id": 2 },
    { "id_materiel": 5, "categorie_materiel_id": 1, "nom": "Chaise", "quantite": 80, "departement_id": 2 },
    { "id_materiel": 6, "categorie_materiel_id": 2, "nom": "Ordinateur portable", "quantite": 6, "departement_id": 2 },
    // Réseaux et Télécoms (departement 3)
    { "id_materiel": 7, "categorie_materiel_id": 2, "nom": "Ordinateur portable", "quantite": 15, "departement_id": 3 },
    { "id_materiel": 8, "categorie_materiel_id": 1, "nom": "Table", "quantite": 10, "departement_id": 3 },
    { "id_materiel": 9, "categorie_materiel_id": 1, "nom": "Chaise", "quantite": 60, "departement_id": 3 }
];

let reservations_salle = [
    // JPO Informatique
    { "salle_id": 1, "evenement_id": 1 },
    { "salle_id": 2, "evenement_id": 1 },
    // Session lycéens Informatique
    { "salle_id": 1, "evenement_id": 2 },
    // JPO Génie Civil
    { "salle_id": 4, "evenement_id": 3 },
    { "salle_id": 6, "evenement_id": 3 },
    // Visite labos Génie Civil
    { "salle_id": 5, "evenement_id": 4 },
    // JPO Réseaux et Télécoms
    { "salle_id": 7, "evenement_id": 5 },
    { "salle_id": 8, "evenement_id": 5 },
    // Découverte des formations Réseaux et Télécoms
    { "salle_id": 9, "evenement_id": 6 }
];

let reservations_materiel = [
    // JPO Informatique
    { "evenement_id": 1, "materiel_id": 1, "quantite": 10 },
    { "evenement_id": 1, "materiel_id": 2, "quantite": 6 },
    { "evenement_id": 1, "materiel_id": 3, "quantite": 40 },
    // Session lycéens Informatique
    { "evenement_id": 2, "materiel_id": 1, "quantite": 8 },
    { "evenement_id": 2, "materiel_id": 2, "quantite": 4 },
    { "evenement_id": 2, "materiel_id": 3, "quantite": 30 },
    // JPO Génie Civil
    { "evenement_id": 3, "materiel_id": 4, "quantite": 8 },
    { "evenement_id": 3, "materiel_id": 5, "quantite": 50 },
    { "evenement_id": 3, "materiel_id": 6, "quantite": 3 },
    // Visite labos Génie Civil
    { "evenement_id": 4, "materiel_id": 4, "quantite": 5 },
    { "evenement_id": 4, "materiel_id": 5, "quantite": 30 },
    // JPO Réseaux et Télécoms
    { "evenement_id": 5, "materiel_id": 7, "quantite": 8 },
    { "evenement_id": 5, "materiel_id": 8, "quantite": 6 },
    { "evenement_id": 5, "materiel_id": 9, "quantite": 40 },
    // Découverte des formations Réseaux et Télécoms
    { "evenement_id": 6, "materiel_id": 7, "quantite": 5 },
    { "evenement_id": 6, "materiel_id": 8, "quantite": 4 },
    { "evenement_id": 6, "materiel_id": 9, "quantite": 30 }
];

export {
    departements,
    categories_materiel,
    salles,
    evenements,
    materiels,
    reservations_salle,
    reservations_materiel
}