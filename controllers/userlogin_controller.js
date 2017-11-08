const express = require("express");
const usrouter = express.Router();
const user = require("../models/userlogin_model.js");


usrouter.get("/users/", function(req, res) {
         res.render('userlogin');
});

//Getuser
usrouter.get("/users/:id", function(req, res) {
       var condition = "id = "+req.params.id ;
        user.selectone(condition, function(data)
        {
                res.render('indnnnex', {vlist:data});
        });  //end of all -select
});
// Insert into table
usrouter.post("/api/users/add", function(req, res) {
      user.create([
        "fname","lname","email"
      ], [
        req.body.fname, req.body.lname, req.body.email
      ], function(result) {
            console.log("Inserting new groups in table");
            if (result.affectedRows != 0)
            {
              res.render('userlogin', {ulist:data});
              res.status(200).end();
            }
            else {
              return res.status(404).end();
            }
       }); //end of create
}); // end of post route to add new records

// upate record in table
usrouter.put("/api/users/update/:id", function(req, res) {
      var condition = "id = " + req.params.id + "user_id = "+req.body.uid;
      console.log("condition", condition);
        user.update({
             fname : req.body.grpname,
             lname :req.body.grpdesc
        }, condition, function(result) {
             console.log('updating values');
                if (result.changedRows == 0) {
                  console.log("ID not found, user does not exist");
                  return res.status(404).end();
                } else {
                  console.log('Valid Id, Update Record');
                  res.status(200).end();
                }
        }); // end of update
}); //end of put route to update records

// delete record from table
usrouter.delete("/api/groups/users/delete/:id", function(req, res) {
      var condition = "id = " + req.params.id + "user_id = "+req.body.uid;
      user.delete(condition, function(result) {
            if (result.affectedRows == 0) {
                  // If no rows were changed, then the ID must not exist, so 404
                  console.log("ID not found, user does not exist");
                  return res.status(404).end();
                } else {
                  console.log('Valid Id, Deleted record');
                  res.status(200).end();
                }

      }); // end of delete db call
}); //end of delete route

// Export routes for server.js to use.
module.exports = usrouter;
