
const service = require('../services/evenements.service');


// GET /api/event
function getEvenements(req,res,next) {
    service.listEvent()
        .then((evenements) => res.json(evenements))
        .catch(next)
}


module.exports = { getEvenements }
