import LocalSource from "@/services/localsource.service.js";

async function getInscriptionsFromLocalSource() {
    return LocalSource.getEvenements();
}

async function getBenevoleInscriptionsFromLocalSource(benevole_id) {
    return LocalSource.getBenevoleInscriptions(benevole_id);
}

async function getInscriptions() {
    let response = null;
    try {
        response = await getEvenementsFromLocalSource()
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de se connecter au serveur'  }
    }
    return response
}

async function getBenevoleInscriptions(benevole_id) {
    let response = null;
    try {
        response = await getBenevoleInscriptionsFromLocalSourcell(benevole_id);
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de se connecter au serveur'  }
    }
    return response;
}

