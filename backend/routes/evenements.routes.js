const express = require('express');
const controleur = require('../controllers/evenements.controller');

const router = express.Router();


router.get('/',controleur.listEvent)

module.exports = router