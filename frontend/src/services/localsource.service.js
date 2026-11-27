import { departements, evenements } from "@/datasource/data.js"

function getAllDepartements() {
    return {error: 0, data: departements};
}

function getAllBenevoles() {
    return {error: 0, data: benevoles};
}

function getAllInscriptions() {
    return {error: 0, data: inscriptions};
}

function getBenevoleInscriptions(idBenevole) {
    return {error: 0, data: inscriptions.filter(i => i.benevole_id === idBenevole)};
}

function getEvenements() {
    return {error: 0, data: evenements.filter(e => e.valide === true)};
}

function getEvenementsNonValides() {
    return {error: 0, data: evenements.filter(e => !e.valide)};
}

function addInscription(inscription) {
    console.log(inscriptions);
    inscriptions.push(inscription);
    return {error: 0, data: inscription}
}

function validerEvenement(idEvenement) {
    let evt = evenements.find(e => e.id_evenement === Number(idEvenement));
    if (evt) {
        evt.valide = true;
        return {error: 0, data: evt};
    }
    return {error: 1, status: 404, data: 'Événement non trouvé'};
}

function addEvenement(evenement) {
    if (evenement.valide === undefined) {
        evenement.valide = false;
    }
    evenements.push(evenement);
    console.log(evenements);
    return {error: 0, data: evenement}
}

function deleteEvenement(evenement) {
    let index = evenements.findIndex(e => e.id_evenement === (evenement.id_evenement || evenement));
    if (index !== -1) {
        evenements.splice(index, 1);
    }
    console.log(evenements);
    return {error: 0, data: evenement}
}

function updateEvenement(evenement) {
    let evt = evenements.find(e => e.id_evenement === Number(evenement.id_evenement));
    if (evt) {
        if (evenement.nom !== undefined) evt.nom = evenement.nom;
        if (evenement.nom_evenement !== undefined) evt.nom = evenement.nom_evenement;
        if (evenement.image !== undefined) evt.image = evenement.image;
        if (evenement.date_event !== undefined) evt.date_event = evenement.date_event;
        if (evenement.departement_id !== undefined) evt.departement_id = Number(evenement.departement_id);
        if (evenement.valide !== undefined) evt.valide = Boolean(evenement.valide);
        return {error: 0, data: evt};
    }
    return {error: 1, status: 404, data: 'Événement non trouvé'};
}

export default {
    getAllBenevoles,

    getAllInscriptions,
    getBenevoleInscriptions,
    addInscription,

    getAllDepartements, getEvenements, getEvenementsNonValides, validerEvenement, addEvenement, deleteEvenement, updateEvenement
}
