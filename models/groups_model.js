var orm = require("../config/orm.js");

var thegroup = {
     all: function(cb)
     {
       orm.all("groups",function(res)
        {
          console.log('groups select',res);
          cb(res);
        });
     },
     create: function(cols,vals,cb)
     {
        orm.create("groups",cols,vals,function(res)
         {
           console.log('groups create',res);
           cb(res);
         })
     },
     update:function(objColVals,condition,cb)
     {     orm.update("groups", objColVals, condition, function(res)
        {
             console.log('gruops tableupdate',res);
              cb(res);
            });
     },
     delete: function(condition, cb) {
           orm.delete("groups", condition, function(res) {
             console.log('groups table delete',res);
             cb(res);
           });
      }
      selectone:function(condition, cb)
      {
        orm.selectone("groups",condition,fucntion(res)
        {
          console.log('Groups table',res);
          cb(res);
        });
      }
};

module.exports = thegroup;
// To be used in groupps_contoller.js (controllers)
