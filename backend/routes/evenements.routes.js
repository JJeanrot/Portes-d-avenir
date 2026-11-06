const express = require('express');
const controleur = require('../controllers/evenements.controller');

const router = express.Router();

router.get('/', controleur.getEvenements);
router.post('/', controleur.createEvent);
router.delete('/:id', controleur.delEvent);
router.get('/departement', controleur.getDepartements);
router.post('/departement', controleur.createDepartement);
router.delete('/departement/:id', controleur.delDepartement);

module.exports = router;