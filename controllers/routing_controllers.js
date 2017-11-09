const express = require("express");
const exphbs = require("express-handlebars");
const router = express.Router();
const user = require("../models/userlogin_model.js");
const wish = require("../models/wishlist_model.js");
// To get the Page index.handlebars
router.get("/", function(req, res) {
          res.render('index');
});

// To get the userlogin.handlbars
router.get("/users/login", function(req, res) {
         res.render('userlogin');
});
router.get("/users/signin", function(req, res) {
         res.render('usersignin');
});
//My account
router.get("/users/myaccount/:id", function(req, res) {
       var condition =
        { id : req.params.id };
       user.selectone(condition,function(data)
        {
           var criteria = { userid : req.params.id};
           wish.selectone(criteria,function(records)
            {
             res.render('myaccount',{ulist:data, wlist:records});
            });
        });
});
//Log in to the account
router.get("/api/users/login/:email/:pword", function(req, res) {
       console.log("In post route for login",req);
       var condition =
       { email : req.params.email,
         pword : req.params.pword
       } ;
        user.selectone(condition, function(result)
        {
            console.log("the response from ema+pswd",result);
             if(result.length > 0)
             {
              console.log("Valid login");

               //res.render("myaccount",{ulist:result});
                //res.status(200).end();
                var resData = {id:result[0].id};
                console.log(resData);
               res.json(resData);
             }
             else {
                console.log("Invalid Email password combination");
                res.json({id:"none"});
                  //return res.status(404).end();
             }
                //res.render('index', {vlist:data});
        });  //end of all -select
});
// Create a new account
router.post("/api/users/add", function(req, res) {
      var inputobj = {
         fname : req.body.fname,
         lname : req.body.lname,
         email : req.body.email
      };


      user.create([
        "fname","lname","email","pword"
      ], [
        req.body.fname, req.body.lname, req.body.email,req.body.pword
      ], function(result) {
             console.log('Results from create account',result);
            if (result.affectedRows != 0)
            {
              console.log("Inserting new user in table");
              //res.render('userlogin', {ulist:data});
              res.json({id:result.insertId})
              //res.send(result.insertId);
              //res.status(200).end();

            }
            else {
              console.log("unable to create account");
              return res.status(404).end();
            }
       }); //end of create
}); // end of post route to add new user accounts

// check if account exist for email
router.get("/api/users/check/:email", function(req,res){
    var condition = { email : req.params.email};
     console.log('condition is :',condition);
     user.selectone(condition,function(result) {
          console.log('Results from select one',result);
          if ( result.length === 0)
          {
            console.log("Email not exist");
          //  res.send("yes");
          res.json({exist : 'no'});
            return res.status(200).end();
          }
          else {
            console.log("Account already exist");
            res.json({exist:'yes'});
            return res.status(404).end();
          }
     });
});
// update record in table
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
router.delete("/api/users/delete/:id", function(req, res) {
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
/* Wish List */
/*
router.get("/api/users/wishlist/",function(req,res) {
   wish.all(function(result) {
        console.log('Results from select one',result);
        if ( result.length === 0)
        {
          console.log("Wish list not yet created");
          //  res.send("yes");
           res.json({exist : 'no'});
            return res.status(200).end();
        }
        else {
          console.log("wishlist",result);
          res.render('wishlist',{wlist:result});
          return res.status(404).end();
        }
    });
  }); */
  router.delete("/api/users/wishlist/delete/:id", function(req, res) {
        var condition = "id = " + req.params.id + "user_id = "+req.body.uid;
        wish.delete(condition, function(result) {
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

  router.put("/api/users/wishlist/update/:id", function(req, res) {
        var condition = "id = " + req.params.id + "user_id = "+req.body.uid;
        console.log("condition", condition);
          user.update({
            product_name    : req.body.pname,
            product_desc   :req.body.pdesc,
            product_price : re.body.pprice,
            userid : req.body.uid
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
  // Add Wish list
  router.post("/api/users/wishlist/add", function(req, res) {
        wish.create([
          "userid","product_name","product_desc","product_price"
        ], [
          req.body.userid, req.body.product_name, req.body.product_desc,req.body.price
        ], function(result) {
               console.log('Results from create account',result);
              if (result.affectedRows != 0)
              {
                console.log("Inserting wish list in table");
                //res.render('userlogin', {ulist:data});
                res.json({id:result.insertId})
                //res.send(result.insertId);
                //res.status(200).end();

              }
              else {
                console.log("unable to add wishlist");
                return res.status(404).end();
              }
         }); //end of create
  }); // end of post route to add new user accounts
/*
router.get("/api/users/wishlist/:id",function(req,res) {
  var condition = { id : req.params.id};
   console.log('condition is :',condition);
   user.selectone(condition,function(result) {
        console.log('Results from select one',result);
        if ( result.length === 0)
        {
          console.log("Wish list not yet created");
          //  res.send("yes");
           res.json({exist : 'no'});
            return res.status(200).end();
        }
        else {
          console.log("wishlist",result);
          res.render('wihlist',{wlist:result});
          return res.status(404).end();
        }
    });
  });
  */
// Export routes for server.js to use.
module.exports = router;
