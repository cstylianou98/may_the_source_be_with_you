DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS tokenAdmin;
DROP TABLE IF EXISTS volunteering;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS admins;


CREATE TABLE users(
users_id INT GENERATED ALWAYS AS IDENTITY,
username VARCHAR(200) UNIQUE NOT NULL,
password VARCHAR(200) NOT NULL,
PRIMARY KEY (users_id)
);

CREATE TABLE admins(
    admins_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    PRIMARY KEY (admins_id)
);


CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    users_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (users_id) REFERENCES users("users_id")
);

CREATE TABLE tokenAdmin (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    admins_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (admins_id) REFERENCES admins("admins_id")
);

CREATE TABLE volunteering(
    volunteering_id INT GENERATED ALWAYS AS IDENTITY,
    users_id INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    contact_info VARCHAR(200) NOT NULL,
    address VARCHAR(200) NOT NULL,
    volunteering_type VARCHAR(200) NOT NULL,
    PRIMARY KEY (volunteering_id),
    FOREIGN KEY (users_id) REFERENCES users("users_id"),
    CONSTRAINT combo UNIQUE (users_id,name, volunteering_type)
);

INSERT INTO admins (username, password) 
VALUES ('constantinos', 'stylianou'),
('ishaaq', 'baig'),
('bee', 'vanZyl')






