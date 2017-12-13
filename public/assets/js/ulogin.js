$(function() {


        $("#htnewuser").on("click",function(){
                   // Check whether email already used
                    event.preventDefault();
                    var email = $("#htemail").val().trim();
                    event.preventDefault();
                    //createaccount();
                    //console.log('check email exist');
                    checkalreadyexist(email);
        });   // end of on click

        $("#htlogin").on("click",function(event)
        {
                     event.preventDefault() ;
                     $("#ht-message").text("");
                     var  email = $("#htsemail").val().trim();
                     var  pword =  $("#htspwd").val().trim();
                     if( email != "" && pword != "")
                     {
                           console.log("inside ht login",email);
                           $.ajax("/api/users/login/"+email+"/"+pword,
                          {
                            type : "GET",

                          }).then(function(response)
                               {
                                      console.log(" inside promise");
                                     if (response.id === "none")
                                     {   console.log("Errror");
                                        $("#lgmsg").text("Invalid Password!! Retry!");
                                      }
                                      else {
                                        console.log("Ok succesfull login");
                                        console.log("Res",response);
                                        window.location = '/users/myaccount/' + response.id;
                                      }
                               } // end of function (promise)
                          ); // end of promise
                      }
                      else {
                          $("#lgmsg").text("Please enter in all fields");
                      }
          }); // end on click;

            $("#prodaddbtn").on("click",function(event)
            {
                  console.log("jquery product add button");
                   event.preventDefault();
                   var uid = parseInt($("#htdispid").val().trim());
                   var price = parseFloat($("#htprodprice").val().trim()) || 000;
                   var newitem = {
                     userid : uid,
                     product_name: $("#htprodname").val().trim() || 'Product name',
                     product_desc: $("#htproddesc").val().trim() || 'Product description',
                     product_price : price
                   };
                   // Send the POST request.
                   console.log('before ajax of inserting product',newitem);
                   $.ajax("/api/users/wishlist/add", {
                     type : "POST",
                     data: newitem
                   }).then(function(response) {
                       console.log("Ajax Response -Added Item",response);
                       // Reload the page to get the updated list
                       location.reload();
                     }
                   );
            });

            $(".updbtn").on("click",function(event)
            {
                     event.preventDefault();
                      console.log("jquery update product button");
                      var id = $(this).data("id");
                    //  var htele = $(this).closest('form');
                    // var input = htele.find("#prdname").val();
                      var input1 = $(`#prddesc-${id}`).val().trim();
                      var input2 = $(`#prdname-${id}`).val().trim();
                      var input3 = $(`#prdprice-${id}`).val().trim();
                     var htele = $(this).parent().parent();
                    console.log('product name'+input1+':2:',input2);                     //console.log('updt',`${id}prdname`,`${id}prddesc ${id}prdprice`);
                      var newwish =
                      {
                        pname: input2,
                        pdesc: input1,
                        pprice:parseFloat(input3),
                        uid: $("#htdispid").val().trim(),
                      }
                      console.log('before ajax',newwish);
                      $.ajax("/api/users/wishlist/update/" + id, {
                        type: "PUT",
                        data : newwish
                      }).then(
                        function(response) {
                          console.log("Update of Products", response);
                          location.reload();
                        });

            });

          $(".delbtn").on("click",function(event)
          {
                console.log("jquery del");
                event.preventDefault();
                var id = $(this).data("id");
                console.log('delete in front end jquery id is',id);
                var paraObj = {
                    id :id,
                    userid:$("#htdispid").val().trim()
                }
                console.log('before ajax',paraObj);
                $.ajax("/api/users/wishlist/delete/", {
                  type: "DELETE",
                  data : paraObj
                }).then(
                  function(response) {
                    console.log("sending deleted  request", response);
                    location.reload();
                  }); // end of ajax


          }); //end delete button
}); // end of main function



function checkpassword()
{
    var pwd1 = $("#htpassword").val().trim();
    var pwd2 = $("#htconfirmpassword").val().trim();

    if( pwd1 === pwd2)
    {
      return true;
    }
    else {
    /*  $("#htpassword").val() = "";
      $("#htconfirmpassword").val() = ""; */
      $("#ht-message").text("Password mismatch");
      return false;
    }
}


function checkinput()
{
    var rightone = true;
    var input1 = $("#htuser_fname").val().trim() ;
    var input2 = $("#htuser_lname").val().trim() ;
    var input3 = $("#htemail").val().trim();
    var input4 = $("#htpassword").val().trim() ;
    var input5 = $("#htconfirmpassword").val().trim() ;

    if ( input1 === "")
    {
      $("#ht-fname").text("First Name cannot be null");
      rightone = false;
    }
    if ( input2 === "")
    {
      $("#ht-lname").text("Lastt Name cannot be null");
      rightone = false;
    }
    if ( input3 === "")
    {
      $("#ht-yesnoemail").text("Email cannot be null");
      rightone = false;
    }
    if ( input4 === "")
    {
      $("#ht-yesnopwd1").text("Password cannot be null");
      rightone = false;
    }
    if ( input5 === "")
    {
      $("#ht-yesnopwd2").text("Required field");
      rightone = false;
    }
  /*  if ( checkpassword())
    {
      console.log("Input -Checking password");
    }
    else {
      rightone = false;
    }*/
    return rightone;
}

function checkalreadyexist(email)
{
  console.log( "ajax for check on email");
  $.ajax("/api/users/check/"+email,{
    type : "GET"
  }).then(function(response)
     {
            console.log('Ajax response for emial check',response);
             if (response.exist === "no")
             {
                if (checkinput() && checkpassword())
                {
                    createaccount();
                }
                else if ( ! checkinput())
                {
                  $("#ht-message").text("Please Enter all details!!!");
                }
                else if ( ! checkpassword())
                {
                  $("ht-message").text("Password mismatch");
                }
             }
             else if(response.exist=== 'yes')
             {
               console.log("User Account with this Email-Id already Exist");
               $("#ht-message").text("Account already exist for this Email Id. Please Enter New details!!!");
           }
      });
    //  return false;
}

function createaccount()
{
        var newuser = {
          fname : $("#htuser_fname").val().trim(),
          lname : $("#htuser_lname").val().trim(),
          email: $("#htemail").val().trim(),
          pword : $("#htconfirmpassword").val().trim()
        };
        $.ajax("/api/users/add",
          {
            type: "POST",
            data : newuser
          }).then(
               function(response)
               {

                 console.log("Inserted Records",response.id);
                 var id = response.id;
                 window.location = '/users/myaccount/' + response.id;
               }
          ); //end ajax add
}

function checkwishlistinput()
{
  var price = parseFloat($("#htprodprice").val().trim());
  var product_name = $("#htprodname").val().trim();
  var  product_desc = $("#htproddesc").val().trim();

}
