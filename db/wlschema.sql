DROP DATABASE  IF EXISTS wishlistdb;

CREATE DATABASE wishlistdb;

USE wishlistdb;

CREATE TABLE  userlogin
(   id INT NOT NULL AUTO_INCREMENT,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50)NOT NULL,
    email VARCHAR(35) NOT NULL,
    pword VARCHAR(10) NOT NULL,
    PRIMARY KEY(id));

ALTER TABLE userlogin AUTO_INCREMENT = 1000;

ALTER TABLE userlogin ADD CONSTRAINT UNIQUE(EMAIL);

CREATE TABLE wishlist
( id INT NOT NULL AUTO_INCREMENT,
   userid INT NOT NULL,
   product_name varchar(20) NOT NULL,
   product_desc VARCHAR(50) NOT NULL,
   product_price FLOAT,
   PRIMARY KEY(id),
   FOREIGN KEY(userid) REFERENCES userlogin(id));
   
desc userlogin;

desc wishlist;
