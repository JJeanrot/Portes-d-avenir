import LocalSource from "@/services/localsource.service.js"

async function getBenevoles() {
    return {error: 0, data: LocalSource.getAllBenevoles()};
}

export default { getBenevoles }
