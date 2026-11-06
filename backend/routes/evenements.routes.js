const express = require('express');
const controleur = require('../controllers/evenements.controller');

const router = express.Router();

router.get('/', controleur.getEvenements);
router.post('/', controleur.createEvent);
router.delete('/:id', controleur.delEvent);
router.post('/departement', controleur.createDepartement);

module.exports = router;