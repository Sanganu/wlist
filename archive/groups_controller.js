const express = require("express");
const grrouter = express.Router();
const task = require("../models/groups_controller.js");



router.get("/groups/", function(req, res) {
        task.all(function(data)
        {
                res.render('index', {vlist:data});
        });  //end of all -select
}); // end router get all records
//Get one group
router.get("/groups/:id", function(req, res) {
       var condition = "id = "+req.params.id ;
        task.selectone(condition, function(data)
        {
                res.render('index', {vlist:data});
        });  //end of all -select
});
// Insert into table
router.post("/api/groups/add", function(req, res) {
      task.create([
        "group_name","group_description","user_id"
      ], [
        req.body.grpname, req.body.grpdesc, req.body.grpuserid
      ], function(result) {
            console.log("Inserting new groups in table");
            if (result.affectedRows != 0)
            {
              res.json({ id: result.insertId });
              res.status(200).end();
            }
            else {
              return res.status(404).end();
            }
       }); //end of create
}); // end of post route to add new records

// upate record in table
router.put("/api/groups/update/:id", function(req, res) {
      var condition = "id = " + req.params.id + "user_id = "+req.body.uid;
      console.log("condition", condition);
        task.update({
             group_name : req.body.grpname,
             group_description :req.body.grpdesc
        }, condition, function(result) {
             console.log('updating values');
                if (result.changedRows == 0) {
                  console.log("ID not found, Task does not exist");
                  return res.status(404).end();
                } else {
                  console.log('Valid Id, Update Record');
                  res.status(200).end();
                }
        }); // end of update
}); //end of put route to update records

// delete record from table
router.delete("/api/groups/delete/:id", function(req, res) {
      var condition = "id = " + req.params.id + "user_id = "+req.body.uid;
      task.delete(condition, function(result) {
            if (result.affectedRows == 0) {
                  // If no rows were changed, then the ID must not exist, so 404
                  console.log("ID not found, task does not exist");
                  return res.status(404).end();
                } else {
                  console.log('Valid Id, Deleted record');
                  res.status(200).end();
                }

      }); // end of delete db call
}); //end of delete route

// Export routes for server.js to use.
module.exports = router;
