TRUNCATE token RESTART IDENTITY CASCADE;
TRUNCATE tokenAdmin RESTART IDENTITY CASCADE;
TRUNCATE volunteering RESTART IDENTITY CASCADE;
TRUNCATE users RESTART IDENTITY CASCADE;
TRUNCATE admins RESTART IDENTITY CASCADE;

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

INSERT INTO token(users_id, token)
VALUES (3,'tick'),(1,'tock');
INSERT INTO tokenAdmin(admins_id, token)
VALUES (3,'clock');