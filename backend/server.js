
const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Mon API Express Dynamique',
            version: '1.0.0',
            description: 'Documentation auto-générée via les commentaires du code',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    // Chemin vers les fichiers contenant les routes à documenter
    apis: ['./routes/*.js', './app.js'],
};


const app = express();
const PORT = process.env.PORT || 3000;


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors({ origin: 'http://localhost:5173' }));


app.listen(PORT, () => {
    console.log(`Api backend de porte d'avenir http://localhost:${PORT}`);
});
