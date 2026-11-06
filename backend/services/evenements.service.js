const pool = require('../db/pool.js')


const COLLUMN = "SELECT e.id_evenement, e.nom_evenements, e.image_evenements, e.date_evenements, e.valide, " +
    "d.id_departement, d.nom_departement " +
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
    try {
        const query = "DELETE FROM evenement WHERE id_evenement = ?";
        return await pool.query(query, [idEvent]);
    }catch(err){
        throw err
    }
}

async function createEvent(eventData) {
    try {
        const nom = eventData.nom_evenements || eventData.nom_evenement || eventData.nom;
        const image = eventData.image_evenements || eventData.image || null;
        const departement_id = eventData.departement_id || eventData.id_departement;
        const dateSource = eventData.date_evenements || eventData.date_event;
        const formattedDate = dateSource
            ? new Date(dateSource).toISOString().slice(0, 19).replace('T', ' ')
            : null;
        const valide = eventData.valide ? true : false;
        const query = "INSERT INTO evenement (nom_evenements, image_evenements, date_evenements, departement_id, valide) VALUES (?, ?, ?, ?, ?)";
        return await pool.query(query, [nom, image, formattedDate, departement_id, valide]);
    }catch(err){
        throw err
    }

}


async function getDepartements() {
    try {
        const query = "SELECT id_departement, nom_departement, addresse_departement FROM departement";
        return await pool.query(query);
    } catch (err) {
        throw err;
    }
}

async function createDepartement(deptData) {
    try {
        const nom_departement = deptData.nom_departement || deptData.nom;
        const addresse_departement = deptData.addresse_departement || deptData.address;
        const query = "INSERT INTO departement (nom_departement, addresse_departement) VALUES (?, ?)";
        return await pool.query(query, [nom_departement, addresse_departement]);
    }catch(err){
        throw err
    }
}

async function delDepartement(idDept) {
    try {
        const query = "DELETE FROM departement WHERE id_departement = ?";
        return await pool.query(query, [idDept]);
    } catch (err) {
        throw err;
    }
}

module.exports = { getEvenements, delEvent, createEvent, getDepartements, createDepartement, delDepartement };