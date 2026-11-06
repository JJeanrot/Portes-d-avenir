import LocalSource from "@/services/localsource.service.js";

async function getEvenementsFromLocalSource() {
    return LocalSource.getEvenements();
}

async function addEvenementFromLocalSource(evenement) {
    return LocalSource.addEvenement(evenement);
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

async function addEvenement(evenement) {
    let response = null;
    console.log("sus");
    try {
        response = await addEvenementFromLocalSource(evenement);
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de se connecter au serveur'  }
    }
    return response
}

export default { getEvenements, addEvenement }
