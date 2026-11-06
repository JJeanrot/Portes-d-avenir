const path = require('path');
const $RefParser = require('@apidevtools/json-schema-ref-parser');

async function chargerDocumentation() {
    const documentPath = path.join(__dirname, 'openapi.yaml');
    // dereference résout tous les $ref externes (comme ./evenements.yaml)
    return await $RefParser.dereference(documentPath);
}

module.exports = chargerDocumentation;
