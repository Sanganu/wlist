const express = require("express");
const router = express.Router();
const user = require("../models/userlogin_model.js");

router.get("/", function(req, res) {
         res.render('index');
});

router.get("/users/", function(req, res) {
         res.render('userlogin');
});

//Getuser
router.get("/users/:id", function(req, res) {
       var condition = "id = "+req.params.id ;
        user.selectone(condition, function(data)
        {
                res.render('index', {vlist:data});
        });  //end of all -select
});
// Insert into table
router.post("/api/users/add", function(req, res) {
      user.create([
        "fname","lname","email"
      ], [
        req.body.fname, req.body.lname, req.body.email
      ], function(result) {

            if (result.affectedRows != 0)
            {
              console.log("Inserting new user in table");
              res.render('userlogin', {ulist:data});
              res.status(200).end();
            }
            else {
              return res.status(404).end();
            }
       }); //end of create
}); // end of post route to add new records
// check email
router.get("/api/users/check/:email", function(req,res){
    var condition = "email ="+"'"+req.params.email+"'" ;
     console.log('condition is :',condition);
     user.selectone(condition,function(result) {
          if ( result.affectedRows === 0)
          {
            console.log("Email not exist");
            return res.status(200).end();
          }
          else {
            console.log("Account already exist");
            return res.status(404).end();
          }
     });
});
// upate record in table
router.put("/api/users/update/:id", function(req, res) {
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
router.delete("/api/groups/users/delete/:id", function(req, res) {
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
module.exports = router;
