import LocalSource from "@/services/localsource.service.js";

async function getInscriptionsFromLocalSource() {
    return LocalSource.getAllInscriptions();
}

async function getBenevoleInscriptionsFromLocalSource(benevole_id) {
    return LocalSource.getBenevoleInscriptions(benevole_id);
}

async function addInscriptionFromLocalSource(inscription) {
    return LocalSource.addInscription(inscription);
}

async function getInscriptions() {
    let response = null;
    try {
        response = await getInscriptionsFromLocalSource()
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

async function addInscription(inscription) {
    let response = null;
    try {
        response = await addInscriptionFromLocalSource(inscription);
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de se connecter au serveur'  }
    }
    return response
}

export default {
    getInscriptions,
    getBenevoleInscriptions,
    addInscription
}

