DROP DATABASE  IF EXISTS wishlist;

CREATE DATABASE wishlist;

USE wishlist;

CREATE TABLE  userlogin
(   id INT NOT NULL AUTO_INCREMENT,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50)NOT NULL,
    email VARCHAR(35) NOT NULL,
    pword VARCHAR(10) NOT NULL,
    PRIMARY KEY(id));

ALTER TABLE userlogin AUTO_INCREMENT = 1000;

CREATE TABLE groups
( id INT NOT NULL AUTO_INCREMENT,
  group_name VARCHAR(35) NOT NULL,
  group_description varchar(100),
  user_id INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(user_id) REFERENCES userlogin(id));

ALTER TABLE groups AUTO_INCREMENT = 100;

CREATE TABLE useringroup
(    id INT NOT NULL AUTO_INCREMENT,
     user_id INT NOT NULL,
     groups_id INT NOT NULL,
     PRIMARY KEY(id),
     FOREIGN KEY(user_id) REFERENCES userlogin(id),
     FOREIGN KEY(groups_id) REFERENCES groups(id));

ALTER TABLE useringroup AUTO_INCREMENT = 10000;

CREATE TABLE usergroupproducts
(   id INT NOT NULL AUTO_INCREMENT,
    usergrp_id INT NOT NULL,
	  product_id INT NOT NULL,
    product_desc VARCHAR(50),
    product_price FLOAT,
    PRIMARY KEY(id),
    FOREIGN KEY(usergrp_id) REFERENCES useringroup(id));

ALTER TABLE usergroupproducts AUTO_INCREMENT = 15000;

drop table  userlogin;
drop table groups;
drop table useringroup;
drop table usergroupproducts;
