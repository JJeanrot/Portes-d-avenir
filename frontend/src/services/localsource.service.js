import { departements, evenements } from "@/datasource/data.js"

function getAllDepartements() {
    return {errors: 0, data: departements};
}

function getEvenements() {
    return {errors: 0, data: evenements}
}




export default {
    getAllDepartements
}
