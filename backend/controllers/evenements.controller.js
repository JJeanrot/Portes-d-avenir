
const service = require('../services/evenements.service');


// GET /api/event
function listEvent(req,res,next) {
    service.listEvent()
        .then((evenements) => res.json(evenements))
        .catch(next)
}


module.exports = {listEvent}
