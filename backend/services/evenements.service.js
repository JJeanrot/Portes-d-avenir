const pool = require('../db/pool.js')

const COLLUMN = "SELECT e.id_evenement, e.nom as nom_evenement, e.image, e.date_event, d.nom as nom_departement " +
    "FROM evenement e JOIN departement d ON e.departement_id = d.id_departement"


// return all the active event from the database
async function getEvenements(){
    try{
        return await pool.query(COLLUMN)
    } catch (err) {
        throw err
    }
}

async function delEvent(idEvent){
    let conn
    try{
        const query = "delete from evenement WHERE id_evenement = ?";
        return await conn.query(query, [idEvent])
    } catch (err) {
        throw err
    }
}

async function createEvent(eventData) {
    const { nom, image, date_event, departement_id } = eventData;
    const query = "INSERT INTO evenement (nom, image, date_event, departement_id) VALUES (?, ?, ?, ?)";
    return await pool.query(query, [nom, image, date_event, departement_id]);
}

async function createDepartement(deptData) {
    const { nom, address } = deptData;
    const query = "INSERT INTO departement (nom, address) VALUES (?, ?)";
    return await pool.query(query, [nom, address]);
}


module.exports = { getEvenements, delEvent, createEvent, createDepartement };