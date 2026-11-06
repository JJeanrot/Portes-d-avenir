
const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const routesEvenements = require('./routes/evenements.routes');
const chargerDocumentation = require('./docs/charger-docs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
BigInt.prototype.toJSON = function() { return Number(this); };
app.use(cors({ origin: 'http://localhost:5173' }));

// Initialisation asynchrone de la documentation Swagger à partir des fichiers YAML
chargerDocumentation()
    .then((openapiDoc) => {
        app.use('/docs', swaggerUI.serve, swaggerUI.setup(openapiDoc));
    })
    .catch((err) => {
        console.error('Erreur lors du chargement de la documentation OpenAPI:', err);
    });

app.use('/event', routesEvenements);



app.listen(PORT, () => {
    console.log(`Api backend de porte d'avenir http://localhost:${PORT}`);
});
