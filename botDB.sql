--- This file contains the db schema and table definitions

--- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `botDB`;
USE botDB;

--- Create the table users if it doesn't exist
DROP TABLE `Users`;
CREATE TABLE IF NOT EXISTS Users(
    id VARCHAR(60) PRIMARY KEY, 
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);
