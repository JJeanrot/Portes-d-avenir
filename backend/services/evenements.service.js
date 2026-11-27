const pool = require('../db/pool.js')


const COLLUMN = "SELECT e.id_evenement, e.nom as nom, e.nom as nom_evenement, e.nom as nom_evenements, " +
    "e.image, e.image as image_evenements, e.date_event, e.date_event as date_evenements, e.valide, " +
    "d.id_departement, d.nom as nom_departement, d.address as addresse_departement " +
    "FROM evenement e JOIN departement d ON e.departement_id = d.id_departement";


// return all the active event from the database (only validated)
async function getEvenements(){
    try{
        return await pool.query(COLLUMN + " WHERE e.valide = 1")
    } catch (err) {
        throw err
    }
}

async function findEvenementById(idEvent) {
    try {
        const evenements = await pool.query(COLLUMN + " WHERE e.valide = 1 AND e.id_evenement = ?", [idEvent]);
        return evenements[0] || null;
    } catch (err) {
        throw err;
    }
}

// return all events that are not validated yet
async function getEvenementsNonValides(){
    try{
        return await pool.query(COLLUMN + " WHERE e.valide = 0")
    } catch (err) {
        throw err
    }
}

async function validerEvenement(idEvent) {
    try {
        const query = "UPDATE evenement SET valide = 1 WHERE id_evenement = ?";
        return await pool.query(query, [idEvent]);
    } catch (err) {
        throw err;
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

async function updateEvent(idEvent, eventData) {
    try {
        const nom = eventData.nom_evenements || eventData.nom_evenement || eventData.nom;
        const image = eventData.image_evenements || eventData.image || null;
        const departement_id = eventData.departement_id || eventData.id_departement;
        const dateSource = eventData.date_evenements || eventData.date_event;
        const formattedDate = dateSource
            ? new Date(dateSource).toISOString().slice(0, 19).replace('T', ' ')
            : null;
        const valide = eventData.valide ? true : false;
        const query = "UPDATE evenement SET nom = ?, image = ?, date_event = ?, departement_id = ?, valide = ? WHERE id_evenement = ?";
        return await pool.query(query, [nom, image, formattedDate, departement_id, valide, idEvent]);
    } catch (err) {
        throw err;
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
        const query = "INSERT INTO evenement (nom, image, date_event, departement_id, valide) VALUES (?, ?, ?, ?, ?)";
        return await pool.query(query, [nom, image, formattedDate, departement_id, valide]);
    }catch(err){
        throw err
    }

}


async function getDepartements() {
    try {
        const query = "SELECT id_departement, nom as nom_departement, address as addresse_departement FROM departement";
        return await pool.query(query);
    } catch (err) {
        throw err;
    }
}

async function createDepartement(deptData) {
    try {
        const nom_departement = deptData.nom_departement || deptData.nom;
        const addresse_departement = deptData.addresse_departement || deptData.address;
        const query = "INSERT INTO departement (nom, address) VALUES (?, ?)";
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

module.exports = { getEvenements, findEvenementById, getEvenementsNonValides, validerEvenement, delEvent, createEvent, updateEvent, getDepartements, createDepartement, delDepartement };