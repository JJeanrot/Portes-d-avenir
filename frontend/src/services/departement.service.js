import LocalSource from "@/services/localsource.service.js"

async function getDepartements() {
    return {error: 0, data: LocalSource.getAllDepartements()};
}

export default { getDepartements }
