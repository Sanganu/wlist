desc groups;

desc userlogin;

alter table userlogin add pword varchar(10) not null;

select * from userlogin;

select * from userlogin where email = "doradisney@gmail.com"

-- select * from userlogin where email = 'doradisney@gmail.com'


UPDATE userlogin set fname = "milk", lname = "shake" where
id = 1007;

select * from userlogin;

DELETE FROM userlogin where id = 1008;

select * from userlogin where fname = "milk" and lname = "shake";