// Import MySQL connection.
var connection = require("../config/connection.js");

function printQuestionMarks(num) {
          var arr = [];
          for (var i = 0; i < num; i++) {
            arr.push("?");
          }
          return arr.toString();
}

function objToSql(ob) {
        var arr = [];

        for (var key in ob) {
          var value = ob[key];

          if (Object.hasOwnProperty.call(ob, key)) {

            if (typeof value === "string" && value.indexOf(" ") >= 0) {
              value = "'" + value + "'";

            }
            else if (typeof value === "string")
            {
              value = "'"+value+"'" ;
            }
            else if (typeof value === 'date')
            {
              value = "'"+value+"'";
            }
            arr.push(key + "=" + value);
            console.log(' The value is : ',value );
          }
        }
  return arr.toString();
}

function whereclause(ob)
{
        console.log('The object whereclause gets',ob);
        var condstr = [];
        var count = 0;
        for (var key in ob) {
              var value = ob[key];
              console.log('Value is:',value,'Key is',key);
              count++;
              if ( count > 1)
              {
                 condstr =  condstr + " " + "AND" +" ";
              }
              if (Object.hasOwnProperty.call(ob, key)) {

                    if (typeof value === "string" && value.indexOf(" ") >= 0) {
                      value = "'" + value + "'";

                    }
                    else if (typeof value === "string")
                    {
                      value = "'"+value+"'" ;
                    }
                    else if (typeof value === 'date')
                    {
                      value = "'"+value+"'";
                    }
                    condstr = condstr + (key + "=" + value);
                    console.log(' The value is : ',value );
               } // end if object
        } // end for
      console.log("The  where clause: ",condstr);
      return condstr;
}
// Object for all our SQL statement functions.
var orm = {
  all: function(tableInput, cb) {
          console.log('Executing from Orm -all tablename',tableInput);
          var queryString = "SELECT * FROM " + tableInput + " ;";
          connection.query(queryString, function(err, result) {
            if (err) {
              throw err;
            }
            else {
                console.log('The query string',queryString);
                console.log('The query resutl',result,err);
                cb(result);
            }
          });
  },
  create: function(table, cols, vals, cb) {
          var queryString = "INSERT INTO " + table;
          queryString += " (";
          queryString += cols.toString();
          queryString += ") ";
          queryString += "VALUES (";
          queryString += printQuestionMarks(vals.length);
          queryString += ") ";
          console.log('Insert statement:',queryString,'Array of input',vals);
          connection.query(queryString, vals, function(err, result) {
            if (err) {
              throw err;
            }
            console.log('connection - insert',result);
            cb(result);
          });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition, cb) {
          var queryString = "UPDATE " + table;
          queryString += " SET ";
          queryString += objToSql(objColVals);
          queryString += " WHERE ";
          queryString += condition;
          console.log('From Update -ORM',queryString);
          connection.query(queryString, function(err, result) {
            if (err) {
              throw err;
            }
            console.log('connection - update',result);
            cb(result);
          });
  },
  delete: function(table, objCond, cb) {
          var queryString = "DELETE FROM " + table;
          queryString += " WHERE ";
          queryString += whereclause(objCond);
          console.log('Delete from ORM',queryString);
          connection.query(queryString, function(err, result) {
            if (err) {
              throw err;
            }
            console.log('connection - delete',result);
            cb(result);
          });
    },
    selectone: function(table,objColVals,cb)
     {
          console.log('The object input in selectone',objColVals);
           var queryString = "SELECT * FROM " + table;
           queryString  += " WHERE ";
           queryString += whereclause(objColVals) ;
           console.log('select one ',queryString);
           connection.query(queryString, function(err,result){
             if (err) throw(err);
             cb(result);
           });
     }
}
// Export the orm object for the model (userlogin_model.js & wishlist_model).
module.exports = orm;
