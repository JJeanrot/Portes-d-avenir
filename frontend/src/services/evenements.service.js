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

async function getLowestAvailableEvenementId() {
    let response = null;
    try {
        response = await getEvenementsFromLocalSource()
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de se connecter au serveur'  }
    }
    
    let ids = [];
    response.data.forEach(evenement => {
        ids.push(evenement.id_evenement);
    });

    let lowestId = 1;
    let available = false;
    const maxId = Math.max(...ids);
    while (lowestId < maxId && !available) {
        if (!ids.includes(lowestId)) {
            available = true;
        }
        else {
            lowestId++;
        }
    }

    if (!available) {
        lowestId++;
    }        

    return {error: 0, data: lowestId};

    
}

async function addEvenement(evenement) {
    let response = null;
    try {
        response = await addEvenementFromLocalSource(evenement);
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de se connecter au serveur'  }
    }
    return response
}

export default { getEvenements, getLowestAvailableEvenementId, addEvenement }
