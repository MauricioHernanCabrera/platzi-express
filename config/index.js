require('dotenv').config()

const {
    NODE_ENV,
    DB_PORT,
    DB_HOST,
    DB_NAME,
    AUTH_ADMIN_USERNAME,
    AUTH_ADMIN_PASSWORD,
    AUTH_ADMIN_EMAIL,
    AUTH_JWT_SECRET
} = process.env

const config = {
    dev: NODE_ENV !== 'production',
    dbPort: DB_PORT,
    dbHost: DB_HOST,
    dbName: DB_NAME,
    authAdminUsername: AUTH_ADMIN_USERNAME,
    authAdminPassword: AUTH_ADMIN_PASSWORD,
    authAdminEmail: AUTH_ADMIN_EMAIL,
    authJwtSecret: AUTH_JWT_SECRET
}

module.exports = { config }