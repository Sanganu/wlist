var mysql = require("mysql");

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user:'root',
  password:'Mykutties2',
  database:'wishlist'
});

connection.connect(function(err){
   if (err) throw err;
   console.log('MYSQL - Connected as id: '+ connection.threadId);
});

module.exports = connection ;
