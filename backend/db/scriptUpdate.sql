DROP TABLE IF EXISTS reservation_materiel;
DROP TABLE IF EXISTS reservation_sallle;
DROP TABLE IF EXISTS materiel;
DROP TABLE IF EXISTS salle;
DROP TABLE IF EXISTS evenement;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS categorie_materiel;
DROP TABLE IF EXISTS departement;

CREATE TABLE departement (
                             id_departement INT NOT NULL AUTO_INCREMENT,
                             nom_departement VARCHAR(255) NOT NULL,
                             addresse_departement VARCHAR(255) NOT NULL,
                             PRIMARY KEY(id_departement)
);

CREATE TABLE categorie_materiel (
                                    id_categorie_materiel INT UNSIGNED NOT NULL AUTO_INCREMENT,
                                    nom_categorie_materiel VARCHAR(255) NOT NULL,
                                    PRIMARY KEY(id_categorie_materiel)
);

CREATE TABLE role (
                      id_role INT UNSIGNED NOT NULL AUTO_INCREMENT,
                      nom VARCHAR(255),
                      PRIMARY KEY(id_role)
);

CREATE TABLE user (
                      id_user INT UNSIGNED NOT NULL AUTO_INCREMENT,
                      nom_user VARCHAR(255) NOT NULL,
                      password_user TEXT NOT NULL,
                      role_id INT UNSIGNED NOT NULL,
                      PRIMARY KEY(id_user),
                      FOREIGN KEY(role_id) REFERENCES role(id_role)
);

CREATE TABLE evenement (
                           id_evenement INT UNSIGNED NOT NULL AUTO_INCREMENT,
                           nom_evenements VARCHAR(255) NOT NULL,
                           image_evenements VARCHAR(255),
                           date_evenements DATETIME NOT NULL,
                           departement_id INT NOT NULL,
                           valide BOOLEAN NOT NULL DEFAULT FALSE,
                           PRIMARY KEY(id_evenement),
                           FOREIGN KEY(departement_id) REFERENCES departement(id_departement)
);

CREATE TABLE salle (
                       id_salle INT UNSIGNED NOT NULL AUTO_INCREMENT,
                       departement_id INT NOT NULL,
                       nom_sallle VARCHAR(255) NOT NULL,
                       PRIMARY KEY(id_salle),
                       FOREIGN KEY(departement_id) REFERENCES departement(id_departement)
);

CREATE TABLE reservation_sallle (
                                    salle_id INT UNSIGNED NOT NULL,
                                    evenement_id INT UNSIGNED NOT NULL,
                                    PRIMARY KEY(salle_id, evenement_id),
                                    FOREIGN KEY(salle_id) REFERENCES salle(id_salle),
                                    FOREIGN KEY(evenement_id) REFERENCES evenement(id_evenement)
);

CREATE TABLE materiel (
                          id_materiel INT UNSIGNED NOT NULL AUTO_INCREMENT,
                          categorie_materiel_id INT UNSIGNED NOT NULL,
                          nom_materiel VARCHAR(255) NOT NULL,
                          quantite INT NOT NULL,
                          departement_id INT NOT NULL,
                          PRIMARY KEY(id_materiel),
                          FOREIGN KEY(categorie_materiel_id) REFERENCES categorie_materiel(id_categorie_materiel),
                          FOREIGN KEY(departement_id) REFERENCES departement(id_departement)
);

CREATE TABLE reservation_materiel (
                                      evenement_id INT UNSIGNED NOT NULL,
                                      materiel_id INT UNSIGNED NOT NULL,
                                      quantite INT NOT NULL,
                                      PRIMARY KEY(evenement_id, materiel_id),
                                      FOREIGN KEY(evenement_id) REFERENCES evenement(id_evenement),
                                      FOREIGN KEY(materiel_id) REFERENCES materiel(id_materiel)
);




## DATASET DE TEST #

INSERT INTO departement (nom_departement, addresse_departement) VALUES
                                                                    ('Informatique', '19 Avenue du Maréchal Juin, 90000 Belfort'),
                                                                    ('Génie Civil', '19 Avenue du Maréchal Juin, 90000 Belfort'),
                                                                    ('Réseaux et Télécommunications', '4 Place Tharradin, 25200 Montbéliard');

INSERT INTO categorie_materiel (nom_categorie_materiel) VALUES
                                                            ('Mobilier'),
                                                            ('Informatique');

INSERT INTO salle (departement_id, nom_sallle) VALUES
-- Informatique (Belfort)
(1, 'Amphi A'),
(1, 'Salle TP 101'),
(1, 'Salle TP 102'),
-- Génie Civil (Belfort)
(2, 'Amphi B'),
(2, 'Laboratoire Matériaux'),
(2, 'Salle TD 201'),
-- Réseaux et Télécoms (Montbéliard)
(3, 'Salle R&T 1'),
(3, 'Salle Réseaux 2'),
(3, 'Amphi Montbéliard');

INSERT INTO evenement (nom_evenements, image_evenements, date_evenements, departement_id, valide) VALUES
-- Informatique (Belfort)
('Journée Portes Ouvertes Informatique', 'jpo_informatique.jpg', '2026-12-05 09:00:00', 1, TRUE),
('Portes Ouvertes Informatique - Session lycéens', 'jpo_informatique_lyceens.jpg', '2027-02-06 13:30:00', 1, FALSE),
-- Génie Civil (Belfort)
('Journée Portes Ouvertes Génie Civil', 'jpo_genie_civil.jpg', '2026-12-12 09:00:00', 2, TRUE),
('Portes Ouvertes Génie Civil - Visite des laboratoires', 'jpo_genie_civil_labos.jpg', '2027-01-30 14:00:00', 2, FALSE),
-- Réseaux et Télécoms (Montbéliard)
('Journée Portes Ouvertes Réseaux et Télécoms', 'jpo_reseaux_telecoms.jpg', '2026-12-05 10:00:00', 3, TRUE),
('Portes Ouvertes Réseaux et Télécoms - Découverte des formations', 'jpo_reseaux_formations.jpg', '2027-03-06 09:30:00', 3, FALSE);

INSERT INTO materiel (categorie_materiel_id, nom_materiel, quantite, departement_id) VALUES
-- Informatique (departement 1)
(2, 'Ordinateur portable', 20, 1),
(1, 'Table', 15, 1),
(1, 'Chaise', 100, 1),
-- Génie Civil (departement 2)
(1, 'Table', 12, 2),
(1, 'Chaise', 80, 2),
(2, 'Ordinateur portable', 6, 2),
-- Réseaux et Télécoms (departement 3)
(2, 'Ordinateur portable', 15, 3),
(1, 'Table', 10, 3),
(1, 'Chaise', 60, 3);

INSERT INTO reservation_sallle (salle_id, evenement_id) VALUES
-- JPO Informatique
(1, 1),
(2, 1),
-- Session lycéens Informatique
(1, 2),
-- JPO Génie Civil
(4, 3),
(6, 3),
-- Visite labos Génie Civil
(5, 4),
-- JPO Réseaux et Télécoms
(7, 5),
(8, 5),
-- Découverte des formations Réseaux et Télécoms
(9, 6);

INSERT INTO reservation_materiel (evenement_id, materiel_id, quantite) VALUES
-- JPO Informatique
(1, 1, 10),
(1, 2, 6),
(1, 3, 40),
-- Session lycéens Informatique
(2, 1, 8),
(2, 2, 4),
(2, 3, 30),
-- JPO Génie Civil
(3, 4, 8),
(3, 5, 50),
(3, 6, 3),
-- Visite labos Génie Civil
(4, 4, 5),
(4, 5, 30),
-- JPO Réseaux et Télécoms
(5, 7, 8),
(5, 8, 6),
(5, 9, 40),
-- Découverte des formations Réseaux et Télécoms
(6, 7, 5),
(6, 8, 4),
(6, 9, 30);