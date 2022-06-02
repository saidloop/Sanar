CREATE DATABASE database_drogueria_sanar;

USE database_drogueria_sanar;

CREATE TABLE droguerias(
        id INTEGER PRIMARY KEY AUTOINCREMENT (11) NOT NULL,
        name varchar(16) NOT NULL,
        address varchar(16)NOT NULL,
)

describe droguerias;

CREATE TABLE productos(
    id INTEGER PRIMARY KEY AUTOINCREMENT (11) NOT NULL,
    name varchar(16) NOT NULL,
    description varchar(16) NOT NULL,
    price decimal(10,2) NOT NULL,
    droguerias_id int(11),
    CONSTRAINT fk_droguerias_productos FOREIGN key (droguerias_id) REFERENCES droguerias (id) 
);

