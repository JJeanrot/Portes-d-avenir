const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API test',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/*.js', './server.js'],
});


const app = express();
const PORT = process.env.PORT || 3000;


app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerOptions));

app.use(cors({ origin: 'http://localhost:5173' }));


app.listen(PORT, () => {
    console.log(`Api backend de porte d'avenir http://localhost:${PORT}`);
});
