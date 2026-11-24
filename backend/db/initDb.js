const fs = require('fs');
const path = require('path');
const mariadb = require('mariadb');

async function reinitialiser() {
    console.log('Connexion à MariaDB...');
    console.log(`Hôte: ${process.env.DB_HOST || 'localhost'}, Base: ${process.env.DB_NAME}, Utilisateur: ${process.env.DB_USER}`);

    let conn;
    try {
        conn = await mariadb.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            multipleStatements: true
        });

        console.log('Connecté avec succès.');

        const scriptSqlPath = path.join(__dirname, 'script.sql');
        const datasetSqlPath = path.join(__dirname, 'testDataset.sql');

        console.log('1/2 Exécution de script.sql (création des tables)...');
        const scriptSql = fs.readFileSync(scriptSqlPath, 'utf8');
        await conn.query(scriptSql);
        console.log('Tables créées avec succès.');

        console.log('2/2 Exécution de testDataset.sql (insertion des données de test)...');
        const datasetSql = fs.readFileSync(datasetSqlPath, 'utf8');
        await conn.query(datasetSql);
        console.log('Données insérées avec succès.');

        console.log('Base de données réinitialisée avec succès !');
    } catch (err) {
        console.error('Erreur lors de la réinitialisation de la base de données :', err);
        process.exitCode = 1;
    } finally {
        if (conn) {
            await conn.end();
        }
    }
}

reinitialiser();
