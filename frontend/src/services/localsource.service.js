import { departements, evenements } from "@/datasource/data.js"

function getAllDepartements() {
    return {error: 0, data: departements};
}

function getEvenements() {
    return {error: 0, data: evenements.filter(e => e.valide === true)};
}

function getEvenementsNonValides() {
    return {error: 0, data: evenements.filter(e => !e.valide)};
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

export default {
    getAllDepartements, getEvenements, getEvenementsNonValides, validerEvenement, addEvenement, deleteEvenement
}
