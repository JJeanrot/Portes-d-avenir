const pool = require('../db/pool.js')

const COLLUMN = "SELECT e.id_evenement, e.nom as nom_evenement, e.image, e.date_event, d.nom as nom_departement " +
    "FROM evenement e JOIN departement d ON e.departement_id = d.id_departement"


// return all the active event from the database
async function listEvent(){
    let conn
    try{
        conn = await pool.getConnection()
        const event = await conn.query(COLLUMN)
        console.log(event)
        return event
    } catch (err) {
        throw err
    } finally {
        if (conn) await conn.end()
    }
}


module.exports = { listEvent }