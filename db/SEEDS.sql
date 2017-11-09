
insert into userlogin
(fname,lname,email) values
('Dora','Disney','doradisney@gmail.com');

insert into userlogin
(fname,lname,email) values
('Diego','Disney','diegodisney@gmail.com');

insert into userlogin
(fname,lname,email) values
('Cindrella','Disney','cindrdisney@gmail.com');

insert into userlogin
(fname,lname,email) values
('Rupenza','Disney','rupenzadisney@gmail.com');

insert into userlogin
(fname,lname,email) values
('Snowhite','Disney','snowhidisney@gmail.com');

select * from userlogin;

insert into groups
(group_name, group_description, user_id) values
('Disney Family','Wife kids',1000 );

select * from groups;

insert into useringroup
(user_id,groups_id) values (1000,100);

insert into useringroup
(user_id,groups_id) values (1001,100);

insert into useringroup
(user_id,groups_id) values (1002,100);

insert into useringroup
(user_id,groups_id) values (1003,100);

insert into useringroup
(user_id,groups_id) values (1004,100);

insert into usergroupproducts
(usergrp_id,product_id,product_desc,product_price)
values
(10000,10,'Apple Watch',700);

insert into usergroupproducts
(usergrp_id,product_id,product_desc,product_price)
values
(10000,11,'Apple ipad',700);

insert into usergroupproducts
(usergrp_id,product_id,product_desc,product_price)
values
(10000,12,'Apple iphone',700);

insert into usergroupproducts
(usergrp_id,product_id,product_desc,product_price)
values
(10001,10,'Apple Watch',700);

insert into usergroupproducts
(usergrp_id,product_id,product_desc,product_price)
values
(10001,10,'Apple Watch',700);

insert into usergroupproducts
(usergrp_id,product_id,product_desc,product_price)
values
(10001,10,'Apple Watch',700);

select * from useringroup;

select * from usergroupproducts;

select * from userlogin;

select * from groups;

insert into wishlist(userid ,
   product_desc ,
   product_price) values (1000,'Apple',1000);
   


