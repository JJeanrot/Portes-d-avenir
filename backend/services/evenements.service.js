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

async function delEvent(idEvent) {
    const query = "DELETE FROM evenement WHERE id_evenement = ?";
    return await pool.query(query, [idEvent]);
}

async function createEvent(eventData) {
    const nom = eventData.nom || eventData.nom_evenement;
    const image = eventData.image;
    const departement_id = eventData.departement_id || eventData.id_departement;
    const formattedDate = eventData.date_event
        ? new Date(eventData.date_event).toISOString().slice(0, 19).replace('T', ' ')
        : null;
    const query = "INSERT INTO evenement (nom, image, date_event, departement_id) VALUES (?, ?, ?, ?)";
    return await pool.query(query, [nom, image, formattedDate, departement_id]);

}

async function createDepartement(deptData) {
    const { nom, address } = deptData;
    const query = "INSERT INTO departement (nom, address) VALUES (?, ?)";
    return await pool.query(query, [nom, address]);
}


module.exports = { getEvenements, delEvent, createEvent, createDepartement };