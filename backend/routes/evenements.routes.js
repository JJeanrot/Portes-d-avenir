const express = require('express');
const controleur = require('../controllers/evenements.controller');

const router = express.Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id_evenement:
 *           type: integer
 *           example: 1
 *         nom_evenement:
 *           type: string
 *           example: Journée Portes Ouvertes Informatique
 *         image:
 *           type: string
 *           example: jpo_informatique.jpg
 *         date_event:
 *           type: string
 *           format: date-time
 *           example: "2026-12-05T09:00:00.000Z"
 *         nom_departement:
 *           type: string
 *           example: Informatique
 *
 *     CreateEventInput:
 *       type: object
 *       required:
 *         - nom_evenement
 *         - date_event
 *         - id_departement
 *       properties:
 *         nom_evenement:
 *           type: string
 *           example: Nuit de l'Info
 *         image:
 *           type: string
 *           example: nuit_info.png
 *         date_event:
 *           type: string
 *           format: date-time
 *           example: "2026-12-03T18:00:00.000Z"
 *         id_departement:
 *           type: integer
 *           example: 2
 *
 *     CreateDepartementInput:
 *       type: object
 *       required:
 *         - nom_departement
 *       properties:
 *         nom_departement:
 *           type: string
 *           example: Réseaux & Télécoms
 */

/**
 * @openapi
 * /api/event:
 *   get:
 *     summary: Liste des événements
 *     description: Récupère tous les événements avec le nom de leur département associé.
 *     tags:
 *       - Événements
 *     responses:
 *       200:
 *         description: Liste des événements récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Erreur serveur (ex. base de données inaccessible).
 *
 *   post:
 *     summary: Créer un événement
 *     description: Ajoute un nouvel événement dans la base de données.
 *     tags:
 *       - Événements
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEventInput'
 *     responses:
 *       201:
 *         description: Événement créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_evenement:
 *                   type: integer
 *                   example: 42
 *                 message:
 *                   type: string
 *                   example: Événement créé
 *       400:
 *         description: Données fournies invalides.
 *       500:
 *         description: Erreur serveur.
 */
router.get('/', controleur.getEvenements);
router.post('/', controleur.createEvent);

/**
 * @openapi
 * /api/event/{id}:
 *   delete:
 *     summary: Supprimer un événement
 *     description: Supprime un événement existant via son identifiant unique.
 *     tags:
 *       - Événements
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID unique de l'événement à supprimer
 *         example: 1
 *     responses:
 *       200:
 *         description: Événement supprimé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Événement supprimé
 *                 result:
 *                   type: object
 *       404:
 *         description: Événement non trouvé.
 *       500:
 *         description: Erreur serveur.
 */
router.delete('/:id', controleur.delEvent);

/**
 * @openapi
 * /api/event/departement:
 *   post:
 *     summary: Créer un département
 *     description: Ajoute un nouveau département.
 *     tags:
 *       - Départements
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDepartementInput'
 *     responses:
 *       201:
 *         description: Département créé avec succès.
 *       400:
 *         description: Données invalides.
 *       500:
 *         description: Erreur serveur.
 */
router.post('/departement', controleur.createDepartement);

module.exports = router;