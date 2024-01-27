import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

export const db = new Sequelize(
    'botDB',
    process.env.DB_USER,
    process.env.DB_PASSWD,
    {
        dialect: 'mysql',
        port: 3306,
        host: 'localhost'
    }
)