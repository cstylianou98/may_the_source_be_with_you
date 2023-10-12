TRUNCATE token RESTART IDENTITY CASCADE;
TRUNCATE tokenAdmin RESTART IDENTITY CASCADE;
TRUNCATE volunteering RESTART IDENTITY CASCADE;
TRUNCATE users RESTART IDENTITY CASCADE;
TRUNCATE admins RESTART IDENTITY CASCADE;
-- DROP TABLE IF EXISTS token;
-- DROP TABLE IF EXISTS tokenAdmin;
-- DROP TABLE IF EXISTS volunteering;
-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS admins;


-- CREATE TABLE users(
-- users_id INT GENERATED ALWAYS AS IDENTITY,
-- username VARCHAR(200) UNIQUE NOT NULL,
-- password VARCHAR(200) NOT NULL,
-- PRIMARY KEY (users_id)
-- );

-- CREATE TABLE admins(
--     admins_id INT GENERATED ALWAYS AS IDENTITY,
--     username VARCHAR(200) UNIQUE NOT NULL,
--     password VARCHAR(200) NOT NULL,
--     PRIMARY KEY (admins_id)
-- );


-- CREATE TABLE token (
--     token_id INT GENERATED ALWAYS AS IDENTITY,
--     users_id INT NOT NULL,
--     token CHAR(36) UNIQUE NOT NULL,
--     PRIMARY KEY (token_id),
--     FOREIGN KEY (users_id) REFERENCES users("users_id")
-- );

-- CREATE TABLE tokenAdmin (
--     token_id INT GENERATED ALWAYS AS IDENTITY,
--     admins_id INT NOT NULL,
--     token CHAR(36) UNIQUE NOT NULL,
--     PRIMARY KEY (token_id),
--     FOREIGN KEY (admins_id) REFERENCES admins("admins_id")
-- );

-- CREATE TABLE volunteering(
--     volunteering_id INT GENERATED ALWAYS AS IDENTITY,
--     users_id INT NOT NULL,
--     name VARCHAR(200) NOT NULL,
--     email VARCHAR(200) NOT NULL,
--     contact_info VARCHAR(200) NOT NULL,
--     address VARCHAR(200) NOT NULL,
--     volunteering_type VARCHAR(200) NOT NULL,
--     PRIMARY KEY (volunteering_id),
--     FOREIGN KEY (users_id) REFERENCES users("users_id"),
--     CONSTRAINT combo UNIQUE (users_id,name, volunteering_type)
-- );

INSERT INTO users(username,password)
VALUES ('a','1'),('b','2'),('c','3'),('d','4'),('e','5');

INSERT INTO admins(username,password)
VALUES ('admin1','pass1'),('admin2','pass2'),('admin3','pass3');

INSERT INTO volunteering(users_id,name,email,contact_info,address,volunteering_type)
VALUES (1,'A','email','000','address','1'),
(3,'C','email','000','address','1'),
(4,'D','email','000','address','1'),
(1,'A','email','000','address','2'),
(2,'B','email','000','address','2'),
(2,'B','email','000','address','3'),
(1,'A','email','000','address','4'),
(2,'B','email','000','address','4'),
(3,'C','email','000','address','4'),
(4,'D','email','000','address','4');