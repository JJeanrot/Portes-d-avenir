let departements = [
    {
        "id_departement": 1,
        "nom": "Informatique",
        "adresse": "19 Avenue du Maréchal Juin, 90000 Belfort"
    },
    {
        "id_departement": 2,
        "nom": "Génie Civil",
        "adresse": "19 Avenue du Maréchal Juin, 90000 Belfort"
    },
    {
        "id_departement": 3,
        "nom": "Réseaux et Télécommunications",
        "adresse": "4 Place Tharradin, 25200 Montbéliard"
    }
];

let evenements = [
    {
        "id_evenement": 1,
        "nom": "Journée Portes Ouvertes Informatique",
        "image": "jpo_informatique.jpg",
        "date_event": "2026-12-05 09:00:00",
        "departement_id": 1
    },
    {
        "id_evenement": 2,
        "nom": "Portes Ouvertes Informatique - Session lycéens",
        "image": "jpo_informatique_lyceens.jpg",
        "date_event": "2027-02-06 13:30:00",
        "departement_id": 1
    },

    {
        "id_evenement": 3,
        "nom": "Journée Portes Ouvertes Génie Civil",
        "image": "jpo_genie_civil.jpg",
        "date_event": "2026-12-12 09:00:00",
        "departement_id": 2
    },
    {
        "id_evenement": 4,
        "nom": "Portes Ouvertes Génie Civil - Visite des laboratoires",
        "image": "jpo_genie_civil_labos.jpg",
        "date_event": "2027-01-30 14:00:00",
        "departement_id": 2
    },

    {
        "id_evenement": 5,
        "nom": "Journée Portes Ouvertes Réseaux et Télécoms",
        "image": "jpo_reseaux_telecoms.jpg",
        "date_event": "2026-12-05 10:00:00",
        "departement_id": 3
    },
    {
        "id_evenement": 6,
        "nom": "Portes Ouvertes Réseaux et Télécoms - Découverte des formations",
        "image": "jpo_reseaux_formations.jpg",
        "date_event": "2027-03-06 09:30:00",
        "departement_id": 3
    }
];

export {
    departements,
    evenements
}