import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

//Configuration with dot env
dotenv.config()

//Database connection setup
export const db = new Sequelize(
    'botDB',
//retrieves the database username from the env variable
    process.env.DB_USER,
//retrieves the database username from the env variable
    process.env.DB_PASSWD,
    {
        dialect: 'mysql',
        port: 3306,
        host: 'localhost'
    }
)
