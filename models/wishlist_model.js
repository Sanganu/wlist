var orm = require("../config/orm.js");

var wishes = {
     all: function(cb)
     {
       orm.all("wishlist",function(res)
        {
          console.log('wishlist select',res);
          cb(res);
        });     },
     create: function(cols,vals,cb)
     {
        orm.create("wishlist",cols,vals,function(res)
         {
           console.log('wishlist create',res);
           cb(res);
         })
     },
     update:function(objColVals,condition,cb)
     {     orm.update("wishlist", objColVals, condition, function(res)
        {
             console.log('gruops tableupdate',res);
              cb(res);
            });
     },
     delete: function(condition, cb) {
           orm.delete("wishlist", condition, function(res) {
             console.log('wishlist table delete',res);
             cb(res);
           });
      },
      selectone:function(condition, cb)
      {
        orm.selectone("wishlist",condition,function(res)
        {
          console.log('wishlist table',res);
          cb(res);
        });
      }
};

module.exports = wishes;
// To be used in groupps_contoller.js (controllers)
