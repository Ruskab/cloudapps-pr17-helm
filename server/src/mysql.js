import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';
import DebugLib from 'debug';

const debug = new DebugLib('server:mysql');

const MYSQL_HOST = process.env.MYSQL_HOST || "localhost";
const MYSQL_DB = process.env.MYSQL_DB || "eoloplantsDB";
const MYSQL_USER = process.env.MYSQL_USER || "root";
const MYSQL_PASS = process.env.MYSQL_PASS || "password";

export default new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASS, {
    host: MYSQL_HOST,
    dialect: 'mysql',
    dialectModule: mysql2,
    logging: false
});

process.on('exit', async () => {
    await sequelize.close();
    debug(`Closing mysql connection`);
});
