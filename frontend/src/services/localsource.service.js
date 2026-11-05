import { departements, evenements } from "@/datasource/data.js"

function getAllDepartements() {
    return {error: 0, data: departements};
}

function getEvenements() {
    return {error: 0, data: evenements}
}




export default {
    getAllDepartements ,getEvenements
}
