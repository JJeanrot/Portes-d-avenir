INSERT INTO departement (nom, address) VALUES
                                           ('Informatique', '19 Avenue du Maréchal Juin, 90000 Belfort'),
                                           ('Génie Civil', '19 Avenue du Maréchal Juin, 90000 Belfort'),
                                           ('Réseaux et Télécommunications', '4 Place Tharradin, 25200 Montbéliard');

INSERT INTO evenement (nom, image, date_event, departement_id) VALUES
-- Informatique (Belfort)
('Journée Portes Ouvertes Informatique', 'jpo_informatique.jpg', '2026-12-05 09:00:00', 1),
('Portes Ouvertes Informatique - Session lycéens', 'jpo_informatique_lyceens.jpg', '2027-02-06 13:30:00', 1),

-- Génie Civil (Belfort)
('Journée Portes Ouvertes Génie Civil', 'jpo_genie_civil.jpg', '2026-12-12 09:00:00', 2),
('Portes Ouvertes Génie Civil - Visite des laboratoires', 'jpo_genie_civil_labos.jpg', '2027-01-30 14:00:00', 2),

-- Réseaux et Télécoms (Montbéliard)
('Journée Portes Ouvertes Réseaux et Télécoms', 'jpo_reseaux_telecoms.jpg', '2026-12-05 10:00:00', 3),
('Portes Ouvertes Réseaux et Télécoms - Découverte des formations', 'jpo_reseaux_formations.jpg', '2027-03-06 09:30:00', 3);





SELECT e.id_evenement, e.nom as nom_evenement, e.image, e.date_event, d.nom as nom_departement
FROM evenement e JOIN departement d ON e.departement_id = d.id_departement;
