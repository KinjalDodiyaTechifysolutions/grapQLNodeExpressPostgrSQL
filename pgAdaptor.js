require('dotenv').config()
const pgPromise = require('pg-promise');

const pgp = pgPromise({});

const config = {
    host: process.env.POSTGRESQL_HOST,
    port: process.env.POSTGRESQL_PORT,
    database: process.env.POSTGRESQL_DB,
    user: process.env.POSTGRESQL_USER,
    password: process.env.POSTGRESQL_PASSWORD
};

const db = pgp(config);

exports.db = db;