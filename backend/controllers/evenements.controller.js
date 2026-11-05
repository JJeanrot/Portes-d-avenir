
const service = require('../services/evenements.service');


// GET /api/event
function getEvenements(req,res,next) {
    service.listEvent()
        .then((evenements) => res.json(evenements))
        .catch(next)
}

function createEvent(req, res, next) {
    service.createEvent(req.body)
        .then((result) => res.status(201).json(result))
        .catch(next);
}

function delEvent(req, res, next) {
    const { id } = req.params;

    service.delEvent(id)
        .then((result) => res.json({ message: "Événement supprimé", result }))
        .catch(next);
}

function createDepartement(req, res, next) {
    service.createDepartement(req.body)
        .then((result) => res.status(201).json(result))
        .catch(next);
}

module.exports = {getEvenements, createEvent, delEvent, createDepartement};
