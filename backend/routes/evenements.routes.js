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
 */

/**
 * @openapi
 * /api/event:
 *   get:
 *     summary: Event list
 *     description: Returns all events with the name of their department
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: List of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       500:
 *         description: Server error (e.g. database unreachable)
 */
router.get('/',controleur.listEvent)

module.exports = router