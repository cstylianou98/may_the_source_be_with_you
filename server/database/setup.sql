DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS users;


CREATE TABLE users(
users_id INT GENERATED ALWAYS AS IDENTITY,
username VARCHAR(200) NOT NULL,
password VARCHAR(200) NOT NULL,
PRIMARY KEY (users_id)
)

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    users_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (users_id) REFERENCES users("users_id")
)