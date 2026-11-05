import { departements } from "@/datasource/data.js"o

function getAllDepartements() {
    return {errors: 0, data: departements};
}

export {
    getAllDepartements
}
