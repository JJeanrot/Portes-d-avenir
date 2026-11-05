import LocalSource from "@/services/localsource.service.js";

async function getEvenementsFromLocalSource() {
    return LocalSource.getEvenements();
}


async function getEvenements() {
    let response = null;
    try {
        response = await getEvenementsFromLocalSource()
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de se connecter au serveur'  }
    }
    return response
}
export default { getEvenements }
