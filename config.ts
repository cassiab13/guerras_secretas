import dotenv from 'dotenv';

dotenv.config();

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '27017';
const dbName = process.env.DB_NAME;

const config = {
    dbName,
    dbUrl: `mongodb://${dbHost}:${dbPort}`
}

export default config;