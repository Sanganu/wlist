var orm = require("../config/orm.js");

var task = {
     all: function(cb)
     {
       orm.all("useringroup",function(res)
        {
          console.log('Users in the group',res);
          cb(res);
        });
     },
     create: function(cols,vals,cb)
     {
        orm.create("useringroup",cols,vals,function(res)
         {
           console.log('USers in the group create',res);
           cb(res);
         })
     },
     update:function(objColVals,condition,cb)
     {     orm.update("useringroup", objColVals, condition, function(res)
        {
             console.log('USers in the group update',res);
              cb(res);
            });
     },
     delete: function(condition, cb) {
           orm.delete("useringroup", condition, function(res) {
             console.log('USers in group delete',res);
             cb(res);
           });
      }

};

module.exports = task;
// To be used in planner_controller.js (controllers)
