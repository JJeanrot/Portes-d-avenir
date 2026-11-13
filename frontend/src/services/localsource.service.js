import { departements, evenements } from "@/datasource/data.js"

function getAllDepartements() {
    return {error: 0, data: departements};
}

function getEvenements() {
    return {error: 0, data: evenements}
}

function addEvenement(evenement) {
    evenements.push(evenement);
    console.log(evenements);
    return {error: 0, data: evenement}
}

function deleteEvenement(evenement) {
    let index = evenements.indexOf(evenement);
    console.log(evenements);
    evenements.splice(index, 1);
    console.log(evenements);
    return {error: 0, data: evenement}
}

export default {
    getAllDepartements, getEvenements, addEvenement, deleteEvenement
}
