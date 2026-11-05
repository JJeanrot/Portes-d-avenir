const pool = require('../db/pool.js')

const COLLUMN = "SELECT e.id_evenement, e.nom as nom_evenement, e.image, e.date_event, d.nom as nom_departement " +
    "FROM evenement e JOIN departement d ON e.departement_id = d.id_departement"


// return all the active event from the database
async function listEvent(){
    try{
        return await pool.query(COLLUMN)
    } catch (err) {
        throw err
    }
}


module.exports = { listEvent }