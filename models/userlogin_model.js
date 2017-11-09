var orm = require("../config/orm.js");

var user = {
     all: function(cb)
     {
       orm.all("userlogin",function(res)
        {
          console.log('User Login select',res);
          cb(res);
        });
     },
     create: function(cols,vals,cb)
     {
        orm.create("userlogin",cols,vals,function(res)
         {
           console.log('user login create',res);
           cb(res);
         })
     },
     update:function(objColVals,condition,cb)
     {     orm.update("userlogin", objColVals, condition, function(res)
        {
             console.log('User Login update',res);
              cb(res);
            });
     },
     delete: function(condition, cb) {
           orm.delete("userlogin", condition, function(res) {
             console.log('User login delete',res);
             cb(res);
           });
      },
      selectone:function(objColVals, cb)
      {
         console.log("before orm.");
        orm.selectone("userlogin",objColVals,function(res)
        {
          console.log('User login table',res);
          cb(res);
        });
     }

};

module.exports = user;
// To be used in userlogin_controller.js (controllers)
