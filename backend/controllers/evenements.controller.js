
const service = require('../services/evenements.service');


// GET /api/event
function getEvenements(req,res,next) {
    service.getEvenements()
        .then((evenements) => res.json(evenements))
        .catch(next)
}

function createEvent(req, res, next) {
    service.createEvent(req.body)
        .then((result) => {
            res.status(201).json({
                message: "Événement créé",
                id_evenement: Number(result.insertId)
            });
        })
        .catch(next);
}

function delEvent(req, res, next) {
    const { id } = req.params;

    service.delEvent(id)
        .then((result) => res.json({
            message: "Événement supprimé",
            affectedRows: Number(result.affectedRows)
        }))
        .catch(next);
}

function getDepartements(req, res, next) {
    service.getDepartements()
        .then((departements) => res.json(departements))
        .catch(next);
}

function createDepartement(req, res, next) {
    service.createDepartement(req.body)
        .then((result) => {
            res.status(201).json({
                message: "Département créé",
                id_departement: Number(result.insertId)
            });
        })
        .catch(next);
}

function delDepartement(req, res, next) {
    const { id } = req.params;

    service.delDepartement(id)
        .then((result) => res.json({
            message: "Département supprimé",
            affectedRows: Number(result.affectedRows)
        }))
        .catch(next);
}

module.exports = {getEvenements, createEvent, delEvent, getDepartements, createDepartement, delDepartement};

