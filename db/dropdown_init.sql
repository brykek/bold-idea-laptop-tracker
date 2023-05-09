INSERT INTO status(options)
VALUES ('UNPROCESSED'),
       ('DONATED'),
       ('READY'),
       ('INTERNAL'),
       ('RECYCLE'),
       ('REINSTALL'),
       ('SOLD');

INSERT INTO disk_size(options)
VALUES ('128 GB'),
       ('256 GB'),
       ('512 GB'),
       ('1024 GB');

INSERT INTO screen_size(options)
VALUES ('12 "'),
       ('13 "'),
       ('14 "'),
       ('15 "'),
       ('16 "');

INSERT INTO memory(options)
VALUES ('8 GB'),
       ('16 GB'),
       ('32 GB');

INSERT INTO laptop_condition(options)
VALUES ('A'),
       ('B'),
       ('C');
       
INSERT INTO manufacturer(options)
VALUES ('Apple'),
       ('Windows');

INSERT INTO donated_by(options)
VALUES ('BetterUp'),
       ('OrderMyGear');