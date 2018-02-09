DROP TABLE  Lot cascade constraints;
DROP TABLE  Bilet cascade constraints;
DROP TABLE  Bilet_Firma cascade constraints;
DROP TABLE  Klient cascade constraints;
DROP TABLE  Firma_Lotnisko cascade constraints;
DROP TABLE  Lotnisko cascade constraints;
DROP TABLE  FirmaLotnicza cascade constraints ;
DROP TABLE  Firma cascade constraints;
DROP TABLE  Bilet_Klient cascade constraints;
DROP TABLE  Trasa cascade constraints;
DROP TABLE  Pilot cascade constraints;
DROP TABLE  Samolot cascade constraints;
DROP TABLE  Data_lotu cascade constraints;


CREATE TABLE  Lot  (
  id_lotu  number,
  id_samolotu  number,
  klasa  varchar2(20),
  iloscMiejsc  number,
  id_pilota  number,
  id_trasy  number,
  id_daty  number,
  constraint pk_lot PRIMARY KEY ( id_lotu  )
  --PRIMARY KEY ( id_lotu ,  id_samolotu ,  id_pilota ,  id_trasy ,  id_daty )
);



CREATE TABLE  Bilet  (
  id_biletu  number,
  Klasa  varchar2(20),
  Nr_miejsca  number(3),
  id_lotu  number,
  id_daty  number,
  constraint pk_bilet  PRIMARY KEY ( id_biletu )
);


CREATE TABLE  Bilet_Firma  (
  id_firmy  number,
  id_biletu  number,
  constraint pk_bilet_firma  PRIMARY KEY ( id_firmy ,  id_biletu )
);

CREATE TABLE  Klient  (
  id_klienta  number,
  Imie  varchar2(20),
  Nazwisko  varchar2(20),
  constraint pk_klient   PRIMARY KEY ( id_klienta )
);

CREATE TABLE  Firma_Lotnisko  (
  id_firmyLotniczej  number,
  id_lotniska  number,
  constraint pk_firma_lotnisko   PRIMARY KEY ( id_firmyLotniczej ,  id_lotniska )
);

CREATE TABLE  Lotnisko  (
  id_lotniska  number,
  Miejscowosc  varchar2(25),
  IATA  varchar2(3),
  constraint pk_lotnisko   PRIMARY KEY ( id_lotniska )
);

CREATE TABLE  FirmaLotnicza  (
  id_firmyLotniczej  number,
  Nazwa  varchar2(25),
  Kraj  varchar2(25),
  NIP  number(10),
  Adres  varchar2(30),
  IATA  varchar(2),
  constraint pk_firmalotnicza  PRIMARY KEY ( id_firmyLotniczej )
);



CREATE TABLE  Firma  (
  id_firmy  number,
  Nazwa  varchar2(20),
  NIP  number(10),
  constraint pk_firma  PRIMARY KEY ( id_firmy )
);

CREATE TABLE  Bilet_Klient  (
  id_klienta  number,
  id_biletu  number,
  constraint pk_bilet_klient  PRIMARY KEY ( id_klienta ,  id_biletu )
);

CREATE TABLE  Trasa  (
  id_trasy  number,
  Poczatek  number,
  Koniec  number,
  constraint pk_trasa  PRIMARY KEY ( id_trasy )
);


CREATE TABLE  Pilot  (
  id_pilota  number,
  Imie  varchar2(25),
  Nazwisko  varchar2(25),
  constraint pk_pilot  PRIMARY KEY ( id_pilota )
);

CREATE TABLE  Samolot  (
  id_samolotu  number,
  Typ  varchar2(25),
  IloscMiejsc  number(3),
  id_firmylotniczej number,
  constraint pk_samolot  PRIMARY KEY ( id_samolotu )
);

CREATE TABLE  Data_lotu  (
  id_daty  number,
  Wylot  date,
  Przylot  date,
  constraint pk_data_lotu  PRIMARY KEY ( id_daty )
);


ALTER TABLE  Lot
  ADD constraint fk_lot_samolot FOREIGN KEY (id_samolotu) REFERENCES Samolot(id_samolotu)ON DELETE CASCADE;

ALTER TABLE  Lot
  ADD constraint fk_lot_pilot FOREIGN KEY (id_pilota) REFERENCES Pilot(id_pilota)ON DELETE CASCADE;

ALTER TABLE  Lot
  ADD constraint fk_lot_trasa FOREIGN KEY (id_trasy) REFERENCES Trasa(id_trasy)ON DELETE CASCADE;

ALTER TABLE  Lot
  ADD constraint fk_lot_data FOREIGN KEY (id_daty) REFERENCES Data_lotu(id_daty)ON DELETE CASCADE;

ALTER TABLE  Bilet
  ADD constraint fk_bilet_lot FOREIGN KEY (id_lotu) REFERENCES Lot(id_lotu)ON DELETE CASCADE;

ALTER TABLE  Bilet
  ADD constraint fk_bilet_data FOREIGN KEY (id_daty) REFERENCES Data_lotu(id_daty)ON DELETE CASCADE;

ALTER TABLE  Bilet_Klient
  ADD constraint fk_bilet_klient_klient FOREIGN KEY (id_klienta) REFERENCES Klient(id_klienta)ON DELETE CASCADE;

ALTER TABLE  Bilet_Klient
  ADD constraint fk_bilet_klient_bilet FOREIGN KEY (id_biletu) REFERENCES Bilet(id_biletu)ON DELETE CASCADE;

ALTER TABLE  Bilet_Firma
  ADD constraint fk_bilet_firma_firma FOREIGN KEY (id_firmy) REFERENCES Firma(id_firmy)ON DELETE CASCADE;

ALTER TABLE  Bilet_Firma
  ADD constraint fk_bilet_firma_bilet FOREIGN KEY (id_biletu) REFERENCES Bilet(id_biletu)ON DELETE CASCADE;

ALTER TABLE  Trasa
  ADD constraint fk_trasa_lotnisko_p FOREIGN KEY (Poczatek) REFERENCES Lotnisko(id_lotniska)ON DELETE CASCADE;

ALTER TABLE  Trasa
  ADD constraint fk_trasa_lotnisko_k FOREIGN KEY (Koniec) REFERENCES Lotnisko(id_lotniska)ON DELETE CASCADE;

ALTER TABLE  Firma_Lotnisko
  ADD constraint fk_firma_lotnisko_firma FOREIGN KEY (id_firmyLotniczej) REFERENCES FirmaLotnicza(id_firmyLotniczej)ON DELETE CASCADE;

ALTER TABLE  Firma_Lotnisko
  ADD constraint fk_firma_lotnisko_lotnisko FOREIGN KEY (id_lotniska) REFERENCES Lotnisko(id_lotniska)ON DELETE CASCADE;

ALTER TABLE  Samolot
  ADD constraint fk_samolot_firma FOREIGN KEY (id_firmyLotniczej) REFERENCES FirmaLotnicza(id_firmyLotniczej)ON DELETE CASCADE;



INSERT INTO LOTNISKO VALUES (1,'WARSAW','WAW');
INSERT INTO LOTNISKO VALUES (2,'LONDON','LDN');
INSERT INTO LOTNISKO VALUES (3,'WARSAW','WMI');
INSERT INTO LOTNISKO VALUES (4,'BERLIN','BER');
INSERT INTO LOTNISKO VALUES (5,'GDANSK','GDN');
INSERT INTO LOTNISKO VALUES (6,'KRAKOW','KRK');
INSERT INTO LOTNISKO VALUES (7,'NEW YORK','NYC');
INSERT INTO LOTNISKO VALUES (8,'LOS ANGELES','LAX');
INSERT INTO LOTNISKO VALUES (9,'DUBAI','DXB');
INSERT INTO LOTNISKO VALUES (10,'TOKYO','HND');
INSERT INTO LOTNISKO VALUES (11,'PARIS','CDG');
INSERT INTO LOTNISKO VALUES (12,'FRANFKURT','FRA');
INSERT INTO LOTNISKO VALUES (13,'DELHI','DEL');
INSERT INTO LOTNISKO VALUES (14,'MADRID','MAD');
INSERT INTO LOTNISKO VALUES (15,'MUNICH','MUN');

INSERT INTO FIRMALOTNICZA VALUES (1, 'LOT','POLAND','5220002334','17 Stycznia 43','LO');
INSERT INTO FIRMALOTNICZA VALUES (2, 'American Airlines Group','USA','5260309406','al. Ujazdowskie 20','AA');
INSERT INTO FIRMALOTNICZA VALUES (3, 'Lufthansa Group','GERMANY','5832468348','aleja Zwycięstwa 13','LH');
INSERT INTO FIRMALOTNICZA VALUES (4, 'Air France-KLM','FRANCE','5260013663','Nowy Świat 64','AF');
INSERT INTO FIRMALOTNICZA VALUES (5, 'Ryanair','IRELAND','5213788049','Etiudy Rewolucyjnej 40','FR');
INSERT INTO FIRMALOTNICZA VALUES (6, 'Turkish Airlines','TURKEY','5262458748','Aleje jerozolimskie 123a','TK');
INSERT INTO FIRMALOTNICZA VALUES (7, 'Wizzair','HUNGARY','1070000388','Wolności 90','W6');
INSERT INTO FIRMALOTNICZA VALUES (8, 'Emirates','UNITED ARAB EMIRATES','1070001229','Złota 59','EK');
INSERT INTO FIRMALOTNICZA VALUES (9, 'Air Canada','CANADA','5260304099','Marszałkowska 28','AC');
INSERT INTO FIRMALOTNICZA VALUES (10, 'British Airways','UNITED KINGDOM','5260002702','Marszałkowska 76','BA');

INSERT INTO SAMOLOT VALUES(1,'BOEING 787', 252, 1);
INSERT INTO SAMOLOT VALUES(2,'BOEING 737', 186, 1);
INSERT INTO SAMOLOT VALUES(3,'EMBRAER 195', 112, 1);
INSERT INTO SAMOLOT VALUES(4,'EMBRAER 175', 82, 1);

INSERT INTO SAMOLOT VALUES(5,'Airbus A319', 160, 2);
INSERT INTO SAMOLOT VALUES(6,'Airbus A330', 335, 2);
INSERT INTO SAMOLOT VALUES(7,'Airbus  A321', 206, 2);

INSERT INTO SAMOLOT VALUES(8,'Airbus A380', 509, 3);
INSERT INTO SAMOLOT VALUES(9,'Boeing 747', 364, 3);
INSERT INTO SAMOLOT VALUES(10,'Airbus A340', 297, 3);
INSERT INTO SAMOLOT VALUES(11,'Airbus A321', 200, 3);

INSERT INTO SAMOLOT VALUES(12,'BOEING 787', 276, 4);
INSERT INTO SAMOLOT VALUES(13,'BOEING 777', 425, 4);
INSERT INTO SAMOLOT VALUES(14,'AIRBUS A380-800', 516, 4);
INSERT INTO SAMOLOT VALUES(15,'Airbus A320', 178, 4);

INSERT INTO SAMOLOT VALUES(16,'Airbus A340', 297, 5);
INSERT INTO SAMOLOT VALUES(17,'BOEING 777', 425, 5);
INSERT INTO SAMOLOT VALUES(18,'Airbus A330', 335, 5);
INSERT INTO SAMOLOT VALUES(19,'Boeing 747', 364, 5);

INSERT INTO SAMOLOT VALUES(20,'Airbus A300B4', 271, 6);
INSERT INTO SAMOLOT VALUES(21,'Airbus A310-200', 262, 6);
INSERT INTO SAMOLOT VALUES(22,'Airbus A319-100', 156, 6);

INSERT INTO SAMOLOT VALUES(23,'Airbus A320-200', 178, 7);
INSERT INTO SAMOLOT VALUES(24,'Airbus A321', 206, 7);

INSERT INTO SAMOLOT VALUES(25,'Airbus A380-800', 489, 8);
INSERT INTO SAMOLOT VALUES(26,'Boeing 777-200LR', 266, 8);
INSERT INTO SAMOLOT VALUES(27,'Boeing 777-300ER', 360, 8);

INSERT INTO SAMOLOT VALUES(28,'Airbus A330-300', 335, 9);
INSERT INTO SAMOLOT VALUES(29,'Boeing 777-300ER', 360, 9);
INSERT INTO SAMOLOT VALUES(30,'Boeing 787-8', 250, 9);

INSERT INTO SAMOLOT VALUES(31,'Airbus A318-100', 250, 10);
INSERT INTO SAMOLOT VALUES(32,'Airbus A319-100', 350, 10);
INSERT INTO SAMOLOT VALUES(33,'Boeing 787-8 Dreamliner', 408, 10);

INSERT INTO FIRMA_LOTNISKO VALUES (1,1);
INSERT INTO FIRMA_LOTNISKO VALUES (1,3);
INSERT INTO FIRMA_LOTNISKO VALUES (1,2);
INSERT INTO FIRMA_LOTNISKO VALUES (1,4);
INSERT INTO FIRMA_LOTNISKO VALUES (1,5);
INSERT INTO FIRMA_LOTNISKO VALUES (1,6);
INSERT INTO FIRMA_LOTNISKO VALUES (1,11);
INSERT INTO FIRMA_LOTNISKO VALUES (1,12);
INSERT INTO FIRMA_LOTNISKO VALUES (1,14);
INSERT INTO FIRMA_LOTNISKO VALUES (1,15);

INSERT INTO FIRMA_LOTNISKO VALUES (2,7);
INSERT INTO FIRMA_LOTNISKO VALUES (2,8);
INSERT INTO FIRMA_LOTNISKO VALUES (2,9);
INSERT INTO FIRMA_LOTNISKO VALUES (2,2);

INSERT INTO FIRMA_LOTNISKO VALUES (3,1);
INSERT INTO FIRMA_LOTNISKO VALUES (3,2);
INSERT INTO FIRMA_LOTNISKO VALUES (3,13);
INSERT INTO FIRMA_LOTNISKO VALUES (3,10);
INSERT INTO FIRMA_LOTNISKO VALUES (3,12);
INSERT INTO FIRMA_LOTNISKO VALUES (3,15);
INSERT INTO FIRMA_LOTNISKO VALUES (3,14);
INSERT INTO FIRMA_LOTNISKO VALUES (3,11);

INSERT INTO FIRMA_LOTNISKO VALUES (4,1);
INSERT INTO FIRMA_LOTNISKO VALUES (4,2);
INSERT INTO FIRMA_LOTNISKO VALUES (4,7);
INSERT INTO FIRMA_LOTNISKO VALUES (4,11);
INSERT INTO FIRMA_LOTNISKO VALUES (4,12);
INSERT INTO FIRMA_LOTNISKO VALUES (4,14);
INSERT INTO FIRMA_LOTNISKO VALUES (4,15);

INSERT INTO FIRMA_LOTNISKO VALUES (5,3);
INSERT INTO FIRMA_LOTNISKO VALUES (5,2);
INSERT INTO FIRMA_LOTNISKO VALUES (5,12);
INSERT INTO FIRMA_LOTNISKO VALUES (5,13);
INSERT INTO FIRMA_LOTNISKO VALUES (5,5);

INSERT INTO FIRMA_LOTNISKO VALUES (6,6);
INSERT INTO FIRMA_LOTNISKO VALUES (6,2);
INSERT INTO FIRMA_LOTNISKO VALUES (6,11);

INSERT INTO FIRMA_LOTNISKO VALUES (7,1);
INSERT INTO FIRMA_LOTNISKO VALUES (7,6);
INSERT INTO FIRMA_LOTNISKO VALUES (7,3);
INSERT INTO FIRMA_LOTNISKO VALUES (7,13);
INSERT INTO FIRMA_LOTNISKO VALUES (7,15);

INSERT INTO FIRMA_LOTNISKO VALUES (8,1);
INSERT INTO FIRMA_LOTNISKO VALUES (8,6);
INSERT INTO FIRMA_LOTNISKO VALUES (8,9);

INSERT INTO FIRMA_LOTNISKO VALUES (9,1);
INSERT INTO FIRMA_LOTNISKO VALUES (9,4);
INSERT INTO FIRMA_LOTNISKO VALUES (9,15);
INSERT INTO FIRMA_LOTNISKO VALUES (9,10);

INSERT INTO FIRMA_LOTNISKO VALUES (10,1);
INSERT INTO FIRMA_LOTNISKO VALUES (10,3);
INSERT INTO FIRMA_LOTNISKO VALUES (10,2);
INSERT INTO FIRMA_LOTNISKO VALUES (10,7);
INSERT INTO FIRMA_LOTNISKO VALUES (10,11);
INSERT INTO FIRMA_LOTNISKO VALUES (10,12);


INSERT INTO PILOT VALUES(1, 'Bill', 'Bedford');
INSERT INTO PILOT VALUES(2, 'Frank', 'Blackmore');
INSERT INTO PILOT VALUES(3, 'Maksymilian', 'Chojnacki');
INSERT INTO PILOT VALUES(4, 'Mateusz', 'Woźniak');
INSERT INTO PILOT VALUES(5, 'Walter', 'Morison');
INSERT INTO PILOT VALUES(6, 'Franciszek', 'Kornicki');
INSERT INTO PILOT VALUES(7, 'Peter', 'Horsley');
INSERT INTO PILOT VALUES(8, 'Kacper', 'Nowakowski');
INSERT INTO PILOT VALUES(9, 'Gordon', 'Brettell');
INSERT INTO PILOT VALUES(10, 'Antoni', 'Sosnowski');
INSERT INTO PILOT VALUES(11, 'Jakub ', 'Stefański');
INSERT INTO PILOT VALUES(12, 'David', 'Lee');
INSERT INTO PILOT VALUES(13, 'Peter', 'Fokes');
INSERT INTO PILOT VALUES(14, 'Jerzy', 'Kozłowski');

INSERT INTO TRASA VALUES(1,1,2);
INSERT INTO TRASA VALUES(2,3,5);
INSERT INTO TRASA VALUES(3,2,8);
INSERT INTO TRASA VALUES(4,1,10);
INSERT INTO TRASA VALUES(5,9,4);
INSERT INTO TRASA VALUES(6,10,15);
INSERT INTO TRASA VALUES(7,12,14);
INSERT INTO TRASA VALUES(8,4,12);
INSERT INTO TRASA VALUES(9,13,5);
INSERT INTO TRASA VALUES(10,11,10);
INSERT INTO TRASA VALUES(11,11,7);
INSERT INTO TRASA VALUES(12,5,2);
INSERT INTO TRASA VALUES(13,9,4);
INSERT INTO TRASA VALUES(14,14,12);
INSERT INTO TRASA VALUES(15,7,9);

INSERT INTO Data_lotu VALUES(1,'2017/11/1','2017/11/2');
INSERT INTO Data_lotu VALUES(2,'2017/11/2','2017/11/3');
INSERT INTO Data_lotu VALUES(3,'2017/11/3','2017/11/4');
INSERT INTO Data_lotu VALUES(4,'2017/11/4','2017/11/5');
INSERT INTO Data_lotu VALUES(5,'2017/11/5','2017/11/6');
INSERT INTO Data_lotu VALUES(6,'2017/11/6','2017/11/7');
INSERT INTO Data_lotu VALUES(7,'2017/11/7','2017/11/8');
INSERT INTO Data_lotu VALUES(8,'2017/11/8','2017/11/9');
INSERT INTO Data_lotu VALUES(9,'2017/11/9','2017/11/10');
INSERT INTO Data_lotu VALUES(10,'2017/11/10','2017/11/11');
INSERT INTO Data_lotu VALUES(11,'2017/11/11','2017/11/12');
INSERT INTO Data_lotu VALUES(12,'2017/11/12','2017/11/13');
INSERT INTO Data_lotu VALUES(13,'2017/11/13','2017/11/14');
INSERT INTO Data_lotu VALUES(14,'2017/11/14','2017/11/15');
INSERT INTO Data_lotu VALUES(15,'2017/11/15','2017/11/16');

INSERT INTO LOT VALUES(1,1,'Ekonomiczna',102,1,1,1);
INSERT INTO LOT VALUES(2,2,'Ekonomiczna',102,1,2,2);
INSERT INTO LOT VALUES(3,3,'Ekonomiczna',102,1,3,3);
INSERT INTO LOT VALUES(4,4,'Ekonomiczna',102,1,4,4);
INSERT INTO LOT VALUES(5,1,'Ekonomiczna',102,1,5,5);
INSERT INTO LOT VALUES(6,2,'Ekonomiczna',102,1,6,7);
INSERT INTO LOT VALUES(8,8,'Ekonomiczna',102,1,8,8);
INSERT INTO LOT VALUES(9,9,'Ekonomiczna',102,1,9,9);
INSERT INTO LOT VALUES(10,5,'Ekonomiczna',102,1,7,10);
INSERT INTO LOT VALUES(11,6,'Ekonomiczna',102,1,8,12);
INSERT INTO LOT VALUES(12,12,'Ekonomiczna',102,1,12,12);
INSERT INTO LOT VALUES(13,13,'Ekonomiczna',102,1,13,13);
INSERT INTO LOT VALUES(14,11,'Biznes',102,1,11,14);
INSERT INTO LOT VALUES(15,10,'Ekonomiczna',102,1,5,15);

INSERT INTO BILET VALUES(1,'Biznes',01,1,1);
INSERT INTO BILET VALUES(2,'Biznes',02,1,1);
INSERT INTO BILET VALUES(3,'Biznes',03,1,1);
INSERT INTO BILET VALUES(4,'Ekonomiczna',01,2,2);
INSERT INTO BILET VALUES(5,'Ekonomiczna',02,2,2);
INSERT INTO BILET VALUES(6,'Ekonomiczna',03,2,2);
INSERT INTO BILET VALUES(7,'Pierwsza',01,5,5);
INSERT INTO BILET VALUES(8,'Pierwsza',02,5,5);
INSERT INTO BILET VALUES(9,'Pierwsza',03,5,5);
INSERT INTO BILET VALUES(10,'Biznes',01,14,14);
INSERT INTO BILET VALUES(11,'Biznes',02,14,14);
INSERT INTO BILET VALUES(12,'Biznes',03,14,14);
INSERT INTO BILET VALUES(13,'Ekonomiczna',01,15,15);
INSERT INTO BILET VALUES(14,'Ekonomiczna',02,15,15);
INSERT INTO BILET VALUES(15,'Ekonomiczna',03,15,15);

INSERT INTO KLIENT VALUES(1,'Jan','Nowak');
INSERT INTO KLIENT VALUES(2,'Andrzej','Nos');
INSERT INTO KLIENT VALUES(3,'Piotr','Kowalski');
INSERT INTO KLIENT VALUES(4,'Anna','Zawadzka');
INSERT INTO KLIENT VALUES(5,'Jerzy','Adamski');
INSERT INTO KLIENT VALUES(6,'Karolina','Dab');
INSERT INTO KLIENT VALUES(7,'Dawid','Zsiadlo');
INSERT INTO KLIENT VALUES(8,'Zbigniew','Adnrzejewski');
INSERT INTO KLIENT VALUES(9,'Danuta','Kod');
INSERT INTO KLIENT VALUES(10,'Witold','Jaki');
INSERT INTO KLIENT VALUES(11,'Dzesika','Tomulec');
INSERT INTO KLIENT VALUES(12,'Sebastian','Zly');
INSERT INTO KLIENT VALUES(13,'Paulina','Wójcik');
INSERT INTO KLIENT VALUES(14,'Damian','Krawczyk');
INSERT INTO KLIENT VALUES(15,'Gabriela','Jablonska');

INSERT INTO FIRMA VALUES(1,'Torint','9267917820');
INSERT INTO FIRMA VALUES(2,'Enixima','1728991929');
INSERT INTO FIRMA VALUES(3,'Hostno','5123846953');
INSERT INTO FIRMA VALUES(4,'ZaRogiem','1452387956');
INSERT INTO FIRMA VALUES(5,'NaCzasie','6942357891');
INSERT INTO FIRMA VALUES(6,'Quanto','8523741965');
INSERT INTO FIRMA VALUES(7,'JANEXBUD','1247698354');
INSERT INTO FIRMA VALUES(8,'Przeblysk','4127598635');
INSERT INTO FIRMA VALUES(9,'Bison','2793465183');
INSERT INTO FIRMA VALUES(10,'Noreximo','6984235189');
INSERT INTO FIRMA VALUES(11,'Warmedia','1021024569');
INSERT INTO FIRMA VALUES(12,'Gento','3013025413');
INSERT INTO FIRMA VALUES(13,'Vegent','9267917820');
INSERT INTO FIRMA VALUES(14,'Grosik','8523697456');
INSERT INTO FIRMA VALUES(15,'Prestigmo','1025897463');


INSERT INTO BILET_FIRMA VALUES(1,15);
INSERT INTO BILET_FIRMA VALUES(2,14);
INSERT INTO BILET_FIRMA VALUES(3,13);
INSERT INTO BILET_FIRMA VALUES(4,12);
INSERT INTO BILET_FIRMA VALUES(5,11);
INSERT INTO BILET_FIRMA VALUES(6,10);
INSERT INTO BILET_FIRMA VALUES(7,9);
INSERT INTO BILET_FIRMA VALUES(8,8);
INSERT INTO BILET_FIRMA VALUES(9,7);
INSERT INTO BILET_FIRMA VALUES(10,6);
INSERT INTO BILET_FIRMA VALUES(11,5);
INSERT INTO BILET_FIRMA VALUES(12,4);
INSERT INTO BILET_FIRMA VALUES(13,3);
INSERT INTO BILET_FIRMA VALUES(14,2);
INSERT INTO BILET_FIRMA VALUES(15,1);

drop table credentials;
CREATE TABLE  Credentials  (
  user_id number,
  user_name  varchar2(25) not Null unique,
  user_password  varchar2(25),
  user_role  varchar2(25),
  user_role_id  number(25),
  constraint pk_credentials  PRIMARY KEY ( user_id )
);

INSERT INTO credentials VALUES (1,'admin','admin','admin',1);
INSERT INTO credentials VALUES (2,'klient','klient','klient',1);
INSERT INTO credentials VALUES (3,'firma','firma','firma',1);
INSERT INTO credentials VALUES (4,'pilot','pilot','pilot',1);
INSERT INTO credentials VALUES (5,'firmaLotnicza','firmaLotnicza','firmaLotnicza',1);
INSERT INTO credentials VALUES (6,'lotnisko','lotnisko','lotnisko',1);

commit;