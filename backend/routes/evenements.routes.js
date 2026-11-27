const express = require('express');
const controleur = require('../controllers/evenements.controller');

const router = express.Router();

router.get('/', controleur.getEvenements);
router.get('/non-valides', controleur.getEvenementsNonValides);
router.post('/', controleur.createEvent);
router.put('/:id', controleur.updateEvent);
router.patch('/:id/valider', controleur.validerEvenement);
router.delete('/:id', controleur.delEvent);
router.get('/departement', controleur.getDepartements);
router.post('/departement', controleur.createDepartement);
router.delete('/departement/:id', controleur.delDepartement);

module.exports = router;